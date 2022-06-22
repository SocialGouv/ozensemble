import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Clock = ({ size, color = '#000', ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 16 15" {...props}>
    <Path
      d="M7.99301 1.18506C4.31301 1.18506 1.33301 3.83987 1.33301 7.11098C1.33301 10.3821 4.31301 13.0369 7.99301 13.0369C11.6797 13.0369 14.6663 10.3821 14.6663 7.11098C14.6663 3.83987 11.6797 1.18506 7.99301 1.18506ZM7.99967 11.8517C5.05301 11.8517 2.66634 9.73024 2.66634 7.11098C2.66634 4.49173 5.05301 2.37024 7.99967 2.37024C10.9463 2.37024 13.333 4.49173 13.333 7.11098C13.333 9.73024 10.9463 11.8517 7.99967 11.8517ZM8.33301 4.14802H7.33301V7.70358L10.833 9.57024L11.333 8.84135L8.33301 7.25913V4.14802Z"
      fill={color}
    />
  </StyledSvg>
);

export default Clock;
