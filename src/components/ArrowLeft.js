import React from 'react';
import styled from 'styled-components';
import Svg, { Path } from 'react-native-svg';

const StyledSvg = styled(Svg)`
  margin-top: 50px;
`;

const ArrowLeft = ({ size }) => (
  <StyledSvg height={size} width={size} viewBox="0 0 47 80">
    <Path
      d="M11.1269469,2 C8.7797638,-0.312083484 5.00731862,-0.298985751 2.67624681,2.02934039 C0.345175001,4.35766653 0.327631262,8.13009366 2.63694687,10.48 L32.1469469,40 L2.63694687,69.51 C1.12035436,71.0265924 0.52805754,73.2370741 1.08316889,75.3087779 C1.63828023,77.3804817 3.25646513,78.9986666 5.32816896,79.553778 C7.39987279,80.1088893 9.61035445,79.5165925 11.1269469,78 L44.8769469,44.24 C46.0036091,43.1145905 46.6366668,41.5874555 46.6366668,39.995 C46.6366668,38.4025445 46.0036091,36.8754095 44.8769469,35.75 L11.1269469,2 Z"
      id="ArrowLeft"
      fill="#39cec0"
      fillRule="nonzero"
      transform="translate(23.757570, 40.016477) scale(-1, 1) translate(-23.757570, -40.016477) "
    />
  </StyledSvg>
);

export default ArrowLeft;
