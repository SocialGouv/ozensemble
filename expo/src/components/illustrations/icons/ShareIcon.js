import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M2.16669 6.5V10.8333C2.16669 11.1207 2.28082 11.3962 2.48399 11.5994C2.68715 11.8025 2.9627 11.9167 3.25002 11.9167H9.75002C10.0373 11.9167 10.3129 11.8025 10.5161 11.5994C10.7192 11.3962 10.8334 11.1207 10.8334 10.8333V6.5"
        stroke="#4030A5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.66665 3.25001L6.49998 1.08334L4.33331 3.25001"
        stroke="#4030A5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M6.5 1.08334V8.12501" stroke="#4030A5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

export default SvgComponent;
