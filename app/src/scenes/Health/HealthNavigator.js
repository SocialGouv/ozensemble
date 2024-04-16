import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactForm from './ContactForm';
import Doctolib from './Doctolib';
import Conseils from './Conseils';
import Testimonies from './Testimonies';
import OwnTestimony from './OwnTestimony';
import ToSayNo from './Articles/ToSayNo';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';
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

const HealthStack = createStackNavigator();
const HealthNavigator = () => {
  useToggleCTA({ routesToHideCTA: ['OWN_TESTIMONY'], navigator: 'Health' });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HealthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HEALTH_ARTICLE">
        <HealthStack.Screen name="HEALTH_ARTICLE" component={Conseils} />
        <HealthStack.Screen name="CONTACT" component={ContactForm} />
        <HealthStack.Screen name="TESTIMONIES" component={Testimonies} />
        <HealthStack.Screen name="OWN_TESTIMONY" component={OwnTestimony} />
        <HealthStack.Screen name="DOCTOLIB" component={Doctolib} />
        <HealthStack.Screen name="ALCOOL_WITHDRAWAL_TREATMENT" component={AlcoolWithdrawalTreatment} />
        <HealthStack.Screen name="TO_SAY_NO" component={ToSayNo} />
        <HealthStack.Screen name="CRAVING_TREATMENT" component={CravingsTreatment} />
        <HealthStack.Screen name="ALCOHOL_AND_NORMS" component={AlcoholAndNorms} />
        <HealthStack.Screen name="ALCOOL_WITHDRAWAL_BENEFITS" component={AlcoolWithdrawalBenefits} />
        <HealthStack.Screen name="ALCOHOL_ADDICTION" component={AlcoholAddiction} />
        <HealthStack.Screen name="ALCOHOL_AND_CALORIES" component={AlcoholAndCalories} />
        <HealthStack.Screen name="TO_HELP_ME_REDUCE" component={ToHelpMeReduce} />
        <HealthStack.Screen name="DID_YOU_KNOW" component={DidYouKnow} />
        <HealthStack.Screen name="ALCOHOL_AND_MOTIVATION" component={AlcoholAndMotivation} />
        <HealthStack.Screen name="ALCOHOL_AND_HEALTH_RISKS" component={AlcoholAndHealthRisks} />
        <HealthStack.Screen name="ALCOHOL_AND_DEPENDENCY" component={AlcoholAndDependency} />
        <HealthStack.Screen
          name="ONBOARDING_QUIZZ"
          component={QuizzOnboarding}
          initialParams={{
            rootRoute: 'HEALTH',
          }}
        />
      </HealthStack.Navigator>
    </Background>
  );
};

export default HealthNavigator;
