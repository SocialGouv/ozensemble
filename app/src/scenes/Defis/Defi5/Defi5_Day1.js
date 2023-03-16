import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import TextStyled from '../../../components/TextStyled';
import WrapperContainer from '../../../components/WrapperContainer';
import {
  betterEvaluateQuizzAnswersState,
  reevaluateQuizzAnswersState,
  reevaluateQuizzResultState,
} from '../../../recoil/quizzs';
import { defaultPaddingFontScale } from '../../../styles/theme';
import AlcoholAndNorms from '../../Health/Articles/AlcoholAndNorms';
import QuizzEvaluateConso from '../../Quizzs/QuizzEvaluateConso';
import questions from '../../Quizzs/QuizzEvaluateConso/questions';
import { computeEvaluateConsoScore } from '../../Quizzs/QuizzEvaluateConso/utils';
import { setValidatedDays } from '../utils';

const Defi5_Day1_Stack = createStackNavigator();

const Defi5_Day1_Navigator = ({ route }) => {
  return (
    <Defi5_Day1_Stack.Navigator headerMode="none" initialRouteName="DEFI5_DAY1_ONBAORDING">
      <Defi5_Day1_Stack.Screen
        name="DEFI5_DAY1_ONBAORDING"
        component={Defi5_Day1_Onboarding}
        initialParams={route.params}
      />
      <Defi5_Day1_Stack.Screen name="DEFI5_DAY1_QUIZZ" component={Defi5_Day1_Quizz} initialParams={route.params} />
      <Defi5_Day1_Stack.Screen name="ALCOHOL_AND_NORMS" component={AlcoholAndNorms} />
    </Defi5_Day1_Stack.Navigator>
  );
};

const Defi5_Day1_Onboarding = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title="Où en suis-je par rapport à ma consommation après quatre semaines d'effort?">
      <Element
        content={
          <>
            Nous vous proposons désormais de refaire le
            <TextStyled bold> questionnaire sur votre consommation de l'activité 1</TextStyled>, puis de comparer vos
            réponses avec celles que vous aviez données il y a de cela 4 semaines. {'\n\n'}Ne vous laissez pas
            influencer par vos résultats précédents et répondez au test au vu de votre situation actuelle.
          </>
        }
      />

      <ButtonPrimaryStyled content="Je suis prêt" onPress={() => navigation.navigate('DEFI5_DAY1_QUIZZ')} />
    </WrapperContainer>
  );
};

export const Defi5_Day1_Quizz = ({ navigation, route }) => (
  <QuizzEvaluateConso
    navigation={navigation}
    route={route}
    event="_REMESURER_MA_CONSO"
    recoilAnswersState={reevaluateQuizzAnswersState}
    recoilResultState={reevaluateQuizzResultState}
    Results={Defi5_Day1_Results}
  />
);

export const Defi5_Day1_Results = ({ navigation }) => {
  return (
    <WrapperContainer onPressBackButton={navigation.goBack}>
      <ReevaluateConsoResult />
    </WrapperContainer>
  );
};

export const ReevaluateConsoResult = ({ onlyScore = false, noShadow = false }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const evaluateConsoAnswers = useRecoilValue(betterEvaluateQuizzAnswersState);
  const reevaluateConsoAnswers = useRecoilValue(reevaluateQuizzAnswersState);

  const evaluateScore = computeEvaluateConsoScore(questions, evaluateConsoAnswers)?.score ?? 0;
  const reevaluateScore = computeEvaluateConsoScore(questions, reevaluateConsoAnswers)?.score ?? 0;

  if (reevaluateScore > evaluateScore) {
    return (
      <>
        {!onlyScore && <ScoreTitle color="#4030a5">Votre score est en hausse{'\u00A0'}!</ScoreTitle>}
        <ScoresCompare noShadow={noShadow} onlyScore={onlyScore}>
          <ScoreBox score={evaluateScore} color="#28A745" title="Mon ancien score" />
          <ScoreBox score={reevaluateScore} color="#EE7738" title="Mon score actuel">
            <ArrowUp />
          </ScoreBox>
        </ScoresCompare>
        {!onlyScore && (
          <>
            <Element
              content={
                <>
                  Vous avez du mal à contrôler votre comportement{'\u00A0'}? Votre situation est-elle plus compliquée
                  que prévue{'\u00A0'}?{'\n\n'}
                  <TextStyled bold>
                    Votre résultat au test AUDIT est en hausse, ce qui peut indiquer que vous n'avez pas reçu une aide
                    adéquate de votre entourage ou de professionnels.
                  </TextStyled>
                  {'\n\n'}
                  N'attendez pas que votre situation et votre santé se détériore avant d'obtenir l'aide dont vous avez
                  besoin pour commencer à reprendre la maîtrise de vos consommations.
                </>
              }
            />
            <ButtonPrimaryStyled content="J'ai compris" onPress={() => navigation.navigate(route.params.rootRoute)} />
          </>
        )}
      </>
    );
  }
  if (reevaluateScore < evaluateScore) {
    return (
      <>
        {!onlyScore && <ScoreTitle color="#4030a5">Votre score est en baisse{'\u00A0'}!</ScoreTitle>}

        <ScoresCompare noShadow={noShadow} onlyScore={onlyScore}>
          <ScoreBox score={evaluateScore} color="#EE7738" title="Mon ancien score" />
          <ScoreBox score={reevaluateScore} color="#28A745" title="Mon score actuel">
            <ArrowDown />
          </ScoreBox>
        </ScoresCompare>
        {!onlyScore && (
          <>
            <Element
              content={
                <>
                  Votre consommation vous paraissait problématique{'\u00A0'}? Vous aviez le sentiment qu'il fallait agir
                  pour changer vos habitudes{'\u00A0'}?{'\n\n'}
                  <TextStyled bold>
                    Votre résultat au test AUDIT est en baisse, ce qui indique que la quantité d'alcool que vous
                    consommez semble avoir diminué.
                  </TextStyled>
                  {'\n\n'}
                  C'est une bonne étape dans votre parcours de réduction{'\u00A0'}! Poursuivez vos efforts jusqu'à
                  atteindre les{' '}
                  <TextStyled underline onPress={() => navigation.navigate('ALCOHOL_AND_NORMS')} color="#4030a5">
                    normes recommandées par Santé Publique France.
                  </TextStyled>
                </>
              }
            />
            <ButtonPrimaryStyled content="J'ai compris" onPress={() => navigation.navigate(route.params.rootRoute)} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {!onlyScore && <ScoreTitle color="#4030a5">Votre score est en identique{'\u00A0'}!</ScoreTitle>}
      <ScoresCompare noShadow={noShadow} onlyScore={onlyScore}>
        <ScoreBox score={evaluateScore} color="#4030a5" title="Mon ancien score" />
        <ScoreBox score={reevaluateScore} color="#4030a5" title="Mon score actuel">
          <ArrowLeft />
          <ArrowRight />
        </ScoreBox>
      </ScoresCompare>
      {!onlyScore && (
        <>
          <Element
            content={
              <>
                Votre nouvelle manière de consommer est-elle adéquate{'\u00A0'}? Pourquoi est-il important pour votre
                santé de boire avec modération{'\u00A0'}?{'\n\n'}
                <TextStyled bold>
                  Votre résultat au test AUDIT est inchangé, ce qui indique que la quantité d'alcool que vous consommez
                  semble être la même qu'auparavant.
                </TextStyled>
                {'\n\n'}
                Nous aborderons d'autres éléments de votre parcours durant ce bilan, toutefois, soyez vigilant à obtenir
                l'aide dont vous avez besoin pour atteindre votre objectif de réduction.
              </>
            }
          />
          <ButtonPrimaryStyled content="J'ai compris" onPress={() => navigation.navigate(route.params.rootRoute)} />
        </>
      )}
    </>
  );
};

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
  align-self: center;
`;

const ScoreTitle = styled(H1)`
  flex-shrink: 0;
  margin-bottom: 40px;
  color: ${(p) => p.color};
`;

const ScoreBox = ({ score, color, title, children }) => (
  <ScoreBoxStyled>
    <H2 bold color={color}>
      {title}
    </H2>
    <Circle color={color}>
      <ScoreText color={color}>{score}</ScoreText>
      {children}
    </Circle>
  </ScoreBoxStyled>
);

const ScoreBoxStyled = styled.View`
  flex: 1;
  align-items: center;
`;

const Circle = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border-color: ${(p) => p.color};
  border-width: 5px;
`;

const ScoreText = styled(H1)`
  color: ${(p) => p.color};
  font-size: 45px;
  line-height: 50px;
`;

const ScoresCompare = styled.View`
  ${(p) => !p.noShadow && 'shadow-offset: 0px 5px;'}
  ${(p) => !p.noShadow && 'shadow-color: #000000;'}
  ${(p) => !p.noShadow && 'shadow-opacity: 0.2;'}
  ${(p) => !p.noShadow && 'shadow-radius: 4px;'}
  ${(p) => !p.noShadow && 'elevation: 4;'}
  ${(p) => !p.noShadow && 'background-color: #fff;'}
  ${(p) => !p.onlyScore && 'margin-bottom: 40px;'}
  flex-direction: row;
  justify-content: space-around;
  margin-horizontal: ${-defaultPaddingFontScale() / 2}px;
  padding-horizontal: ${defaultPaddingFontScale() / 3}px;
  padding-top: ${defaultPaddingFontScale() / 2}px;
  padding-bottom: ${defaultPaddingFontScale()}px;
`;

const ArrowStyled = styled(Svg)`
  position: absolute;
  bottom: 0px;
  right: -22.5px;
`;

const ArrowDown = () => (
  <ArrowStyled width={45} height={78} viewBox="0 0 45 78" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path fill="#28A745" stroke="#fff" strokeWidth={3} d="M33.5 51.5h-21v-50h21z" />
    <Path d="M41.986 41.25 22.5 75 3.014 41.25h38.972Z" fill="#28A745" stroke="#fff" strokeWidth={3} />
    <Path fill="#28A745" d="M32 49H14V18h18z" />
  </ArrowStyled>
);

const ArrowUp = () => (
  <ArrowStyled width={45} height={78} viewBox="0 0 45 78" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path fill="#EE7738" stroke="#fff" strokeWidth={3} d="M33.5 26.5h-21v50h21z" />
    <Path d="M41.986 36.75 22.5 3 3.014 36.75h38.972Z" fill="#EE7738" stroke="#fff" strokeWidth={3} />
    <Path fill="#EE7738" d="M32 29H14v31h18z" />
  </ArrowStyled>
);

const ArrowLeftStyled = styled(Svg)`
  position: absolute;
  top: -15.5px;
  right: 50px;
`;

const ArrowLeft = () => (
  <ArrowLeftStyled width={27} height={31} viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M0 15.5 26.25.345v30.31L0 15.5Z" fill="#4030A5" />
  </ArrowLeftStyled>
);

const ArrowRightStyled = styled(Svg)`
  position: absolute;
  bottom: -15.5px;
  left: 50px;
`;

const ArrowRight = () => (
  <ArrowRightStyled width={27} height={31} viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M27 15.5.75.345v30.31L27 15.5Z" fill="#4030A5" />
  </ArrowRightStyled>
);

export default Defi5_Day1_Navigator;
