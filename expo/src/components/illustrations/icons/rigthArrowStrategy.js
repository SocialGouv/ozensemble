import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function rigthArrowStrategy() {
  return (
    <Svg width="20" height="36" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M1.25 16.5L8.75 9L1.25 1.5"
        stroke="#4030A5"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default rigthArrowStrategy;
