import React from 'react';
import Svg, { Rect,  Path } from 'react-native-svg';

const NeutralEmotion = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={47}
    height={47}
    fill="none"
    {...props}
  >
    <Rect width={47} height={47} fill="#8E9A95" rx={23.5} />
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeWidth={4}
      d="M17 20c.008.06.082.123.116.174M30.116 20c.008.06.082.123.116.174"
    />
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeWidth={3}
      d="M18 29h11"
    />
  </Svg>
)

export default NeutralEmotion;
