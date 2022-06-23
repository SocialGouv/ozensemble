import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';
import ResultRiskSituations from './ResultRiskSituations';
import Situation from './Situation';
import riskSituations from './riskSituations';
import { riskSituationsQuizzAnswersState, riskSituationsQuizzResultState } from '../../../recoil/quizzs';
import { setValidatedDays } from '../../Defis/utils';
import { P } from '../../../components/Articles';
import WrapperContainer from '../../../components/WrapperContainer';

const QuizzRiskSituationsStack = createStackNavigator();

const QuizzRiskSituations = ({ navigation, route }) => {
  const [answers, setAnswers] = useRecoilState(riskSituationsQuizzAnswersState);
  const setResult = useSetRecoilState(riskSituationsQuizzResultState);
  const toggleAnswer = async (answerKey, checked) => {
    setAnswers((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  const validateAnswers = async () => {
    setResult(true);
    navigation.push('QUIZZ_RESULTS');
  };

  const goToStep1 = () => {
    navigation.push('QUIZZ_INTERNAL_SITUATIONS');
  };

  const goToStep2 = () => {
    navigation.push('QUIZZ_EXTERNAL_SITUATIONS');
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <QuizzRiskSituationsStack.Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}>
      <QuizzRiskSituationsStack.Screen name="QUIZZ_ONBOARDING">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Identifier mes situations à risques">
            <ElementDayDefi
              content={
                <P>
                  Lorsqu'une personne a l'impression qu'elle a <P bold>moins de contrôle sur sa consommation</P> dans
                  une situation particulière, on dit que cette situation est à risque.
                </P>
              }
            />
            <ElementDayDefi
              content={
                <P>
                  Une situation à haut risque peut provenir de l'<P bold>extérieur</P> (Ex. : quand quelqu'un insiste
                  pour que je prenne un verre, quand je vois une publicité qui me fait penser à boire).
                </P>
              }
            />
            <ElementDayDefi
              content={
                <P>
                  Ou de l'<P bold>intérieur</P> (Ex. : quand je suis fâché(e), quand je m'ennuie, quand je suis
                  stressé(e) ou quand je suis triste).
                </P>
              }
            />
            <ButtonPrimary onPress={goToStep1} content="Je reconnais mes situations" widthSmall />
          </WrapperContainer>
        )}
      </QuizzRiskSituationsStack.Screen>
      <QuizzRiskSituationsStack.Screen name="QUIZZ_INTERNAL_SITUATIONS">
        {({ navigation }) => (
          <Situation
            section={riskSituations[0]}
            toggleAnswer={toggleAnswer}
            answers={answers}
            navigation={navigation}
            onPress={goToStep2}
            description1={
              <>
                Parmi les situations suivantes, lesquelles vous semblent à risque (c'est à dire que vous allez
                <P bold> surconsommer de l'alcool</P>) ?
              </>
            }
            description2={
              <>
                Ici, choissisez <P bold>jusqu'à 2 situations extérieures</P>
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
                Puis choissisez <P bold>jusqu'à 2 situations intérieures.</P>
              </>
            }
            description2={
              <>
                Lesquelles vous semblent à risque (c'est à dire que vous allez <P bold>surconsommer de l'alcool</P>) ?
              </>
            }
          />
        )}
      </QuizzRiskSituationsStack.Screen>
      <QuizzRiskSituationsStack.Screen
        name="QUIZZ_RESULTS"
        component={ResultRiskSituations}
        initialParams={route?.params}
      />
    </QuizzRiskSituationsStack.Navigator>
  );
};

export default QuizzRiskSituations;
