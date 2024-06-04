import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../components/Background';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import CravingBreath from './CravingBreath';
import CravingIndex from './CravingIndex';
import VideosIndex from './VideosIndex';
import ExercicesVideosIndex from './ExercicesVideosIndex';
import EntertainmentVideosIndex from './EntertainmentVideosIndex';
import VideoPlayer from '../../components/VideoPlayer';
import Advice from './Advice';
import CravingStrategies from './CravingStrategies';
import DefineStrategy from './DefineStrategy';
import NoStrategy from './NoStrategy';
import { storage } from '../../services/storage';
import Conseils from '../Health/Conseils';
import Testimonies from '../Health/Testimonies';
import AlcoolWithdrawalTreatment from '../Health/Articles/AlcoolWithdrawalTreatment';
import ToSayNo from '../Health/Articles/ToSayNo';
import CravingsTreatment from '../Health/Articles/CravingsTreatment';
import AlcoholAndNorms from '../Health/Articles/AlcoholAndNorms';
import AlcoolWithdrawalBenefits from '../Health/Articles/AlcoolWithdrawalBenefits';
import AlcoholAddiction from '../Health/Articles/AlcoholAddiction';
import AlcoholAndCalories from '../Health/Articles/AlcoholAndCalories';
import ToHelpMeReduce from '../Health/Articles/ToHelpMeReduce';
import DidYouKnow from '../Health/Articles/DidYouKnow';
import AlcoholAndMotivation from '../Health/Articles/AlcoholAndMotivation';
import AlcoholAndHealthRisks from '../Health/Articles/AlcoholAndHealthRisks';
import AlcoholAndDependency from '../Health/Articles/AlcoholAndDependency';
import OwnTestimony from '../Health/OwnTestimony';
import { dayjsInstance } from '../../services/dates';

const CravingStack = createStackNavigator();
const CravingNavigator = () => {
  useToggleCTA({
    hideCTA: true,
    navigator: 'Craving',
  });

  useEffect(() => {
    if (!storage.getString('@firstTimeCraving')) {
      storage.set('@firstTimeCraving', dayjsInstance().format('YYYY-MM-DD'));
    }
  }, []);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <CravingStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CRAVING_INDEX">
        <CravingStack.Screen name="CRAVING_VIDEOS" component={VideosIndex} />
        <CravingStack.Screen name="CRAVING_BREATH" component={CravingBreath} />
        <CravingStack.Screen name="CRAVING_INDEX" component={CravingIndex} />
        <CravingStack.Screen name="EXERCISES_VIDEOS_INDEX" component={ExercicesVideosIndex} />
        <CravingStack.Screen name="ENTERTAINMENT_VIDEOS_INDEX" component={EntertainmentVideosIndex} />
        <CravingStack.Screen name="VIDEO_PLAYER" component={VideoPlayer} />
        <CravingStack.Screen name="HYDRATION_ADVICE" component={Advice} />
        <CravingStack.Screen name="CRAVING_STRATEGIES" component={CravingStrategies} />
        <CravingStack.Screen name="DEFINE_STRATEGY" component={DefineStrategy} />
        <CravingStack.Screen name="NO_STRATEGY" component={NoStrategy} />
        <CravingStack.Screen name="HEALTH_ARTICLE" component={Conseils} />
        <CravingStack.Screen name="TESTIMONIES" component={Testimonies} />
        <CravingStack.Screen name="OWN_TESTIMONY" component={OwnTestimony} />
        <CravingStack.Screen name="ALCOOL_WITHDRAWAL_TREATMENT" component={AlcoolWithdrawalTreatment} />
        <CravingStack.Screen name="TO_SAY_NO" component={ToSayNo} />
        <CravingStack.Screen name="CRAVING_TREATMENT" component={CravingsTreatment} />
        <CravingStack.Screen name="ALCOHOL_AND_NORMS" component={AlcoholAndNorms} />
        <CravingStack.Screen name="ALCOOL_WITHDRAWAL_BENEFITS" component={AlcoolWithdrawalBenefits} />
        <CravingStack.Screen name="ALCOHOL_ADDICTION" component={AlcoholAddiction} />
        <CravingStack.Screen name="ALCOHOL_AND_CALORIES" component={AlcoholAndCalories} />
        <CravingStack.Screen name="TO_HELP_ME_REDUCE" component={ToHelpMeReduce} />
        <CravingStack.Screen name="DID_YOU_KNOW" component={DidYouKnow} />
        <CravingStack.Screen name="ALCOHOL_AND_MOTIVATION" component={AlcoholAndMotivation} />
        <CravingStack.Screen name="ALCOHOL_AND_HEALTH_RISKS" component={AlcoholAndHealthRisks} />
        <CravingStack.Screen name="ALCOHOL_AND_DEPENDENCY" component={AlcoholAndDependency} />
      </CravingStack.Navigator>
    </Background>
  );
};

export default CravingNavigator;
