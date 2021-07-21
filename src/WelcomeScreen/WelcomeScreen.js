import React from 'react';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../reference/constants';
import matomo from '../services/matomo';
import HeaderBackground from '../components/HeaderBackground';
import ArrowRight from '../components/ArrowRight';
import ArrowLeft from '../components/ArrowLeft';
import Dot from '../components/SwiperDot';
import Background from '../components/Background';
import ButtonPrimary from '../components/ButtonPrimary';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import { CTAButtonContainer, AbsoluteView } from './styles';
import { screenHeight } from '../styles/theme';
import Agreement from './Agreement';

/*
CANNOT USE RN Modal
because on iOS it's clashing with splash screnn, weird
*/

const WelcomeScreen = ({ setView, visible }) => {
  const [agreed, setAgreed] = React.useState(false);

  const onStartPress = () => {
    AsyncStorage.setItem(CONSTANTS.STORE_KEY_ONBOARDING_DONE, 'true');
    setView(CONSTANTS.VIEW_QUIZZ);
    matomo.logQuizzOpen(CONSTANTS.FROM_WELCOME);
  };

  if (!visible) return null;

  return (
    <AbsoluteView>
      <Background color="#39cec0" withSwiperContainer neverBottom>
        <HeaderBackground />
        <Swiper
          loop={false}
          showsButtons
          dot={<Dot />}
          activeDot={<Dot active />}
          nextButton={<ArrowRight size={15} />}
          prevButton={<ArrowLeft size={15} />}
          // eslint-disable-next-line react-native/no-inline-styles
          paginationStyle={{
            justifyContent: 'flex-start',
            paddingLeft: '10%',
            bottom: screenHeight * 0.1,
          }}>
          <Screen1 />
          <Screen2 />
          <Screen3 />
        </Swiper>
        <CTAButtonContainer>
          <ButtonPrimary content="Commencez" onPress={onStartPress} disabled={!agreed} />
          <Agreement onAgree={() => setAgreed(!agreed)} agreed={agreed} />
        </CTAButtonContainer>
      </Background>
    </AbsoluteView>
  );
};

export default WelcomeScreen;
