import React from 'react';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash from 'react-native-bootsplash';
import CONSTANTS from '../../reference/constants';
import matomo from '../../services/matomo';
import HeaderBackground from '../../components/HeaderBackground';
import ArrowRight from '../../components/ArrowRight';
import ArrowLeft from '../../components/ArrowLeft';
import Dot from '../../components/SwiperDot';
import Background from '../../components/Background';
import ButtonPrimary from '../../components/ButtonPrimary';
import { Screen1, Screen2, Screen3 } from './Screens';
import { screenHeight } from '../../styles/theme';
import Agreement from './Agreement';

const WelcomeScreen = ({ navigation }) => {
  const [agreed, setAgreed] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [pagination, setPagination] = React.useState(true);
  const swiperRef = React.useRef();

  const indexChanged = (index) => {
    setCurrentIndex(index)
    if (index === 2) {
      setPagination(false)
    }
    else {
      setPagination(true)
    }
  }

  const onStartPress = async () => {
    AsyncStorage.setItem(CONSTANTS.STORE_KEY_ONBOARDING_DONE, 'true');
    RNBootSplash.show({ duration: 250 });
    await new Promise((res) => setTimeout(res, 250));
    const onBoardingAnswersExist = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ONBOARDING_ANSWERS);
    if (!onBoardingAnswersExist) navigation.navigate('ONBOARDING_QUIZZ');
    else navigation.navigate('TABS');
    await new Promise((res) => setTimeout(res, 750));
    RNBootSplash.hide({ duration: 250 });
    matomo.logQuizzOpen(CONSTANTS.FROM_WELCOME);
  };

  onPressNext = () => swiperRef?.current?.scrollBy(1);

  return (
    <Background color="#39cec0" withSwiperContainer neverBottom>
      <HeaderBackground />
      <Swiper
        onIndexChanged={indexChanged}
        ref={swiperRef}
        loop={false}
        showsButtons
        showsPagination={pagination}
        dot={<Dot />}
        activeDot={<Dot active />}
        nextButton={<ArrowRight size={15} style={{ marginTop: 50 }} />}
        prevButton={<ArrowLeft size={15} style={{ marginTop: 50 }} />}
        paginationStyle={{
          justifyContent: 'center',
          bottom: screenHeight * 0.1,
        }}>
        <Screen1 />
        <Screen2 />
        <Screen3 />
      </Swiper>
      <CTAButtonContainer>
        {currentIndex === 2 ? (
          <>
            <Agreement onAgree={() => setAgreed(!agreed)} agreed={agreed} />
            <ButtonPrimary content="Commencer" onPress={onStartPress} disabled={!agreed} />
          </>
        ) : (
          <ButtonPrimary content="Suivant" onPress={onPressNext} />
        )}
      </CTAButtonContainer>
    </Background >
  );
};

export default WelcomeScreen;

const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
`;
