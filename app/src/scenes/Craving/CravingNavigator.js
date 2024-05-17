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
import { useIsFocused } from '@react-navigation/native';
import { storage } from '../../services/storage';

const CravingStack = createStackNavigator();
const CravingNavigator = () => {
  const isFocused = useIsFocused();
  useToggleCTA({
    hideCTA: true,
    navigator: 'Craving',
  });

  useEffect(() => {
    checkLeftCraving();

    function checkLeftCraving() {
      if (!isFocused) {
        storage.set('@leftCraving', true);
      }
      if (isFocused) {
        storage.set('@leftCraving', false);
      }
    }
  }, [isFocused]);

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
      </CravingStack.Navigator>
    </Background>
  );
};

export default CravingNavigator;
