import * as React from 'react';
import { G, Svg, Path, Defs, ClipPath } from 'react-native-svg';

const ModifyIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" {...props}>
    <G stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.786} clipPath="url(#a)">
      <Path d="m8.036 9.645-3.215.578.536-3.257 6.14-6.118a1.071 1.071 0 0 1 1.52 0l1.137 1.136a1.072 1.072 0 0 1 0 1.521l-6.118 6.14Z" />
      <Path d="M12.857 10.18v3.215a1.071 1.071 0 0 1-1.071 1.071H1.607a1.071 1.071 0 0 1-1.071-1.071V3.216a1.071 1.071 0 0 1 1.071-1.071h3.214" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h15v15H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ModifyIcon;
