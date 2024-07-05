import React from 'react';
import Svg, { G, Rect } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const FollowUpIcon = ({ color, size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 23 21" {...props}>
    <G id="Infos" stroke={color} strokeWidth={1.5}>
      <Rect x="0.75" y="0.75" width="5.5" height="19.5" rx="2.25" fill={'#fff'} />
      <Rect x="8.75" y="7.75" width="5.5" height="12.5" rx="2.25" fill={'#fff'} />
      <Rect x="16.75" y="13.75" width="5.5" height="6.5" rx="2.25" fill={'#fff'} />
    </G>
  </StyledSvg>
);

export default FollowUpIcon;
