import React from 'react';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import Sources from '../../Sources';
import Bottom from './Bottom';
import {
  FullScreenBackground,
  ResultTitle,
  TopButtonContainer,
  TopContainer,
  TopSubTitle,
  TopTitle,
  UnderlinedButtonStyled,
} from './styles';

const ResultAddicted = ({ navigation, isInOnboarding, route }) => (
  <FullScreenBackground>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">Vous pourriez présenter des risques de dépendance à l'alcool !</TextStyled>
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
      <TopTitle>
        <TextStyled color="#4030a5">
          Vous souhaitez d'abord essayer de réduire votre consommation d’alcool par vous-même ?
        </TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous vous proposons un défi sur 7 jours</TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">pour faire le point plus finement</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Faire le défi 7 jours"
          onPress={() => navigation.navigate('TABS', { screen: 'DEFI' })}
        />
      </TopButtonContainer>
    </TopContainer>
    <Bottom
      onActionButtonPress={() => navigation.navigate('TABS', { screen: 'CONSO_FOLLOW_UP' })}
      title="Suivez votre consommation pendant 15 jours"
      subTitle="Pour préparer au mieux votre échange, suivez votre consommation"
    />
    <TopContainer>
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
      <Sources
        content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
        Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
        Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
      />
    </TopContainer>
  </FullScreenBackground>
);

export default ResultAddicted;
