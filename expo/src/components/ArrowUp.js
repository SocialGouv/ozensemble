import React from "react";
import Svg, { Polygon } from "react-native-svg";

const ArrowUp = ({ color = "#39cec0", size, ...style }) => (
  <Svg height={size} width={size} viewBox="0 0 270 185" {...style}>
    <Polygon
      id="ArrowDown"
      fill={color}
      transform="translate(135.143315, 134.812629) rotate(135.000000) translate(-135.143315, -134.812629) "
      points="110 40 110 160 230.28663 160 230.28663 229.625259 40 229.625259 40 40"
    />
  </Svg>
);

export default ArrowUp;
