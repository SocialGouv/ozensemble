import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Equality = ({ size, color = '#000', ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <Rect x={0.5} y={0.5} width={23} height={2} rx={1} fill="#fff" stroke={color} />
    <Rect x={0.5} y={8.5} width={23} height={2} rx={1} fill="#fff" stroke={color} />
  </StyledSvg>
);

export default Equality;
