import React, { useState } from 'react';
import styled from 'styled-components';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import TextStyled from '../../components/TextStyled';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';

const DefisMenu = () => {
  const navigation = useNavigation();

  return (
    <ScreenBgStyled>
      <Container>
        <TextStyled>
          J'évalue ma situation, motivations et risques liés à ma consommation grâce aux tests et bilans.
        </TextStyled>
        <CategorieMenu
          title={'Évaluer ma consommation'}
          description={'Pour détecter des comportements à risque'}
          buttonTitle={'Je consulte'}
          onPress={() => navigation.navigate('ONBOARDING_QUIZZ')}
          image={require('../../assets/images/QuizzEvaluerMaConsommation.png')}
        />
        <TextStyled color="#4030A5">Pourquoi faire cette auto-évaluation ? </TextStyled>
        <CategorieMenu
          title={'Premier challenge'}
          description={'Faire le point en 7 jours '}
          buttonTitle={'Je consulte'}
          link="DEFI1"
          image={require('../../assets/images/Defi1.png')}
        />
        <CategorieMenu
          title={'Deuxième challenge'}
          description={'Aller plus loin ...'}
          buttonTitle={'Je commence'}
          onPress="DEFI2"
          image={require('../../assets/images/Defi2.png')}
        />
        <CategorieMenu
          title={'Tests des défis'}
          description={'Retrouver mes résultats'}
          buttonTitle={'Je consulte'}
          onPress="TESTS_DEFIS"
          image={require('../../assets/images/TestsDesDefis.png')}
        />
      </Container>
    </ScreenBgStyled>
  );
};

const CategorieMenu = ({ title, description, buttonTitle, onPress, image }) => (
  <CategorieContainer>
    <ImageStyled source={image} />
    <TextContainer>
      <TextStyled bold>{title}</TextStyled>
      <TextStyled>{description}</TextStyled>
      <ButtonContainer>
        <ButtonPrimary content={buttonTitle} onPress={onPress} />
      </ButtonContainer>
    </TextContainer>
  </CategorieContainer>
);

const Container = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 0px;
`;

const CategorieContainer = styled.View`
  border: 1px solid #79747e;
  border-radius: 12px;
  flex-direction: row;
  margin-vertical: 30px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: space-around;
  padding: 5px
  width: ${screenWidth * 0.7 - defaultPaddingFontScale()}px;
`;

const ButtonContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  margin-right: 5px;
`;

const ImageStyled = styled.Image`
  border-bottom-left-radius: 11px;
  border-top-left-radius: 11px;
  width: ${screenWidth * 0.3 - defaultPaddingFontScale()}px;
  height: ${screenWidth * 0.4}px;
`;

export default DefisMenu;
