import React from 'react';
import styled from 'styled-components';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import TextStyled from '../../components/TextStyled';
import GoBackButtonText from '../../components/GoBackButtonText';
import { ScreenBgStyled, TopContainer, TopTitle } from './styles';

const ToSayNo = ({ navigation }) => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ScreenBgStyled>
        <BackButton content="< Retour" bold onPress={() => navigation.goBack()} />
        <TopContainer>
          <TopTitle>
            <TextStyled color="#4030a5">Pour dire Non</TextStyled>
          </TopTitle>
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
`;

export default ToSayNo;
