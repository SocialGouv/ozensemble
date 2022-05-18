import React from 'react';
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
        <GoBackButtonText content="Retour" bold onPress={() => navigation.goBack()} />
        <TopContainer>
          <TopTitle>
            <TextStyled color="#4030a5">Pour dire Non</TextStyled>
          </TopTitle>
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

export default ToSayNo;
