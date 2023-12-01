import React from 'react';
import Svg, { Rect,  Path } from 'react-native-svg';

const EcstaticEmotion = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={47}
    height={47}
    viewBox='0 0 47 47'
    fill="none"
    {...props}
  >
    <Rect width={47} height={47} fill="#34D39A" rx={23.5} />
    <Path
      fill="#272727"
      stroke="#272727"
      d="M33.479 27.126c-2.521 1.626-15.521 2.126-19 0-3.479-2.125-2.479 3.375-1 5 1.479 1.626 12.364 7.134 20 0 1.521-1.625 2.521-6.626 0-5Z"
    />
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeWidth={4}
      d="M17 19c.008.06.082.123.116.174M31 19c.008.06.082.123.116.174"
    />
  </Svg>
)
export default EcstaticEmotion;