import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import H2 from '../../components/H2';
import { P } from '../../components/Articles';

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
  defi3_Day3_Answers_Help_State,
  quizzDefi3Day1AnswersState,
  quizzDefi3Day5AnswersState,
  defi4_Day5_ResultState,
  reevaluateQuizzResultState,
  defi5_Day2_ResultState,
  relifeQualityQuizzResultState,
  defi5_Day4_ResultState,
  defi5_Day5_ResultState,
} from '../../recoil/quizzs';
import QuizzRiskSituations from './QuizzRiskSituations';
import Defi2_Day4 from '../Defis/Defi2/Defi2_Day4';
import { defi2EmotionState } from '../../recoil/defis';
import Defi2_Day5_Navigation from '../Defis/Defi2/Day5/Defi2_Day5_Navigator';
import { storage } from '../../services/storage';
import WrapperContainer from '../../components/WrapperContainer';
import Defi3Day3 from '../../scenes/Defis/Defi3/Day3';
import Defi3_Day1 from '../Defis/Defi3/Defi3_Day1';
import Defi3_Day5 from '../Defis/Defi3/Defi3_Day5';
import Defi4_Day5 from '../Defis/Defi4/Defi4_Day5';
import Defi1_Day2 from '../Defis/Defi1/Defi1_Day2';
import Defi5_Day2 from '../Defis/Defi5/Defi5_Day2';
import Defi1_Day4 from '../Defis/Defi1/Defi1_Day4';
import Defi5_Day3 from '../Defis/Defi5/Defi5_Day3';
import Defi5_Day4 from '../Defis/Defi5/Defi5_Day4';
import Defi5_Day5 from '../Defis/Defi5/Defi5_Day5';

const QuizzsStack = createStackNavigator();

const QuizzsNavigator = () => (
  <QuizzsStack.Navigator headerMode="none">
    <QuizzsStack.Screen name="QUIZZ_MENU" component={QuizzMenu} />
    <QuizzsStack.Screen name="ONBOARDING_QUIZZ" component={QuizzOnboarding} />
    <QuizzsStack.Screen
      name="EVALUATE_CONSO_QUIZZ"
      component={Defi1_Day2}
      initialParams={{
        title: 'Mieux mesurer ma consommation',
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="LIFE_QUALITY_QUIZZ"
      component={Defi1_Day4}
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
      name="QUIZZ_ALCOOL_EN_CHIFFRES"
      component={Defi3_Day1}
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
    <QuizzsStack.Screen
      name="QUIZZ_HALTE_IDEES_RECUES"
      component={Defi3_Day5}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="SE_FAIRE_PLAISIR_AUTREMENT"
      component={Defi4_Day5}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
        initialRouteName: 'QUIZZ_QUESTIONS',
      }}
    />
    <QuizzsStack.Screen
      name="ENVIES_DALCOOL"
      component={Defi5_Day2}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="REEVALUATE_QUALITY_LIFE"
      component={Defi5_Day3}
      initialParams={{
        title: "L'évolution de ma qualité de vie",
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="BIENETRE_PHYSIQUE"
      component={Defi5_Day4}
      initialParams={{
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="BIENETRE_PSYCHOLOGIQUE"
      component={Defi5_Day5}
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
  const reevaluateQuizzResult = useRecoilValue(reevaluateQuizzResultState);
  const lifeQualityQuizzResult = useRecoilValue(lifeQualityQuizzResultState);
  const motivationsQuizzResult = useRecoilValue(motivationsQuizzResultState);
  const riskSituationsQuizzAnswers = useRecoilValue(riskSituationsQuizzAnswersState);
  const defi2Emotion = useRecoilValue(defi2EmotionState);
  const defi3_Day1_Answers = useRecoilValue(quizzDefi3Day1AnswersState);
  const defi3_Day3_Answers_Help = useRecoilValue(defi3_Day3_Answers_Help_State);
  const defi3_Day5_Answers = useRecoilValue(quizzDefi3Day5AnswersState);
  const defi4_Day5_Results = useRecoilValue(defi4_Day5_ResultState);
  const defi5_Day2_Results = useRecoilValue(defi5_Day2_ResultState);
  const defi5_Day3_Results = useRecoilValue(relifeQualityQuizzResultState);
  const defi5_Day4_Results = useRecoilValue(defi5_Day4_ResultState);
  const defi5_Day5_Results = useRecoilValue(defi5_Day5_ResultState);

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
        title="Hiérarchiser mes situations"
        onStart={() => navigation.navigate('RISK_SITUATIONS_HIERARCHISE')}
        done={Number(storage.getNumber('@Defi2_ValidatedDays')) > 3 && !!resultsRiskSituation}
        showOnlyIfDone
      />
      <QuizzElement
        title="Affronter une situation"
        onStart={() => navigation.navigate('AFFRONTER_SITUATION', { screen: 'DEFI2_DAY5' })}
        done={defi2Emotion > 0}
        showOnlyIfDone
      />

      <DefiCategorieTitle color="#4030a5">Troisième défi</DefiCategorieTitle>
      <QuizzElement
        title="Quiz l'alcool en quelques chiffres"
        onStart={() => navigation.navigate('QUIZZ_ALCOOL_EN_CHIFFRES')}
        done={Object.keys(defi3_Day1_Answers).length === 5}
        showOnlyIfDone
      />
      <QuizzElement
        title="Les facteurs influençant ma motivation"
        onStart={() => navigation.navigate('FACTEURS_MOTIVATION', { screen: 'EXPLICATIONS' })}
        done={defi3_Day3_Answers_Help.length > 0}
        showOnlyIfDone
      />
      <QuizzElement
        title="Quiz halte aux idées reçues"
        onStart={() => navigation.navigate('QUIZZ_HALTE_IDEES_RECUES')}
        done={Object.keys(defi3_Day5_Answers).length === 3}
        showOnlyIfDone
      />
      <DefiCategorieTitle color="#4030a5">Quatrième défi</DefiCategorieTitle>
      <QuizzElement
        title="Activités pour se faire plaisir autrement"
        onStart={() => navigation.navigate('SE_FAIRE_PLAISIR_AUTREMENT')}
        done={!!defi4_Day5_Results}
        showOnlyIfDone
      />
      <DefiCategorieTitle color="#4030a5">Cinquième défi</DefiCategorieTitle>
      <QuizzElement
        title="Mesurer ma consommation après 4 semaines"
        onStart={() => navigation.navigate('REEVALUATE_CONSO_QUIZZ', { initialRouteName: 'QUIZZ_QUESTIONS' })}
        onShowResult={() => navigation.navigate('REEVALUATE_CONSO_QUIZZ', { initialRouteName: 'QUIZZ_RESULTS' })}
        done={Object.keys(reevaluateQuizzResult || {})?.length > 0}
        showOnlyIfDone
      />
      <QuizzElement
        title="L'évolution de mes envies d'alcool"
        onStart={() => navigation.navigate('ENVIES_DALCOOL')}
        done={!!defi5_Day2_Results}
        showOnlyIfDone
      />
      <QuizzElement
        title="L'évolution de ma qualité de vie"
        onStart={() => navigation.navigate('REEVALUATE_QUALITY_LIFE', { initialRouteName: 'QUIZZ_QUESTIONS' })}
        done={defi5_Day3_Results?.length > 0}
        showOnlyIfDone
      />
      <QuizzElement
        title="L'évolution de mon bien-être physique"
        onStart={() => navigation.navigate('BIENETRE_PHYSIQUE')}
        done={!!defi5_Day4_Results}
        showOnlyIfDone
      />
      <QuizzElement
        title="L'évolution de mon bien-être psychologique"
        onStart={() => navigation.navigate('BIENETRE_PSYCHOLOGIQUE')}
        done={!!defi5_Day5_Results}
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
