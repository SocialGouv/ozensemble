import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.5 11C.5 5.201 5.201.5 11 .5S21.5 5.201 21.5 11 16.799 21.5 11 21.5.5 16.799.5 11zm6.75-.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z"
        fill="#EE5478"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.5 11C.5 5.201 5.201.5 11 .5S21.5 5.201 21.5 11 16.799 21.5 11 21.5.5 16.799.5 11zm6.75-.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z"
        fill="#DE285E"
      />
    </Svg>
  );
}

export default SvgComponent;
