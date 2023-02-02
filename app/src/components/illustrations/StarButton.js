import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const StarButton = ({ color, size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 378.05 378.05" {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="M189.027,0C84.796,0,0.003,84.8,0.003,189.028c0,104.234,84.793,189.021,189.024,189.021
		c104.231,0,189.02-84.787,189.02-189.021C378.047,84.8,293.265,0,189.027,0z M130.649,227.336c3.092-9.494-0.27-19.834-8.35-25.713
		l-72.574-52.722h89.693c10.01,0,18.795-6.39,21.891-15.895l27.724-85.322l27.706,85.328c3.111,9.499,11.902,15.889,21.882,15.889
		h89.7l-72.574,52.722c-8.07,5.879-11.428,16.213-8.353,25.713l27.724,85.328l-72.574-52.729c-3.951-2.876-8.622-4.396-13.51-4.396
		s-9.581,1.52-13.529,4.396l-72.574,52.729L130.649,227.336z"
    />
  </StyledSvg>
);

export default StarButton;
