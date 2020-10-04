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

const ResultGood = ({ onActionButtonPress }) => (
  <ScreenBgStyled>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">
          Vous ne présentez pas de risque particulier actuellement, bravo !
        </TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">
          Vous pouvez toutefois obtenir une évaluation plus fine en utilisant
        </TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">notre outil de agenda de consommation.</TextStyled>
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
  </ScreenBgStyled>
);

export default ResultGood;
