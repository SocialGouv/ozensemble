import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Esquimau = ({ size, color = '#DE285E', ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 16 48" {...props}>
    <Path
      d="M8 47.5c-.52 0-1.026-.276-1.42-.794-.393-.518-.65-1.256-.65-2.091v-9.858h4.14v9.858c0 .835-.257 1.573-.65 2.091-.394.518-.9.794-1.42.794ZM6.81 8.427l-.805 10a1.906 1.906 0 0 1-.44 1.116c-.244.287-.603.51-1.018.51H4.41l-.023-.002c-.471-.044-.824-.349-1.037-.698a2.178 2.178 0 0 1-.298-1.242v-.013l.806-10.002v-.001C4.06 5.48 5.753 3.289 8 3.289c.466 0 .85.262 1.099.59.25.33.399.766.399 1.224 0 .875-.587 1.763-1.498 1.763L6.81 8.427Zm0 0 .001-.007m0 .007V8.42m0 0c.067-1.015.673-1.554 1.19-1.554L6.81 8.42ZM8.001.5c2.97 0 5.65 3.012 6.023 7.272v.002l1.457 18.488c.107 1.358-.25 2.62-.873 3.532-.624.912-1.482 1.436-2.388 1.436H3.78c-.926 0-1.784-.525-2.4-1.435-.618-.91-.968-2.172-.86-3.533L1.976 7.774v-.002C2.349 3.512 5.03.5 8 .5Z"
      fill="#fff"
      stroke="#DE285E"
    />
  </StyledSvg>
);

export default Esquimau;
