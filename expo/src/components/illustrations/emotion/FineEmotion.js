import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const PleasureSmiley = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 47" fill="none" {...props}>
    <Rect width={47} height={47} fill="#39CEC1" rx={23.5} />
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeWidth={4}
      d="M17 20c.008.06.082.123.116.174M31 20c.008.06.082.123.116.174"
    />
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeWidth={3}
      d="M18.292 29c.031.527.747 1.022 1.117 1.295.581.428 1.177.78 1.84 1.07 1.283.562 2.603.914 4.01.638 1.077-.21 1.985-.933 2.91-1.498.341-.208.708-.405.993-.69.118-.119.247-.318.338-.46.04-.063.27-.238.148-.178"
    />
  </Svg>
);

export default PleasureSmiley;
