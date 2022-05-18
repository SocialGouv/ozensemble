import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const Celebration = ({ size, ...props }) => (
  <StyledSvg width={size} height={size * 1.5} viewBox="0 0 19 58" {...props}>
    <Path
      d="m1.23 22.27 14-5-9-9-5 14Zm10.35-5.82-7.05 2.52 2.52-7.05 4.53 4.53ZM13.76 12.8l5.59-5.59a1.25 1.25 0 0 1 1.77 0l.59.59 1.06-1.06-.59-.59a2.758 2.758 0 0 0-3.89 0l-5.59 5.59 1.06 1.06ZM9.29 7.15l-.59.59L9.76 8.8l.59-.59a2.758 2.758 0 0 0 0-3.89l-.59-.59L8.7 4.8l.59.59c.48.48.48 1.28 0 1.76ZM16.29 12.15l-1.59 1.59 1.06 1.06 1.59-1.59a1.25 1.25 0 0 1 1.77 0l1.61 1.61 1.06-1.06-1.61-1.61a2.758 2.758 0 0 0-3.89 0ZM14.29 6.15 10.7 9.74l1.06 1.06 3.59-3.59a2.758 2.758 0 0 0 0-3.89l-1.59-1.59-1.06 1.06 1.59 1.59c.48.49.48 1.29 0 1.77Z"
      fill="#000"
    />
  </StyledSvg>
);

export default Celebration;
