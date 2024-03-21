import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfilIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" {...props}>
    <Path
      fill="#4030A5"
      fillRule="evenodd"
      d="M14.507 24h10.88c3.306 0 6.186 2.347 6.826 5.44-2.88 3.627-7.253 5.973-12.266 5.973-4.907 0-9.387-2.346-12.16-5.973.64-3.093 3.413-5.44 6.72-5.44Z"
      clipRule="evenodd"
    />
    <Path fill="#4030A5" d="M19.947 22.187a6.72 6.72 0 1 0 0-13.44 6.72 6.72 0 0 0 0 13.44Z" />
    <Path
      fill="#4030A5"
      d="M19.947 0C31.04 0 40 8.96 40 19.947 40 31.04 31.04 40 19.947 40 8.96 40 0 31.04 0 19.947 0 8.96 8.96 0 19.947 0Zm0 2.667c-9.494 0-17.28 7.786-17.28 17.28 0 9.6 7.786 17.28 17.28 17.28 9.6 0 17.28-7.68 17.28-17.28 0-9.494-7.68-17.28-17.28-17.28Z"
    />
  </Svg>
);

export default ProfilIcon;
