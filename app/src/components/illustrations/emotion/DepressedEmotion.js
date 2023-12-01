import React from 'react';
import Svg, { Rect,  Path } from 'react-native-svg';


 const DepressedEmotion = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={47}
    height={47}
    fill="none"
    {...props}
  >
    <Rect width={47} height={47} fill="#FC8383" rx={23.5} />
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeWidth={4}
      d="M17.17 19.032c-.013.06-.356.88-.342.94M30.829 19.027c.028.054.292.903.342.94"
    />
    <Path
      fill="#272727"
      stroke="#272727"
      d="M34.175 29c-8.008-6.934-20.55-2.913-21 0-.45 2.911 0 4 1 4s19.204.29 20 0c.795-.292.843-2.434 0-4Z"
    />
  </Svg>
)

export default DepressedEmotion;
