import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Equality = ({ size, color = '#000', ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <Path
      d="M.5 1.6C.5.942.97.5 1.44.5h21.12c.47 0 .94.442.94 1.1 0 .658-.47 1.1-.94 1.1H1.44C.97 2.7.5 2.258.5 1.6Zm0 12.8c0-.659.47-1.1.94-1.1h21.12c.47 0 .94.442.94 1.1 0 .658-.47 1.1-.94 1.1H1.44c-.47 0-.94-.442-.94-1.1Z"
      fill="#000"
      stroke={color}
    />
  </StyledSvg>
);

export default Equality;
