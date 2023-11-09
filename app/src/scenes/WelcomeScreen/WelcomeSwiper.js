import React, { useRef, useState } from 'react';
import Swiper from 'react-native-swiper';
import { useSetRecoilState } from 'recoil';
import { storage } from '../../services/storage';
import { showBootSplashState } from '../../components/CustomBootsplash';
import { Screen1, Screen2, Screen3, Screen4 } from './Screens';
import Dot from '../../components/SwiperDot';
import { View } from 'react-native';

const WelcomeSwiper = ({ navigation }) => {
  const [agreed, setAgreed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [pagination, setPagination] = useState(true);
  const swiperRef = useRef();
  const setShowBootsplash = useSetRecoilState(showBootSplashState);

  const indexChanged = (index) => {
    setCurrentIndex(index);
    // if (index === 3) {
    //   setPagination(false);
    // } else {
    //   setPagination(true);
    // }
  };

  const onStartPress = async () => {
    storage.set('@OnboardingDoneWithCGU', true);
    navigation.navigate('USER_SURVEY_START', { from: 'NEW_USER' });
    // // RNBootSplash.show;
    // setShowBootsplash(true);
    // await new Promise((res) => setTimeout(res, 250));
    // navigation.navigate('TABS');
    // await new Promise((res) => setTimeout(res, 750));
    // // RNBootSplash.hide({ fade: true });
    // setShowBootsplash(false);
  };

  const onPressNext = () => swiperRef?.current?.scrollBy(1);

  return (
    <View className="bg-[#3E309F] w-full">
      <View className="h-[10%]" />
      <View className="h-[90%]">
        <Swiper
          className={`h-full`}
          onIndexChanged={indexChanged}
          ref={swiperRef}
          loop={false}
          showsButtons={false}
          showsPagination={true}
          dot={<Dot />}
          activeDot={<Dot active />}
          paginationStyle={{
            justifyContent: 'center',
            bottom: 108,
          }}>
          <Screen1 currentIndex={currentIndex} onStartPress={onStartPress} onPressNext={onPressNext} />
          <Screen2 currentIndex={currentIndex} onStartPress={onStartPress} onPressNext={onPressNext} />
          <Screen3 currentIndex={currentIndex} onStartPress={onStartPress} onPressNext={onPressNext} />
          <Screen4
            currentIndex={currentIndex}
            onStartPress={onStartPress}
            onPressNext={onPressNext}
            agreed={agreed}
            setAgreed={setAgreed}
          />
        </Swiper>
      </View>
    </View>
  );
};

export default WelcomeSwiper;
