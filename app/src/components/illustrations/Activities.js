import React from 'react';
import Svg, { G, Rect } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Activities = ({ color, ...props }) => (
  <StyledSvg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G id="Infos" stroke={color} strokeWidth={1.5}>
      <Rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1.25" />
      <Rect x="11.75" y="0.75" width="8.5" height="8.5" rx="1.25" />
      <Rect x="11.75" y="0.75" width="8.5" height="8.5" rx="1.25" />
      <Rect x="11.75" y="11.75" width="8.5" height="8.5" rx="1.25" />
      <Rect x="0.75" y="11.75" width="8.5" height="8.5" rx="1.25" />
    </G>
  </StyledSvg>
);

export default Activities;
