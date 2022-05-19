import React from 'react';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import Sources from '../../Sources';
import {
  BottomContainer,
  BottomSubContainer,
  BottomSubTitle,
  BottomTitle,
  FullScreenBackground,
  ResultsIllustrationStyled,
  ResultTitle,
  TopButtonContainer,
  TopContainer,
  TopSubTitle,
  TopTitle,
  UnderlinedButtonStyled,
} from './styles';

const ResultRisk = ({ navigation, isInOnboarding, route }) => (
  <FullScreenBackground>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">Votre consommation d'alcool actuelle pourrait être à risque.</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous avons besoin d'en savoir plus pour affiner ce résultat.</TextStyled>
      </TopSubTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous vous conseillons de vous informer, d'échanger</TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">avec l'un de nos professionnels ou de faire le défi 7 jours</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Faire le défi 7 jours"
          onPress={() => navigation.navigate('TABS', { screen: 'DEFI' })}
        />
      </TopButtonContainer>
      {!isInOnboarding ? (
        <>
          <UnderlinedButtonStyled
            withoutPadding
            content="Retour au questionnaire"
            onPress={() => navigation.navigate('QUIZZ_QUESTIONS', { screen: 'QUIZZ_QUESTION_1' })}
            bold
          />
          <UnderlinedButtonStyled
            withoutPadding
            content={route?.params?.backToRoot || 'Retour aux tests'}
            onPress={() => navigation.navigate(route?.params?.root || 'QUIZZ_MENU')}
            bold
          />
        </>
      ) : null}
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
          onPress={() => navigation.navigate('TABS', { screen: 'CONTACT' })}
        />
      </BottomSubContainer>
    </BottomContainer>
    <TopContainer>
      <Sources
        content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
        Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
        Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
      />
    </TopContainer>
  </FullScreenBackground>
);

export default ResultRisk;
