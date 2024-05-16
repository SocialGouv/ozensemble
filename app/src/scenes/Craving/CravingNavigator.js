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
import CravingStrategies from './CravingStrategies';
import DefineStrategy from './DefineStrategy';
import LeaveCravingModal from './LeaveCravingModal';
import NoStrategy from './NoStrategy';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CravingStack = createStackNavigator();
const CravingNavigator = () => {
  const navigation = useNavigation();
  useToggleCTA({
    hideCTA: true,
    navigator: 'Craving',
  });
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      });

      return () => {
        unsubscribe();
        setShowModal(true);
      };
    }, [])
  );

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
        <CravingStack.Screen name="LEAVING_CRAVING_MODAL" component={LeaveCravingModal} />
      </CravingStack.Navigator>
      {showModal && <LeaveCravingModal showmodal={showModal} setShowModal={setShowModal} />}
    </Background>
  );
};

export default CravingNavigator;
