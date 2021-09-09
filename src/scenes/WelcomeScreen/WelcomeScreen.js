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

  const onStartPress = async () => {
    AsyncStorage.setItem(CONSTANTS.STORE_KEY_ONBOARDING_DONE, 'true');
    RNBootSplash.show({ duration: 250 });
    await new Promise((res) => setTimeout(res, 250));
    navigation.navigate('TABS');
    await new Promise((res) => setTimeout(res, 750));
    RNBootSplash.hide({ duration: 250 });
    matomo.logQuizzOpen(CONSTANTS.FROM_WELCOME);
  };

  return (
    <Background color="#39cec0" withSwiperContainer neverBottom>
      <HeaderBackground />
      <Swiper
        loop={false}
        showsButtons
        dot={<Dot />}
        activeDot={<Dot active />}
        nextButton={<ArrowRight size={15} style={{ marginTop: 50 }} />}
        prevButton={<ArrowLeft size={15} style={{ marginTop: 50 }} />}
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
  );
};

export default WelcomeScreen;

const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
`;
