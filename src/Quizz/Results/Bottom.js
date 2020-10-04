import React from 'react';
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
import matomo from '../../services/matomo';

const Bottom = ({
  setView,
  title = 'Suivez votre consommation',
  subTitle = 'Commencez dès maintenant à suivre votre consommation au quotidien',
  buttonTitle = 'Suivre ma consommation',
}) => (
  <BottomContainer longPaddingBottom>
    <BottomSubContainer>
      <ResultsIllustrationStyled />
    </BottomSubContainer>
    <BottomSubContainer shrink>
      <BottomTitle>
        <TextStyled color="#4030a5">{title}</TextStyled>
      </BottomTitle>
      <BottomSubTitle>
        <TextStyled color="#191919">{subTitle}</TextStyled>
      </BottomSubTitle>
      <UnderlinedButtonStyled
        withoutPadding
        color="#de285e"
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

export default Bottom;
