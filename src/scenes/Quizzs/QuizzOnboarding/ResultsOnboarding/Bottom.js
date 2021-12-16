import React from 'react';
import TextStyled from '../../../../components/TextStyled';
import {
  BottomContainer,
  BottomSubContainer,
  BottomTitle,
  BottomSubTitle,
  ResultsIllustrationStyled,
  UnderlinedButtonStyled,
} from './styles';

const Bottom = ({
  onActionButtonPress,
  title = 'Suivez votre consommation',
  subTitle = 'Commencez dès maintenant à suivre votre consommation au quotidien',
  buttonTitle = 'Suivre ma consommation',
}) => (
  <BottomContainer>
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
      <UnderlinedButtonStyled withoutPadding color="#de285e" bold content={buttonTitle} onPress={onActionButtonPress} />
    </BottomSubContainer>
  </BottomContainer>
);

export default Bottom;
