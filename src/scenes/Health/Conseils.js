import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import TextStyled from '../../components/TextStyled';
import { ScreenBgStyled, TopContainer, TopSubTitle, TopTitle } from './styles';
import { listConseils } from './ListConseil';
import { screenHeight, screenWidth } from '../../styles/theme';
import AppointmentHeart from '../../components/Illustrations/AppointmentHeart';
import QuizzElement from '../Quizzs/QuizzElement';

const Conseils = ({ navigation }) => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <TextStyled color="#4030a5">Évaluer ma consommation</TextStyled>
          </TopTitle>
          <TopSubTitle>
            <TextStyled color="#000000">Pour détecter des comportements à risque</TextStyled>
          </TopSubTitle>
          <QuizzElement
            topTitle="Questionnaire d’auto-évaluation"
            title="Ma consommation d'alcool"
            quizzRoute="ONBOARDING_QUIZZ"
            memoryKeyResult={'@Quizz_result'}
            memoryKeyAnswers={'@Quizz_answers'}
            showEvenNotDone
            fromHealth
          />
          <TopTitle>
            <TextStyled color="#4030a5">Mes conseils</TextStyled>
          </TopTitle>
          <ViewConseilsContainer horizontal={true}>
            {listConseils.map((conseil, index) => (
              <ConseilContainer onPress={() => navigation.navigate(conseil.link)} key={index}>
                <ImageStyled source={conseil.img} />
                <TitleConseilContainer>
                  <TextStyled> {conseil.title}</TextStyled>
                </TitleConseilContainer>
              </ConseilContainer>
            ))}
          </ViewConseilsContainer>
          <TopTitle>
            <TextStyled color="#4030a5">Parler avec un professionnel</TextStyled>
          </TopTitle>
          <TopSubTitle>
            <TextStyled color="#000000">Gratuitement et anonymement</TextStyled>
          </TopSubTitle>
          <CategorieContainer onPress={() => navigation.navigate('CONTACT_TAB')}>
            <IconContainer>
              <AppointmentHeart size={40} />
            </IconContainer>
            <TextContainer>
              <TextStyled> Prendre un RDV</TextStyled>
              <TextStyled> avec DoctoLib</TextStyled>
            </TextContainer>
          </CategorieContainer>
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const ViewConseilsContainer = styled.ScrollView`
  margin-bottom: ${screenHeight * 0.05}px;
  margin-left: -30px;
  margin-right: -30px;
  margin-top: 20px;
  padding-left: 30px;
`;

const ConseilContainer = styled.TouchableOpacity`
  shadow-color: #000000cc;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.34;
  shadow-radius: 6.27px;
  elevation: 10;
  width: ${screenWidth * 0.4}px;
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TitleConseilContainer = styled.Text`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CategorieContainer = styled.TouchableOpacity`
  margin-top: 10px;
  border: 1px solid #4030a5;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  background-color: #f9f9f9;
  shadow-color: #4030a5;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.09;
  shadow-radius: 2px;
`;

const IconContainer = styled.View`
  width: 30%;
  align-items: center;
`;

const TextContainer = styled.View`
  margin: 20px 0px 20px;
`;

const ImageStyled = styled.Image`
  width: ${screenWidth * 0.4}px;
  height: ${screenHeight * 0.15}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export default Conseils;
