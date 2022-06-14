import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const PleasureSmiley = ({ color, size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 52 52" {...props}>
    <Path
      d="M26 0a26 26 0 1 0 26 26A26.03 26.03 0 0 0 26 0Zm0 48.75a22.75 22.75 0 1 1 0-45.501 22.75 22.75 0 0 1 0 45.5ZM39.205 30.95A1.625 1.625 0 0 1 39 33.242a19.976 19.976 0 0 1-13 4.675 19.977 19.977 0 0 1-13-4.675 1.626 1.626 0 0 1 2.113-2.47A16.725 16.725 0 0 0 26 34.667a16.725 16.725 0 0 0 10.914-3.895 1.625 1.625 0 0 1 2.29.179h.001Zm-8.179-8.829a.813.813 0 1 1 1.132-1.165 3.495 3.495 0 0 0 4.875 0 .813.813 0 0 1 1.132 1.165 5.119 5.119 0 0 1-7.128 0h-.01Zm-17.17 0a.814.814 0 0 1 .548-1.413c.22 0 .43.09.584.248a3.494 3.494 0 0 0 4.875 0 .811.811 0 1 1 1.131 1.165 5.12 5.12 0 0 1-7.128 0h-.01Z"
      fill={color}
    />
  </StyledSvg>
);

export default PleasureSmiley;
