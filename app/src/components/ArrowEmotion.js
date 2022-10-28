import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={50} viewBox="0 0 24 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M10.94 49.06a1.5 1.5 0 002.12 0l9.547-9.545a1.5 1.5 0 10-2.122-2.122L12 45.88l-8.485-8.486a1.5 1.5 0 10-2.122 2.122l9.546 9.546zM10.5 0v48h3V0h-3z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
