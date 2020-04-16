import React from 'react';
import styled, { css } from 'styled-components';

const SwiperDot = ({ active }) => (
  <DotContainer active={active}>
    <Dot active={active} />
  </DotContainer>
);

const dotSize = 12;

const dotCss = css`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: ${dotSize}px;
  margin: 3px;
  overflow: hidden;
`;

const DotContainer = styled.View`
  ${dotCss}
  background-color: ${({active, theme: {colors}}) =>
    !active
      ? colors.swiperButtonDisabledShadow
      : colors.buttonPrimaryShadow};
`;

const Dot = styled.View`
  ${dotCss}
  margin-top: ${dotSize * 0.12}px;
  margin-left: 0;
  background-color: ${({active, theme: {colors}}) =>
    !active
      ? colors.swiperButtonDisabled
      : colors.buttonPrimary};

`;

export default SwiperDot;
