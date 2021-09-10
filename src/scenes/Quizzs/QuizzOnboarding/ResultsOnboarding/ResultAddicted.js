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

const ResultAddicted = ({ navigation }) => (
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
    </TopContainer>
    <Bottom
      onActionButtonPress={() => navigation.navigate('TABS', { screen: 'CONSO_FOLLOW_UP' })}
      subTitle="Pour préparer au mieux votre échange, suivez votre consommation"
    />
  </FullScreenBackground>
);

export default ResultAddicted;
