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
import { withTheme } from 'styled-components';
import Bottom from './Bottom';

const ResultAddicted = ({ setView, theme, onActionButtonPress }) => (
  <ScreenBgStyled>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled type="title">Vous pourriez présenter des risques d'addiction à l'alcool !</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled type="basicText">Nous vous recommandons de discuter</TextStyled>
        <TextStyled type="title"> gratuitement </TextStyled>
        <TextStyled type="basicText">avec l'un de nos psychologues</TextStyled>
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

export default withTheme(ResultAddicted);
