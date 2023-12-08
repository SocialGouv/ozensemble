import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CrossOutAddContext = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.813}
      d="M11.578 1.422 1.422 11.578m0-10.156 10.156 10.156"
    />
  </Svg>
);
export default CrossOutAddContext;
