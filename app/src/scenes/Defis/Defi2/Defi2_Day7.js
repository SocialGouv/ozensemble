import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Linking } from 'react-native';
import { screenWidth } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import ElementDayDefi from '../../../components/ElementDayDefi';
import H2 from '../../../components/H2';
import ManAndWomanBust from '../../../components/illustrations/ManAndWomanBust';
import Sources from '../../Quizzs/Sources';
import { defi2EmotionState } from '../../../recoil/defis';
import QButton from '../../../components/QButton';
import { riskSituationsAnswersKeysSelector } from '../../../recoil/quizzs';
import emotions from '../../../components/emotions';
import { Bold, P } from '../../../components/Articles';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import WrapperContainer from '../../../components/WrapperContainer';

const Defi2_Day7 = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const answersRiskSituations = useRecoilValue(riskSituationsAnswersKeysSelector);
  const emotionValue = useRecoilValue(defi2EmotionState);
  const emotion = emotions.find((e) => e.value === emotionValue);

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer title="Bilan de la semaine" onPressBackButton={navigation.goBack}>
      <H2 color="#4030a5">Ma situation la plus facile à changer</H2>
      <FirstSituationContainer>
        <QButtonCentered>
          <QButton content={1} disabled colorText="#ffffff" colorBorder="#4030A5" colorBackground=" #4030A5" />
        </QButtonCentered>
        <FirstTextContainer>
          <P noMarginBottom>{answersRiskSituations[0]?.content}</P>
        </FirstTextContainer>
        <FirstTextContainer>
          <TextEmotion noMarginBottom>Et je bois pour :</TextEmotion>
          <Spacer size={10} />
          {emotion?.iconBilan}
          <Spacer size={10} />
          <TextEmotion noMarginBottom color="#4030A5">
            {emotion?.description}
          </TextEmotion>
        </FirstTextContainer>
      </FirstSituationContainer>
      <BackgroundEFEFEF>
        <H2 color="#4030a5">Mes autres situations à risques</H2>
        {answersRiskSituations
          ?.filter((k, i) => i > 0)
          .map((riskSituation, index) => {
            return (
              <RiskSituationsContainer key={index}>
                <QButton
                  content={index + 2}
                  disabled
                  colorText="#ffffff"
                  colorBorder="#4030A5"
                  colorBackground=" #4030A5"
                />
                <TextContainer>
                  <P noMarginBottom>{riskSituation.content}</P>
                </TextContainer>
              </RiskSituationsContainer>
            );
          })}
      </BackgroundEFEFEF>
      <P>
        Si vous êtes parvenu à <P bold>gérer la situation</P> dans le cadre de ce défi, vous êtes{' '}
        <P bold>capable de trouver seul(e) des solutions pour faire autrement.</P>
        {'\n\n'}
        <P bold>Sinon, vous avez pu mieux identifier quels sont vos points de blocage.</P>
        {'\n\n'}A tout moment: contactez nos équipes pour recourir à une aide complémentaire, gratuite et anonyme.
      </P>
      <ButtonsContainer>
        <ButtonPrimary content="Échanger avec un conseiller" onPress={() => navigation.navigate('CONTACT')} />
      </ButtonsContainer>
      <Spacer />
      <Spacer />
      <ElementDayDefi content={<H2 color="#4030a5">Conclusion de ma semaine</H2>} noMarginBottom />
      <P bold>Vous n'êtes pas la seule personne à ressentir ces émotions qui impactent sur l'envie de boire !</P>
      <Spacer />
      <P>Chacun réagit différemment à l'alcool. Et les émotions peuvent aussi bien être positives que négatives.</P>
      <Spacer />
      <P>
        L'enquête du <P bold>British Medical Journal Open</P> montre que les émotions perçues varient en fonction du
        type d'alcool consommé.
      </P>
      <Spacer />
      <BackgroundEFEFEF>
        <EmotionsConsommateurs
          drinkCategorie="spiritueux"
          emotion1="59% plus confiants"
          emotion2="58% sous tension"
          emotion3="29 % plus aggressifs"
        />
        <Spacer />
        <EmotionsConsommateurs
          drinkCategorie="vin"
          emotion1="53% plus détendus"
          emotion2="60 % fatigués"
          emotion3="17 % tristes"
        />
        <Spacer />
        <P>
          L'<P bold>intensité des émotions augmente avec la vitesse et la quantité consommée</P>, et plus
          particuliérement pour l'agressivité.
        </P>
        <Spacer />
        <P>Bien évidemment, ces émotions peuvent être affectées par l'humeur du consommateur avant le premier verre.</P>
      </BackgroundEFEFEF>
      <P>
        Comme les deux faces d'une même pièce, l'alcool comporte des plaisirs mais aussi des effets négatifs. Alors
        quand vous choissiez de consommer :
        <P bold>
          {'\n    • '}identifiez votre état émotionnel avant le premier verre,{'\n    • '} choisissez le type de
          boisson,
          {'\n    • '} sachez fixer une limite, {'\n    • '}veillez à boire lentement.
        </P>
      </P>
      <Spacer />
      <Sources>
        <>
          <TextStyled>{'\n    • '}BMJ Open November 22 2017 DOI: 10.1136 bmjopen-2017-016089</TextStyled>
          <TextStyled>{'\n    • '}Le site Améli “L'alcool: définition et repères de consommation”</TextStyled>
          <LinkContainer
            onPress={() => {
              Linking.openURL('https://www.ameli.fr/assure/sante/themes/alcool-sante/definition-reperes-consommation');
            }}>
            <TextStyled color="#4030a5" underline>
              https://www.ameli.fr/assure/sante/themes/alcool-sante/definition-reperes-consommation
            </TextStyled>
          </LinkContainer>
          <TextStyled>{'\n    • '}OMS - Organisation mondiale de la Santé</TextStyled>
        </>
      </Sources>
    </WrapperContainer>
  );
};

const Spacer = styled.View`
  height: ${({ size }) => size || 20}px;
`;

const BackgroundEFEFEF = styled.View`
  background-color: #efefef;
  margin-horizontal: -50px;
  padding-horizontal: 50px;
  padding-vertical: 20px;
  margin-bottom: 20px;
`;

const QButtonCentered = styled.View`
  align-self: center;
`;

const FirstSituationContainer = styled.View`
  flex-direction: row;
  align-items: stretch;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const FirstTextContainer = styled.View`
  background-color: #ffffff;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  width: ${screenWidth * 0.4 - 20}px;
  margin-left: 10px;
  padding: 7px;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
`;

const TextContainer = styled.View`
  background-color: #ffffff;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  margin-left: 10px;
  margin-vertical: 10px;
  padding: 10px;
  width: ${screenWidth * 0.77 - 20}px;
`;

const RiskSituationsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextEmotion = styled(P)`
  text-align: center;
`;

const EmotionsConsommateurs = ({ drinkCategorie, emotion1, emotion2, emotion3 }) => (
  <EmotionsContainer>
    <P>
      Les consommateurs de <Bold>{drinkCategorie}</Bold> ont déclaré être à :
    </P>
    <ManAndWomanBustsContainer>
      <ManAndWomanBustContainer>
        <ManAndWomanBust size={60} color={'#4030A5'} />
        <ManAndWomanBustText color="#4030A5">{emotion1}</ManAndWomanBustText>
      </ManAndWomanBustContainer>
      <ManAndWomanBustContainer>
        <ManAndWomanBust size={60} />
        <ManAndWomanBustText color="#DE285E">{emotion2}</ManAndWomanBustText>
      </ManAndWomanBustContainer>
      <ManAndWomanBustContainer>
        <ManAndWomanBust size={60} />
        <ManAndWomanBustText color="#DE285E">{emotion3}</ManAndWomanBustText>
      </ManAndWomanBustContainer>
    </ManAndWomanBustsContainer>
  </EmotionsContainer>
);

const EmotionsContainer = styled.View``;

const ManAndWomanBustsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ManAndWomanBustContainer = styled.View`
  width: 33.33%;
  align-items: center;
`;

const ManAndWomanBustText = styled(P)`
  text-align: center;
`;

const LinkContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
`;

const ButtonsContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;
export default Defi2_Day7;
