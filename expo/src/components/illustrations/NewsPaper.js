import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const NewsPaper = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 70 80" {...props}>
    <Path
      d="M57.3333 0H4C1.16667 0 0 1.16667 0 4V76C0 78.8333 1.16667 80 4 80H57.3333C60.1667 80 61.3333 78.8333 61.3333 76V4C61.3333 1.16667 60.1667 0 57.3333 0ZM58.6667 77.3333H2.66667V2.66667H58.6667V74.6667V77.3333Z"
      fill="#4030A5"
    />
    <Path d="M22.6667 9.3335H8V30.6668H22.6667V9.3335Z" fill="#4030A5" />
    <Path d="M53.3333 57.3335H38.6666V69.3335H53.3333V57.3335Z" fill="#4030A5" />
    <Path d="M53.3333 9.3335H26.6666V12.0002H53.3333V9.3335Z" fill="#4030A5" />
    <Path d="M53.3333 18.6665H26.6666V21.3332H53.3333V18.6665Z" fill="#4030A5" />
    <Path d="M53.3333 28H26.6666V30.6667H53.3333V28Z" fill="#4030A5" />
    <Path d="M53.3333 37.3335H8V40.0002H53.3333V37.3335Z" fill="#4030A5" />
    <Path d="M53.3333 48H8V50.6667H53.3333V48Z" fill="#4030A5" />
    <Path d="M32 57.3335H8V60.0002H32V57.3335Z" fill="#4030A5" />
    <Path d="M32 66.6665H8V69.3332H32V66.6665Z" fill="#4030A5" />
  </Svg>
);

export default NewsPaper;
