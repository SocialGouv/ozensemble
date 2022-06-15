import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const AngrySmiley = ({ color, size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 52 52" {...props}>
    <Path
      d="M26 0a26 26 0 1 0 26 26A26.03 26.03 0 0 0 26 0Zm0 48.75a22.75 22.75 0 1 1 0-45.501 22.75 22.75 0 0 1 0 45.5Zm3.564-12.702a.813.813 0 0 1-1.132 1.165 3.494 3.494 0 0 0-4.875 0 .813.813 0 0 1-1.132-1.165 5.12 5.12 0 0 1 7.128 0h.011Zm6.262-14.382a.812.812 0 0 1 0 1.149l-1.468 1.468a2.443 2.443 0 1 1-2.941.633.804.804 0 0 1 .065-.102l.092-.093 3.092-3.055a.814.814 0 0 1 1.16 0ZM20.66 25.057a2.438 2.438 0 1 1-3.018-.78l-1.446-1.479a.812.812 0 1 1 1.138-1.132l3.19 3.19a.783.783 0 0 1 .141.18l-.005.021Z"
      fill={color}
    />
  </StyledSvg>
);

export default AngrySmiley;
