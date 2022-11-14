import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import H2 from '../../components/H2';
import { P } from '../../components/Articles';

import QuizzEvaluateConso from './QuizzEvaluateConso';
import QuizzLifeQuality from './QuizzLifeQuality';
import QuizzMotivations from './QuizzMotivations';
import QuizzOnboarding from './QuizzOnboarding';

import QuizzElement from './QuizzElement';
import ContactForm from '../Health/ContactForm';
import Doctolib from '../Health/Doctolib';
import {
  betterEvaluateQuizzResultState,
  lifeQualityQuizzResultState,
  motivationsQuizzResultState,
  riskSituationsQuizzAnswersState,
  Defi3_Day3_Answers_Help_State,
} from '../../recoil/quizzs';
import QuizzRiskSituations from './QuizzRiskSituations';
import Defi2_Day4 from '../Defis/Defi2/Defi2_Day4';
import { defi2EmotionState } from '../../recoil/defis';
import Defi2_Day5_Navigation from '../Defis/Defi2/Day5/Defi2_Day5_Navigator';
import { storage } from '../../services/storage';
import WrapperContainer from '../../components/WrapperContainer';
import Defi3Day3 from '../../scenes/Defis/Defi3/Day3';

const QuizzsStack = createStackNavigator();

const QuizzsNavigator = () => (
  <QuizzsStack.Navigator headerMode="none">
    <QuizzsStack.Screen name="QUIZZ_MENU" component={QuizzMenu} />
    <QuizzsStack.Screen name="ONBOARDING_QUIZZ" component={QuizzOnboarding} />
    <QuizzsStack.Screen
      name="EVALUATE_CONSO_QUIZZ"
      component={QuizzEvaluateConso}
      initialParams={{
        title: 'Mieux mesurer ma consommation',
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="LIFE_QUALITY_QUIZZ"
      component={QuizzLifeQuality}
      initialParams={{
        title: 'Évaluer sa qualité de vie',
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="MOTIVATIONS_QUIZZ"
      component={QuizzMotivations}
      initialParams={{
        title: 'Quelles raisons vous motivent à diminuer votre consommation ?',
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="RISK_SITUATIONS_QUIZZ"
      component={QuizzRiskSituations}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="RISK_SITUATIONS_HIERARCHISE"
      component={Defi2_Day4}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="AFFRONTER_SITUATION"
      component={Defi2_Day5_Navigation}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="FACTEURS_MOTIVATION"
      component={Defi3Day3}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen name="CONTACT" component={ContactForm} />
    <QuizzsStack.Screen name="DOCTOLIB" component={Doctolib} />
  </QuizzsStack.Navigator>
);
const QuizzMenu = () => {
  const navigation = useNavigation();
  const resultsRiskSituation = useRecoilValue(riskSituationsQuizzAnswersState);
  const betterEvaluateQuizzResult = useRecoilValue(betterEvaluateQuizzResultState);
  const lifeQualityQuizzResult = useRecoilValue(lifeQualityQuizzResultState);
  const motivationsQuizzResult = useRecoilValue(motivationsQuizzResultState);
  const riskSituationsQuizzAnswers = useRecoilValue(riskSituationsQuizzAnswersState);
  const defi2Emotion = useRecoilValue(defi2EmotionState);
  const Defi3_Day3_Answers_Help = useRecoilValue(Defi3_Day3_Answers_Help_State);

  return (
    <WrapperContainer title="Tests des défis" onPressBackButton={navigation.goBack}>
      <SubTitle>
        Pour refaire les tests si besoin et continuer à réfléchir au rôle de l'alcool dans ma vie quotidienne.
      </SubTitle>
      <DefiCategorieTitle color="#4030a5">Premier défi</DefiCategorieTitle>
      <QuizzElement
        title="Mieux mesurer ma consommation"
        onStart={() => navigation.navigate('EVALUATE_CONSO_QUIZZ', { initialRouteName: 'QUIZZ_QUESTIONS' })}
        onShowResult={() => navigation.navigate('EVALUATE_CONSO_QUIZZ', { initialRouteName: 'QUIZZ_RESULTS' })}
        done={Object.keys(betterEvaluateQuizzResult || {})?.length > 0}
        showOnlyIfDone
      />
      <QuizzElement
        title="Qualité de vie"
        onStart={() => navigation.navigate('LIFE_QUALITY_QUIZZ', { initialRouteName: 'QUIZZ_QUESTIONS' })}
        onShowResult={() => navigation.navigate('LIFE_QUALITY_QUIZZ', { initialRouteName: 'QUIZZ_RESULTS' })}
        done={lifeQualityQuizzResult?.length > 0}
        showOnlyIfDone
      />
      <QuizzElement
        title="Mes motivations à diminuer"
        onStart={() => navigation.navigate('MOTIVATIONS_QUIZZ', { initialRouteName: 'QUIZZ_QUESTIONS' })}
        onShowResult={() => navigation.navigate('MOTIVATIONS_QUIZZ', { initialRouteName: 'QUIZZ_RESULTS' })}
        done={motivationsQuizzResult !== null}
        showOnlyIfDone
      />
      <DefiCategorieTitle color="#4030a5">Deuxième défi</DefiCategorieTitle>
      <QuizzElement
        title="Mes situations à risque"
        onStart={() => navigation.navigate('RISK_SITUATIONS_QUIZZ', { screen: 'QUIZZ_INTERNAL_SITUATIONS' })}
        onShowResult={() => navigation.navigate('RISK_SITUATIONS_QUIZZ', { screen: 'QUIZZ_RESULTS' })}
        done={riskSituationsQuizzAnswers?.length > 0}
        showOnlyIfDone
      />
      <QuizzElement
        topTitle="Deuxième défi"
        title="Hiérarchiser mes situations"
        onStart={() => navigation.navigate('RISK_SITUATIONS_HIERARCHISE')}
        done={Number(storage.getNumber('@Defi2_ValidatedDays')) > 3 && !!resultsRiskSituation}
        showOnlyIfDone
      />
      <QuizzElement
        topTitle="Deuxième défi"
        title="Affronter une situation"
        onStart={() => navigation.navigate('AFFRONTER_SITUATION', { screen: 'DEFI2_DAY5' })}
        done={defi2Emotion > 0}
        showOnlyIfDone
      />

      <DefiCategorieTitle color="#4030a5">Troisième défi</DefiCategorieTitle>
      <QuizzElement
        title="Les facteurs influençant ma motivation"
        onStart={() => navigation.navigate('FACTEURS_MOTIVATION', { screen: 'EXPLICATIONS' })}
        done={Defi3_Day3_Answers_Help.length > 0}
        showOnlyIfDone
      />
    </WrapperContainer>
  );
};

export default QuizzsNavigator;

const SubTitle = styled(P)`
  margin-bottom: 20px;
`;

const DefiCategorieTitle = styled(H2)`
  margin-bottom: 20px;
`;
