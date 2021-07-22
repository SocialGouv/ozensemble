import React from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import {
  FullScreenBackground,
  TopContainer,
  ResultTitle,
  TopTitle,
  TopSubTitle,
  TopButtonContainer,
  BottomContainer,
  BottomSubContainer,
  BottomTitle,
  BottomSubTitle,
  ResultsIllustrationStyled,
  UnderlinedButtonStyled,
} from './styles';

const ResultRisk = ({ navigation, backToQuizz }) => (
  <FullScreenBackground>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">Votre consommation d'alcool actuelle est a risque.</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous vous conseillons de vous informer ou d’échanger</TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">avec l'un de nos professionnels</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary content="Suivre ma consommation" onPress={() => navigation.navigate('CONSO_FOLLOW_UP')} />
      </TopButtonContainer>
      <UnderlinedButtonStyled withoutPadding content="Retour au questionnaire" onPress={backToQuizz} bold />
    </TopContainer>
    <BottomContainer longPaddingBottom>
      <BottomSubContainer>
        <ResultsIllustrationStyled />
      </BottomSubContainer>
      <BottomSubContainer shrink>
        <BottomTitle>
          <TextStyled color="#4030a5">Échangez avec un professionnel</TextStyled>
        </BottomTitle>
        <BottomSubTitle>
          <TextStyled color="#191919">Si vous le souhaitez vous avez la possibilité de discuter</TextStyled>
          <TextStyled color="#4030a5"> gratuitement </TextStyled>
          <TextStyled color="#191919">avec l'un de nos psychologues</TextStyled>
        </BottomSubTitle>
        <UnderlinedButtonStyled
          withoutPadding
          color="#de285e"
          bold
          content="Échanger avec un conseiller"
          onPress={() => navigation.navigate('CONTACT')}
        />
      </BottomSubContainer>
    </BottomContainer>
  </FullScreenBackground>
);

export default ResultRisk;
