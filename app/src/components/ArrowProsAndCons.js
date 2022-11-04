import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg width={'100%'} height={'100%'} viewBox="0 0 383 45" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_3397_42077)">
        <Path
          d="M379 18.322c-2.507 2.294-4.836 4.432-7.177 6.571-3.933 3.577-7.83 7.189-11.811 10.706-.653.582-1.687 1.046-2.531 1.046-54.907.047-109.826.047-164.733.047H191.5V0h1.877c54.611 0 109.209 0 163.819.048.975 0 2.151.463 2.876 1.116C366.357 6.773 372.56 12.476 379 18.346v-.024z"
          fill="#C0184A"
        />
      </G>
      <G filter="url(#filter1_d_3397_42077)">
        <Path
          d="M4 18.37c2.507-2.294 4.836-4.433 7.177-6.572 3.933-3.576 7.83-7.188 11.81-10.705C23.642.51 24.676.047 25.52.047c54.907-.048 109.826-.048 164.733-.048h1.248v36.692h-1.877c-54.611 0-109.209 0-163.82-.047-.974 0-2.15-.463-2.875-1.117C16.643 29.919 10.44 24.215 4 18.345v.024z"
          fill="#28A745"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
