import React from 'react';
import { withTheme } from 'styled-components';
import Swiper from 'react-native-swiper';
import HeaderBackground from '../components/HeaderBackground';
import ArrowRight from '../components/ArrowRight';
import ArrowLeft from '../components/ArrowLeft';
import Dot from '../components/SwiperDot';
import Background from '../components/Background';
import ButtonPrimary from '../components/ButtonPrimary';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import { CTAButtonContainer } from './styles';
import CONSTANTS from '../reference/constants';
import matomo from '../matomo';

const WelcomeScreen = ({ theme, setView }) => {
  const onStartPress = async () => {
    setView(CONSTANTS.VIEW_QUIZZ);
    matomo.logQuizzOpen(CONSTANTS.FROM_WELCOME);
  };

  return (
    <Background color="headerBackground" withSwiperContainer neverBottom>
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
          bottom: theme.dimensions.screen.height * 0.1,
        }}>
        <Screen1 />
        <Screen2 />
        <Screen3 />
      </Swiper>
      <CTAButtonContainer>
        <ButtonPrimary content="Commencez" onPress={onStartPress} />
      </CTAButtonContainer>
    </Background>
  );
};

export default withTheme(WelcomeScreen);
