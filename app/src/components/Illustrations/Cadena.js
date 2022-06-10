import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Cadena = ({ color = '#000', size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 14 16" {...props}>
    <Path
      d="M4.87 4c0-1.14.927-2.067 2.067-2.067 1.14 0 2.066.927 2.066 2.067v1.333H5.897L7.23 6.667h3.707v3.706l1.333 1.334v-5.04c0-.734-.6-1.334-1.333-1.334h-.667V4A3.335 3.335 0 0 0 6.937.667 3.325 3.325 0 0 0 3.723 3.16L4.87 4.307V4Zm-2.993-.793-.94.94 1.36 1.36c-.414.226-.694.66-.694 1.16v6.666c0 .734.6 1.334 1.334 1.334h8.52l.666.666.94-.94L1.877 3.207Zm1.06 10.126V6.667h.52l6.666 6.666H2.937Z"
      fill={color}
    />
  </StyledSvg>
);

export default Cadena;
