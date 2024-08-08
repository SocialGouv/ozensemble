import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowDown = ({ color = "#39cec0", size, ...style }) => (
  <Svg height={size} width={size} color={color} viewBox="0 0 24 24" {...style} fill="none">
    <Path d="M6 9L12 15L18 9" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);

export default ArrowDown;
