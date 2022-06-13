/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components';
import Background from '../../../components/Background';
import ButtonPrimary from '../../../components/ButtonPrimary';
import GoBackButton from '../../../components/GoBackButton';
import H1 from '../../../components/H1';
import Stars from '../../../components/illustrations/Stars';
import OneDoseAlcoolExplanation from '../../../components/OneDoseAlcoolExplanation';
import TextStyled from '../../../components/TextStyled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import Diagram from '../../ConsoFollowUp/Diagram';
import { setValidatedDays } from '../utils';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';

const Defi2_Day1 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused]);

  return (
    <Background color="#39cec0" withSwiperContainer>
      {/* <HeaderBackground /> */}
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <GoBackButton onPress={navigation.goBack} />
            <Spacer />
            <H1 color="#4030a5">
              Defi 2 {'\n'}Jour - {route?.params?.day}
            </H1>
          </TopTitle>
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const TopContainer = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 0px;
`;

const Spacer = styled.View`
  width: 5%;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default Defi2_Day1;
