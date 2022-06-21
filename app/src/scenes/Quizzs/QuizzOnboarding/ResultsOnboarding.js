import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import H1 from '../../../components/H1';
import { screenWidth } from '../../../styles/theme';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import Sources from '../Sources';
import NoSmiley from '../../../components/illustrations/smiley/NoSmiley';
import YesSmiley from '../../../components/illustrations/smiley/YesSmiley';
import { BackButton } from '../../../components/BackButton';
import { Bold, P, Spacer } from '../../../components/Articles';
import UnderlinedButton from '../../../components/UnderlinedButton';
import { autoEvaluationQuizzResultState } from '../../../recoil/quizzs';
import { storage } from '../../../services/storage';

const ResultsOnboarding = ({ navigation, route }) => {
  const resultKey = useRecoilValue(autoEvaluationQuizzResultState);
  const [feeling, setFeeling] = useState(() => storage.getBoolean('@Quizz_surprised') || null);
  useEffect(() => {
    if (feeling !== null) storage.set('@Quizz_surprised', feeling);
  }, [feeling]);

  return (
    <FullScreenBackground>
      <TopContainer>
        <BackButton
          onPress={() =>
            route?.params?.rootRoute === 'HEALTH' ? navigation.navigate('ALCOHOL_ADDICTION') : navigation.goBack()
          }
          marginBottom
        />
        <ResultTitle color="#000">Résultat</ResultTitle>
        {resultKey === 'addicted' && <ResultRisk navigation={navigation} feeling={feeling} setFeeling={setFeeling} />}
        {resultKey === 'good' && <ResultGood />}
        {resultKey === 'risk' && <ResultAddicted />}
        {feeling !== null || resultKey === 'good' || resultKey === 'risk' ? (
          <>
            <TopButtonContainer>
              <ButtonPrimary
                content="Je commence le défi"
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
            <Sources
              content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
         Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
         Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
            />
          </>
        ) : null}
      </TopContainer>
    </FullScreenBackground>
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
        Si vous souhaitez en <Bold>apprendre plus sur une démarche de réduction,</Bold> faite le premier défi.{' '}
      </P>
    </>
  );
};

const ResultAddicted = () => {
  return (
    <>
      <TopTitle>
        <TextStyled color="#4030a5">Votre consommation pourrait être risquée</TextStyled>
      </TopTitle>
      <P>Ne vous inquiétez pas car le premier pas vient d'être franchi.</P>
      <Spacer size={20} />
      <P>
        Vous êtes <Bold>prêt à entamer une démarche de maîtrise de votre consommation d'alcool en autonomie</Bold>, à
        travers un premier défi pour faire le point en 7 jours.
      </P>
      <Spacer size={20} />
      <P>Vous découvrirez aussi de l'information fiable pour mieux appréhender les mécanismes d'addiction.</P>
    </>
  );
};

const ResultRisk = ({ navigation, feeling, setFeeling }) => {
  return (
    <>
      <TopTitle>
        <TextStyled color="#4030a5">Vous pourriez présenter des risques d'addiction à l'alcool !</TextStyled>
      </TopTitle>
      <P>Nous sommes conscients que ce résultat peut être un choc.</P>
      <P>Mais nous pouvons vous aider à reprendre le contrôle ...</P>
      <FeelingOfResult feeling={feeling} setFeeling={setFeeling} />
      {feeling === true ? (
        <>
          <P>
            <Bold>Cela peut-être un choc</Bold> mais c'est une image à instant T sur laquelle
            <Bold> vous pouvez faire face.</Bold> Nous ne parlons pas d'alcoolisme mais d'un risque alcool.
          </P>
          <P>
            A tout moment, nous vous recommandons de
            <Bold> discuter gratuitement sous 48H avec un professionnel formé en addictologie</Bold> pour vous aider
            dans votre parcours.
          </P>
          <TopButtonContainer>
            <ButtonPrimary content="J'échange avec un conseiller" onPress={() => navigation.navigate('CONTACT')} />
          </TopButtonContainer>
        </>
      ) : null}
      {feeling != null && (
        <>
          <P>
            <Bold>Commencer votre démarche de réduction</Bold>
          </P>
          <P>
            Vous êtes prêt à entamer une démarche de maîtrise de votre consommation d'alcool en autonomie, à travers un
            <Bold> premier défi pour faire le point en 7 jours.</Bold>
          </P>
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
      <Answer onPress={() => setFeeling(false)}>
        <NoSmiley size={72} color={feeling === false ? '#DE285E' : '#000000'} />
        <WindUp>
          <TextStyled bold color={feeling === false ? '#DE285E' : '#000000'}>
            Non
          </TextStyled>
        </WindUp>
      </Answer>
      <Answer onPress={() => setFeeling(true)}>
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

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const TopContainer = styled.View`
  padding: 0px 25px 40px;
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
