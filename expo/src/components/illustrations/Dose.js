import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Dose = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 100 100" {...props}>
    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <Path
        d="M0,0 L15,100 L85,100 L100,0 L0,0 Z M9.14,27.228 L5.805,5 L12.347,5 L14.596,24.968 C12.531,25.681 10.695,26.471 9.14,27.228 Z M51.499,30.5 C40.022,21.893 28.473,21.572 19.579,23.554 L17.516,5 L94.194,5 L90.053,32.603 C83.23,36.259 67.286,42.334 51.499,30.5 Z"
        id="Dose"
        fill="#de285e"
        fillRule="nonzero"
      />
    </G>
  </StyledSvg>
);

export default Dose;
