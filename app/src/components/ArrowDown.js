import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import styled from 'styled-components';

const ArrowDown = ({ color = '#39cec0', size, ...style }) => (
  <StyledSvg height={size} width={size} viewBox="0 0 270 185" {...style}>
    <Polygon
      id="ArrowDown"
      fill={color}
      transform="translate(135.143315, 134.812629) rotate(135.000000) translate(-135.143315, -134.812629) "
      points="110 40 110 160 230.28663 160 230.28663 229.625259 40 229.625259 40 40"
    />
  </StyledSvg>
);

const StyledSvg = styled(Svg)``;

export default ArrowDown;
