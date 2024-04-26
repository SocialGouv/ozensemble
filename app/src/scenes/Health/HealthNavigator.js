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
import CravingBreath from './Craving/CravingBreath';
import CravingIndex from './Craving/CravingIndex';
import HealthIndex from './HealthIndex';
import VideosIndex from './Craving/VideosIndex';
import PositiveVideos from './Craving/PositiveVideos';
import ExercicesVideosIndex from './Craving/ExercicesVideosIndex';
import EntertainmentVideosIndex from './Craving/EntertainmentVideosIndex';
import AdviseVideos from './Craving/AdviseVideos';
import MeditationVideos from './Craving/MeditationVideos';
import TherapyVideos from './Craving/TherapyVideos';
import SophrologyVideos from './Craving/SophrologyVideos';
import HydratationAdvice from './Craving/HydratationAdvice';
import MusicAdvice from './Craving/MusicAdvice';
import ShowerAdvice from './Craving/ShowerAdvice';
import WalkAdvice from './Craving/WalkAdvice';
import ReadingAdvice from './Craving/ReadingAdvice';
import FunnyVideos from './Craving/FunnyVideos';
import SensationVideos from './Craving/SensationVideos';
import ChillVideos from './Craving/ChillVideos';

const HealthStack = createStackNavigator();
const HealthNavigator = () => {
  useToggleCTA({ routesToHideCTA: ['OWN_TESTIMONY'], navigator: 'Health' });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HealthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HEALTH_INDEX">
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
        <HealthStack.Screen name="CRAVING_VIDEOS" component={VideosIndex} />
        <HealthStack.Screen name="CRAVING_BREATH" component={CravingBreath} />
        <HealthStack.Screen name="CRAVING_INDEX" component={CravingIndex} />
        <HealthStack.Screen name="HEALTH_INDEX" component={HealthIndex} />
        <HealthStack.Screen name="POSITIVE_VIDEOS" component={PositiveVideos} />
        <HealthStack.Screen name="ADVISE_VIDEOS" component={AdviseVideos} />
        <HealthStack.Screen name="EXERCISES_VIDEOS_INDEX" component={ExercicesVideosIndex} />
        <HealthStack.Screen name="ENTERTAINMENT_VIDEOS_INDEX" component={EntertainmentVideosIndex} />
        <HealthStack.Screen name="MEDITATION_VIDEOS" component={MeditationVideos} />
        <HealthStack.Screen name="THERAPY_VIDEOS" component={TherapyVideos} />
        <HealthStack.Screen name="SOPHROLOGY_VIDEOS" component={SophrologyVideos} />
        <HealthStack.Screen name="FUNNY_VIDEOS" component={FunnyVideos} />
        <HealthStack.Screen name="SENSATION_VIDEOS" component={SensationVideos} />
        <HealthStack.Screen name="CHILL_VIDEOS" component={ChillVideos} />
        <HealthStack.Screen name="HYDRATATION_ADVICE" component={HydratationAdvice} />
        <HealthStack.Screen name="MUSIC_ADVICE" component={MusicAdvice} />
        <HealthStack.Screen name="READING_ADVICE" component={ReadingAdvice} />
        <HealthStack.Screen name="SHOWER_ADVICE" component={ShowerAdvice} />
        <HealthStack.Screen name="WALK_ADVICE" component={WalkAdvice} />

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
