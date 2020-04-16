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
  BottomContainer,
  BottomSubContainer,
  BottomTitle,
  BottomSubTitle,
  ResultsIllustrationStyled,
  UnderlinedButtonStyled,
} from './styles';
import { withTheme } from 'styled-components';

const ResultRisk = ({ theme, onActionButtonPress }) => (
  <ScreenBgStyled>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled type="title">Votre consommation d'alcool actuelle est a risque.</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled type="basicText">Nous vous conseillons de vous informer ou d’échanger</TextStyled>
        <TextStyled type="title"> gratuitement </TextStyled>
        <TextStyled type="basicText">avec l'un de nos professionnels</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Suivre ma consommation"
          onPress={() => onActionButtonPress(CONSTANTS.ACTION_CONSOMMATION)}
        />
      </TopButtonContainer>
      <UnderlinedButtonStyled
        withoutPadding
        content="Retour au questionnaire"
        onPress={() => onActionButtonPress(CONSTANTS.ACTION_QUESTIONS)}
        bold
      />
    </TopContainer>
    <BottomContainer longPaddingBottom>
      <BottomSubContainer>
        <ResultsIllustrationStyled />
      </BottomSubContainer>
      <BottomSubContainer shrink>
        <BottomTitle>
          <TextStyled type="title">Échangez avec un professionnel</TextStyled>
        </BottomTitle>
        <BottomSubTitle>
          <TextStyled type="basicText">Si vous le souhaitez vous avez la possibilité de discuter</TextStyled>
          <TextStyled type="title"> gratuitement </TextStyled>
          <TextStyled type="basicText">avec l'un de nos psychologues</TextStyled>
        </BottomSubTitle>
        <UnderlinedButtonStyled
          withoutPadding
          color={theme.colors.buttonPrimary}
          bold
          content="Échanger avec un conseiller"
          onPress={() => onActionButtonPress(CONSTANTS.ACTION_CONSEILLER)}
        />
      </BottomSubContainer>
    </BottomContainer>
  </ScreenBgStyled>
);

export default withTheme(ResultRisk);
