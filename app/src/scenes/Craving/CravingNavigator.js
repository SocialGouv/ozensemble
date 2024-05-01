import React from 'react';
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

const CravingStack = createStackNavigator();
const CravingNavigator = () => {
  useToggleCTA({
    hideCTA: true,
    navigator: 'Craving',
  });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <CravingStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CRAVING_INDEX">
        <CravingStack.Screen name="CRAVING_VIDEOS" component={VideosIndex} />
        <CravingStack.Screen name="CRAVING_BREATH" component={CravingBreath} />
        <CravingStack.Screen name="CRAVING_INDEX" component={CravingIndex} />
        <CravingStack.Screen name="EXERCISES_VIDEOS_INDEX" component={ExercicesVideosIndex} />
        <CravingStack.Screen name="ENTERTAINMENT_VIDEOS_INDEX" component={EntertainmentVideosIndex} />
        <CravingStack.Screen name="VIDEO_PLAYER" component={VideoPlayer} />
        <CravingStack.Screen name="CRAVING_ADVICE" component={Advice} />
      </CravingStack.Navigator>
    </Background>
  );
};

export default CravingNavigator;
