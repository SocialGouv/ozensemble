import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const ArrowDown = ({ color = '#39cec0', size, ...style }) => (
  <StyledSvg height={size} width={size} viewBox="0 0 24 24" {...style} fill="none">
    <Path d="M6 9L12 15L18 9" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
  </StyledSvg>
);

const StyledSvg = styled(Svg)``;

export default ArrowDown;
