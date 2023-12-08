import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const SadEmotion = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={47} height={47} viewBox="0 0 47 47" fill="none" {...props}>
    <Rect width={47} height={47} fill="#FEAA5B" rx={23.5} />
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
      d="M18 29c.033-.34.787-.66 1.177-.836.612-.276 1.24-.504 1.938-.69 1.351-.363 2.742-.59 4.224-.412 1.135.136 2.091.602 3.066.967.36.134.746.261 1.046.445.125.077.26.205.356.297.043.04.284.154.156.114"
    />
  </Svg>
);

export default SadEmotion;
