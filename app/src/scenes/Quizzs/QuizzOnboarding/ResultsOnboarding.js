import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import H1 from '../../../components/H1';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import Sources from '../Sources';
import NoSmiley from '../../../components/illustrations/smiley/NoSmiley';
import YesSmiley from '../../../components/illustrations/smiley/YesSmiley';
import { Bold, P, Spacer } from '../../../components/Articles';
import UnderlinedButton from '../../../components/UnderlinedButton';
import { autoEvaluationQuizzResultState } from '../../../recoil/quizzs';
import { storage } from '../../../services/storage';
import { logEvent } from '../../../services/logEventsWithMatomo';
import WrapperContainer from '../../../components/WrapperContainer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import API from '../../../services/api';

const ResultsOnboarding = ({ navigation, route }) => {
  const resultKey = useRecoilValue(autoEvaluationQuizzResultState);
  const [feeling, setFeeling] = useState(() => storage.getBoolean('@Quizz_surprised') || null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const matomoId = storage.getString('@UserIdv2');

    if (!isFocused) {
      API.post({
        path: '/defis/display',
        body: {
          matomoId: matomoId,
        },
      });
    }

    API.post({
      path: '/defis',
      body: {
        matomoId: matomoId,
        autoEvaluationDone: true,
      },
    });
    if (feeling !== null) storage.set('@Quizz_surprised', feeling);
  }, [feeling, isFocused]);

  return (
    <WrapperContainer
      onPressBackButton={() =>
        route?.params?.rootRoute === 'HEALTH' ? navigation.navigate('ALCOHOL_ADDICTION') : navigation.goBack()
      }>
      <ResultTitle color="#000">Résultat</ResultTitle>
      {resultKey === 'good' && <ResultGood />}
      {resultKey === 'risk' && <ResultRisk />}
      {resultKey === 'addicted' && <ResultAddicted navigation={navigation} feeling={feeling} setFeeling={setFeeling} />}
      {feeling !== null || resultKey === 'good' || resultKey === 'risk' ? (
        <>
          <TopButtonContainer>
            <ButtonPrimary
              content="Je commence l'activité"
              onPress={() => navigation.navigate('DEFI', { screen: 'DEFI1' })}
            />
          </TopButtonContainer>
          <UnderlinedButton
            content={"Recommencer l'auto-évaluation"}
            withoutPadding
            bold
            alignStart
            onPress={() => navigation.navigate('ONBOARDING_QUIZZ', { screen: 'QUIZZ_QUESTIONS' })}
          />
          <Sources>
            <TextStyled>
              "Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
              Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
              Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
            </TextStyled>
          </Sources>
        </>
      ) : null}
    </WrapperContainer>
  );
};

const ResultGood = () => {
  return (
    <>
      <TopTitle>
        <TextStyled color="#4030a5">Vous ne présentez pas de risque particulier, bravo !</TextStyled>
      </TopTitle>
      <P>
        Vous pouvez utiliser l'application pour <Bold>suivre plus finement votre consommation d'alcool.</Bold>
      </P>
      <Spacer size={20} />
      <P>
        Si vous souhaitez en <Bold>apprendre plus sur une démarche de réduction,</Bold> faite la première activité.{' '}
      </P>
    </>
  );
};

const ResultRisk = () => {
  const navigation = useNavigation();
  return (
    <>
      <TopTitle>
        <TextStyled color="#4030a5">Votre consommation pourrait être risquée</TextStyled>
      </TopTitle>
      <P>Ne vous inquiétez pas car le premier pas vient d'être franchi.</P>
      <Spacer size={20} />
      <P>
        Vous êtes <Bold>prêt à entamer une démarche de maîtrise de votre consommation d'alcool en autonomie</Bold>, à
        travers une première activité pour faire le point en 7 jours.
      </P>
      <Spacer size={20} />
      <P>
        Vous découvrirez aussi de l'information fiable pour mieux appréhender les mécanismes d'addiction. Pour en savoir
        plus, consultez{' '}
        <TextStyled color="#4030a5" underline onPress={() => navigation.navigate('ALCOHOL_AND_HEALTH_RISKS')}>
          l'article sur les risques sur la santé à long terme.
        </TextStyled>
      </P>
    </>
  );
};

const ResultAddicted = ({ navigation, feeling, setFeeling }) => {
  return (
    <>
      <TopTitle>
        <TextStyled color="#4030a5">Vous pourriez présenter des risques d'addiction à l'alcool !</TextStyled>
      </TopTitle>
      <P>Nous sommes conscients que ce résultat peut être un choc.</P>
      <P>Mais nous pouvons vous aider à reprendre le contrôle ...</P>
      <FeelingOfResult feeling={feeling} setFeeling={setFeeling} />
      {feeling === true && (
        <>
          <P>
            <Bold>Cela peut-être un choc</Bold> mais c'est une image à instant T sur laquelle
            <Bold> vous pouvez agir.</Bold>
          </P>
          <P>
            Si cela ne vous semble pas refléter votre situation, vous pouvez en parler
            <Bold> gratuitement sous 48H avec un professionnel formé en addictologie</Bold> pour vous aider dans votre
            parcours.
          </P>
          <TopButtonContainer>
            <ButtonPrimary content="J'échange avec un conseiller" onPress={() => navigation.navigate('CONTACT')} />
          </TopButtonContainer>
          <P>
            Nous vous proposons une démarche de maîtrise de votre consommation d'alcool en autonomie,{' '}
            <Bold>voici une première activité pour faire le point en 7 jours.</Bold>
          </P>
        </>
      )}
      {feeling === false && (
        <>
          <P>
            <Bold>Commencer votre démarche de réduction</Bold>
          </P>
          <P>
            Vous êtes prêt à entamer une démarche de maîtrise de votre consommation d'alcool en autonomie, à travers{' '}
            <Bold>une première activité pour faire le point en 7 jours.</Bold>
          </P>
          <P>Vous découvrirez aussi de l'information fiable pour mieux appréhender les mécanismes d'addiction.</P>
        </>
      )}
    </>
  );
};

const FeelingOfResult = ({ feeling, setFeeling }) => (
  <>
    <P>
      <Bold>Êtes-vous surpris par ce résultat ?</Bold>
    </P>
    <ContainerAnswer>
      <Answer
        onPress={() => {
          logEvent({
            category: 'QUIZZ',
            action: 'QUIZZ_SUPRISED',
            name: 'IS_NOT_SURPRISED',
          });
          setFeeling(false);
        }}>
        <NoSmiley size={72} color={feeling === false ? '#DE285E' : '#000000'} />
        <WindUp>
          <TextStyled bold color={feeling === false ? '#DE285E' : '#000000'}>
            Non
          </TextStyled>
        </WindUp>
      </Answer>
      <Answer
        onPress={() => {
          logEvent({
            category: 'QUIZZ',
            action: 'QUIZZ_SUPRISED',
            name: 'IS_SURPRISED',
          });
          setFeeling(true);
        }}>
        <YesSmiley size={72} color={feeling === true ? '#DE285E' : '#000000'} />
        <WindUp>
          <TextStyled bold color={feeling === true ? '#DE285E' : '#000000'}>
            Oui
          </TextStyled>
        </WindUp>
      </Answer>
    </ContainerAnswer>
  </>
);

const WindUp = styled.View`
  margin-top: -15px;
`;
const Answer = styled.TouchableOpacity`
  align-items: center;
  margin-vertical: 10px;
`;

const ContainerAnswer = styled.View`
  background: #ffffff;
  border: 1px solid #d3d3e880;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const ResultTitle = styled(H1)``;

const TopTitle = styled(H1)`
  margin-bottom: 20px;
`;

const TopButtonContainer = styled.View`
  margin: 20px 0 30px 0;
  align-items: center;
  flex-grow: 0;
  width: auto;
`;

export default ResultsOnboarding;
