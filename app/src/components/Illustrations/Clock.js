import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Clock = ({ size, color = '#000', ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 20 21" {...props}>
    <Path
      d="M6.993.185C3.313.185.333 2.84.333 6.111c0 3.271 2.98 5.926 6.66 5.926 3.687 0 6.673-2.655 6.673-5.926 0-3.271-2.986-5.926-6.673-5.926ZM7 10.852c-2.947 0-5.334-2.122-5.334-4.741 0-2.62 2.387-4.74 5.334-4.74 2.946 0 5.333 2.12 5.333 4.74S9.946 10.851 7 10.851Zm.333-7.704h-1v3.556l3.5 1.866.5-.729-3-1.582V3.148Z"
      fill={color}
    />
  </StyledSvg>
);

export default Clock;
