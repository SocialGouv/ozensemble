import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../../../components/TextStyled';
import H2 from '../../../../components/H2';
import UnderlinedButton from '../../../../components/UnderlinedButton';
import ResultsIllustration from '../../../../components/Illustrations/ResultsIllustration';

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

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

const BottomContainer = styled.View`
  padding: 20px;
  ${(props) => props.longPaddingBottom && 'padding-bottom: 100px;'}
  background-color: #efefef;
  flex-direction: row;
  margin-top: auto;
`;

const BottomSubContainer = styled.View`
  padding: ${({ shrink }) => (shrink ? 15 : 0)}px;
  flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
  align-items: flex-start;
`;

const BottomTitle = styled(H2)`
  ${commonCss}
  margin-bottom: 20px;
`;

const BottomSubTitle = styled(H2)`
  ${commonCss}
  font-weight: 500;
  margin-bottom: 20px;
`;

const ResultsIllustrationStyled = styled(ResultsIllustration)`
  height: 40px;
  margin-top: 8px;
`;

const UnderlinedButtonStyled = styled(UnderlinedButton)`
  align-items: flex-start;
`;

export default Bottom;
