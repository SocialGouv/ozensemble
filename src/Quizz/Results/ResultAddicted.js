import React from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import CONSTANTS from '../../reference/constants';
import {
  ScreenBgStyled,
  TopContainer,
  ResultTitle,
  TopTitle,
  TopSubTitle,
  TopButtonContainer,
  UnderlinedButtonStyled,
} from './styles';
import Bottom from './Bottom';

const ResultAddicted = ({ setView, onActionButtonPress }) => (
  <ScreenBgStyled>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">
          Vous pourriez présenter des risques d'addiction à l'alcool !
        </TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous vous recommandons de discuter</TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">avec l'un de nos psychologues</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Échanger avec un conseiller"
          onPress={() => onActionButtonPress(CONSTANTS.ACTION_CONSEILLER)}
        />
      </TopButtonContainer>
      <UnderlinedButtonStyled
        withoutPadding
        content="Retour au questionnaire"
        onPress={() => onActionButtonPress(CONSTANTS.ACTION_QUESTIONS)}
        bold
      />
    </TopContainer>
    <Bottom
      setView={setView}
      onActionButtonPress={onActionButtonPress}
      subTitle="Pour préparer au mieux votre échange, suivez votre consommation"
    />
  </ScreenBgStyled>
);

export default ResultAddicted;
