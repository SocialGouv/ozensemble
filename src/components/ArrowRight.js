import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const ArrowRight = ({ size = 20, style, color = '#39cec0', ...props }) => (
  <Svg height={size} width={size} viewBox="0 0 47 80" style={style}>
  <Path
    d="M10.37,2 C8.02281693,-0.312083484 4.25037175,-0.298985751 1.91929994,2.02934039 C-0.411771867,4.35766653 -0.429315606,8.13009366 1.88,10.48 L31.39,40 L1.88,69.51 C0.363407496,71.0265924 -0.228889328,73.2370741 0.326222019,75.3087779 C0.881333366,77.3804817 2.49951826,78.9986666 4.57122209,79.553778 C6.64292592,80.1088893 8.85340759,79.5165925 10.37,78 L44.12,44.24 C45.2466623,43.1145905 45.8797199,41.5874555 45.8797199,39.995 C45.8797199,38.4025445 45.2466623,36.8754095 44.12,35.75 L10.37,2 Z" 
    id="ArrowRight"
    fill={color}
    fillRule="nonzero"
  />
</Svg>
);

export default ArrowRight;
