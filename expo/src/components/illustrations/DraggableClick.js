import React from "react";
import Svg, { Rect } from "react-native-svg";
import styled from "styled-components";

const DraggableClick = ({ color = "#000", size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 32 27 " {...props}>
    <Rect width={32} height={5} rx={2.5} fill={color} />
    <Rect y={22} width={32} height={5} rx={2.5} fill={color} />
    <Rect y={11} width={32} height={5} rx={2.5} fill={color} />
  </Svg>
);

export default DraggableClick;
