import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10 18.333a8.333 8.333 0 110-16.666 8.333 8.333 0 110 16.666zm0-1.666a6.667 6.667 0 100-13.334 6.667 6.667 0 000 13.334zM9.166 5.833h1.667V7.5H9.166V5.833zm0 3.334h1.667v5H9.166v-5z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
