import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ToSayNo from './Articles/ToSayNo';
import ToHelpMeReduce from './Articles/ToHelpMeReduce';
import DidYouKnow from './Articles/DidYouKnow';
import AlcoholAndNorms from './Articles/AlcoholAndNorms';
import AlcoholAddiction from './Articles/AlcoholAddiction';
import AlcoholAndCalories from './Articles/AlcoholAndCalories';
import Background from '../../components/Background';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import AlcoholAndMotivation from './Articles/AlcoholAndMotivation';
import AlcoholAndHealthRisks from './Articles/AlcoholAndHealthRisks';
import AlcoholAndDependency from './Articles/AlcoholAndDependency';
import AlcoolWithdrawalBenefits from './Articles/AlcoolWithdrawalBenefits';
import AlcoolWithdrawalTreatment from './Articles/AlcoolWithdrawalTreatment';
import CravingsTreatment from './Articles/CravingsTreatment';

const ArticlesStack = createStackNavigator();
const ArticlesNavigator = () => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <ArticlesStack.Navigator screenOptions={{ headerShown: false }}>
        <ArticlesStack.Screen name="ALCOOL_WITHDRAWAL_TREATMENT" component={AlcoolWithdrawalTreatment} />
        <ArticlesStack.Screen name="TO_SAY_NO" component={ToSayNo} />
        <ArticlesStack.Screen name="CRAVING_TREATMENT" component={CravingsTreatment} />
        <ArticlesStack.Screen name="ALCOHOL_AND_NORMS" component={AlcoholAndNorms} />
        <ArticlesStack.Screen name="ALCOOL_WITHDRAWAL_BENEFITS" component={AlcoolWithdrawalBenefits} />
        <ArticlesStack.Screen name="ALCOHOL_ADDICTION" component={AlcoholAddiction} />
        <ArticlesStack.Screen name="ALCOHOL_AND_CALORIES" component={AlcoholAndCalories} />
        <ArticlesStack.Screen name="TO_HELP_ME_REDUCE" component={ToHelpMeReduce} />
        <ArticlesStack.Screen name="DID_YOU_KNOW" component={DidYouKnow} />
        <ArticlesStack.Screen name="ALCOHOL_AND_MOTIVATION" component={AlcoholAndMotivation} />
        <ArticlesStack.Screen name="ALCOHOL_AND_HEALTH_RISKS" component={AlcoholAndHealthRisks} />
        <ArticlesStack.Screen name="ALCOHOL_AND_DEPENDENCY" component={AlcoholAndDependency} />
      </ArticlesStack.Navigator>
    </Background>
  );
};

export default ArticlesNavigator;
