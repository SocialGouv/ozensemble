import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../components/Background';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import CravingBreath from './CravingBreath';
import CravingIndex from './CravingIndex';
import VideosIndex from './VideosIndex';
import ExercicesVideosIndex from './ExercicesVideosIndex';
import EntertainmentVideosIndex from './EntertainmentVideosIndex';
import HydratationAdvice from './HydratationAdvice';
import MusicAdvice from './MusicAdvice';
import ShowerAdvice from './ShowerAdvice';
import WalkAdvice from './WalkAdvice';
import ReadingAdvice from './ReadingAdvice';
import VideoPlayer from '../../components/VideoPlayer';

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
        <CravingStack.Screen name="HYDRATATION_ADVICE" component={HydratationAdvice} />
        <CravingStack.Screen name="MUSIC_ADVICE" component={MusicAdvice} />
        <CravingStack.Screen name="READING_ADVICE" component={ReadingAdvice} />
        <CravingStack.Screen name="SHOWER_ADVICE" component={ShowerAdvice} />
        <CravingStack.Screen name="WALK_ADVICE" component={WalkAdvice} />
        <CravingStack.Screen name="VIDEO_PLAYER" component={VideoPlayer} />
      </CravingStack.Navigator>
    </Background>
  );
};

export default CravingNavigator;
