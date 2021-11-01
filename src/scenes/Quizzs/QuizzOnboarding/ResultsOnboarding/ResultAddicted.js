import React from 'react';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import {
  FullScreenBackground,
  TopContainer,
  ResultTitle,
  TopTitle,
  TopSubTitle,
  TopButtonContainer,
  UnderlinedButtonStyled,
} from './styles';
import Bottom from './Bottom';
import Sources from '../../Sources';

const ResultAddicted = ({ navigation, isInOnboarding }) => (
  <FullScreenBackground>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">Vous pourriez présenter des risques d'addiction à l'alcool !</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous vous recommandons de discuter</TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">avec l'un de nos psychologues</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Échanger avec un conseiller"
          onPress={() => navigation.navigate('TABS', { screen: 'CONTACT' })}
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
            content="Retour aux tests"
            onPress={() => navigation.navigate('QUIZZ_MENU')}
            bold
          />
        </>
      ) : null}
    </TopContainer>
    <Bottom
      onActionButtonPress={() => navigation.navigate('TABS', { screen: 'CONSO_FOLLOW_UP' })}
      subTitle="Pour préparer au mieux votre échange, suivez votre consommation"
    />
    <TopContainer>
      <Sources
        content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
        Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
        Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
      />
    </TopContainer>
  </FullScreenBackground>
);

export default ResultAddicted;
