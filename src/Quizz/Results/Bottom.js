import React from 'react';
import { withTheme } from 'styled-components';
import TextStyled from '../../components/TextStyled';
import CONSTANTS from '../../reference/constants';
import {
  BottomContainer,
  BottomSubContainer,
  BottomTitle,
  BottomSubTitle,
  ResultsIllustrationStyled,
  UnderlinedButtonStyled,
} from './styles';
import matomo from '../../matomo/index';

const Bottom = ({
  setView,
  theme,
  title = 'Suivez votre consommation pendant 15 jours',
  subTitle = 'Commencez dès maintenant à suivre votre consommation au quotidien',
  buttonTitle = 'Suivre ma consommation',
}) => (
  <BottomContainer longPaddingBottom>
    <BottomSubContainer>
      <ResultsIllustrationStyled />
    </BottomSubContainer>
    <BottomSubContainer shrink>
      <BottomTitle>
        <TextStyled type="title">{title}</TextStyled>
      </BottomTitle>
      <BottomSubTitle>
        <TextStyled type="basicText">{subTitle}</TextStyled>
      </BottomSubTitle>
      <UnderlinedButtonStyled
        withoutPadding
        color={theme.colors.buttonPrimary}
        bold
        content={buttonTitle}
        onPress={() => {
          setView(CONSTANTS.VIEW_CONSO);
          matomo.logConsoOpen(CONSTANTS.FROM_CONTACT);
        }}
      />
    </BottomSubContainer>
  </BottomContainer>
);

export default withTheme(Bottom);
