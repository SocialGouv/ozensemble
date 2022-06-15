import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale } from '../../../styles/theme';
import ElementDayDefi from '../../../components/ElementDayDefi';
import ResultRiskSituations from './ResultRiskSituations';
import Situation from './Situation';
import riskSituations from './riskSituations';
import { riskSituationsQuizzAnswersState, riskSituationsQuizzResultState } from '../../../recoil/quizzs';

const QuizzRiskSituationsStack = createStackNavigator();

const QuizzRiskSituationsOnBoarding = ({ navigation, route }) => {
  const [answers, setAnswers] = useRecoilState(riskSituationsQuizzAnswersState);
  const setResult = useSetRecoilState(riskSituationsQuizzResultState);
  const toggleAnswer = async (answerKey, checked) => {
    setAnswers((prevAnswers) => {
      return {
        ...prevAnswers,
        [answerKey]: checked,
      };
    });
  };

  const validateAnswers = async () => {
    setResult(true);
    navigation.push('QUIZZ_RESULTS');
  };

  const GoToStep1 = () => {
    navigation.push('QUIZZ_INTERNAL_SITUATIONS');
  };

  const GoToStep2 = () => {
    navigation.push('QUIZZ_EXTERNAL_SITUATIONS');
  };

  return (
    <QuizzRiskSituationsStack.Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}>
      <QuizzRiskSituationsStack.Screen name="QUIZZ_ONBOARDING">
        {({ navigation }) => (
          <ScreenBgStyled>
            <TopContainer>
              <BackButton onPress={navigation.goBack} marginBottom />
              <Title color="#4030a5">Identifier mes situations à risques</Title>
              <ElementDayDefi
                content={
                  <TextStyled>
                    Lorsqu'une personne a l'impression qu'elle a{' '}
                    <TextStyled bold>moins de contrôle sur sa consommation</TextStyled> dans une situation particulière,
                    on dit que cette situation est à risque.
                  </TextStyled>
                }
              />
              <ElementDayDefi
                content={
                  <TextStyled>
                    Une situation à haut risque peut provenir de l'<TextStyled bold>extérieur</TextStyled> (Ex. : quand
                    quelqu'un insiste pour que je prenne un verre, quand je vois une publicité qui me fait penser à
                    boire).
                  </TextStyled>
                }
              />
              <ElementDayDefi
                content={
                  <TextStyled>
                    Ou de l'<TextStyled bold>intérieur</TextStyled> (Ex. : quand je suis fâché(e), quand je m'ennuie,
                    quand je suis stressé(e) ou quand je suis triste).
                  </TextStyled>
                }
              />
              <ButtonPrimary onPress={GoToStep1} content="Je reconnais mes situations" widthSmall />
            </TopContainer>
          </ScreenBgStyled>
        )}
      </QuizzRiskSituationsStack.Screen>
      <QuizzRiskSituationsStack.Screen name="QUIZZ_INTERNAL_SITUATIONS">
        {({ navigation }) => (
          <Situation
            section={riskSituations[0]}
            toggleAnswer={toggleAnswer}
            answers={answers}
            navigation={navigation}
            onPress={GoToStep2}
            description1={
              <>
                Parmi les situations suivantes, lesquelles vous semblent à risque (c'est à dire que vous allez
                <TextStyled bold> surconsommer de l'alcool</TextStyled>) ?
              </>
            }
            description2={
              <>
                Ici, choissisez <TextStyled bold>jusqu'à 2 situations extérieures</TextStyled>
              </>
            }
          />
        )}
      </QuizzRiskSituationsStack.Screen>
      <QuizzRiskSituationsStack.Screen name="QUIZZ_EXTERNAL_SITUATIONS" initialParams={route?.params}>
        {({ navigation }) => (
          <Situation
            section={riskSituations[1]}
            toggleAnswer={toggleAnswer}
            answers={answers}
            navigation={navigation}
            onPress={validateAnswers}
            description1={
              <>
                Puis choissisez <TextStyled bold>jusqu'à 2 situations intérieures.</TextStyled>
              </>
            }
            description2={
              <>
                Lesquelles vous semblent à risque (c'est à dire que vous allez{' '}
                <TextStyled bold>surconsommer de l'alcool</TextStyled>) ?
              </>
            }
          />
        )}
      </QuizzRiskSituationsStack.Screen>
      <QuizzRiskSituationsStack.Screen name="QUIZZ_RESULTS" initialParams={route?.params}>
        {({ navigation }) => <ResultRiskSituations navigation={navigation} answers={answers} />}
      </QuizzRiskSituationsStack.Screen>
    </QuizzRiskSituationsStack.Navigator>
  );
};

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px ${(props) => (props.shortPaddingBottom ? 30 : 100)}px;
`;

const Title = styled(H1)``;

export default QuizzRiskSituationsOnBoarding;
