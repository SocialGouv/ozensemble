import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import styled from "styled-components/native";

const StyledSvg = styled(Svg)``;

const VideosIcon = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 85 85" {...props}>
    <Circle cx="40" cy="40" r="38.5" stroke="white" strokeWidth={"3"} fill="none" />
    <Path
      d="M35 49C34.3125 49 33.75 48.4375 33.75 47.75V32.75C33.75 31.7875 34.8 31.175 35.6375 31.675L48.1375 39.175C48.95 39.6625 48.95 40.8375 48.1375 41.3125C34.4875 49.5 35.4875 48.9875 35 48.9875V49ZM36.25 34.9625V45.55L45.075 40.2625L36.25 34.975V34.9625Z"
      fill="white"
    />
    <Path
      d="M56.25 24H23.75C21.6875 24 20 25.6875 20 27.75V52.75C20 54.8125 21.6875 56.5 23.75 56.5H26.25C26.9375 56.5 27.5 55.9375 27.5 55.25V26.5H52.5V54H31.25C30.5625 54 30 54.5625 30 55.25C30 55.9375 30.5625 56.5 31.25 56.5H56.25C58.3125 56.5 60 54.8125 60 52.75V27.75C60 25.6875 58.3125 24 56.25 24ZM25 54H23.75C23.0625 54 22.5 53.4375 22.5 52.75V27.75C22.5 27.0625 23.0625 26.5 23.75 26.5H25V54ZM57.5 52.75C57.5 53.4375 56.9375 54 56.25 54H55V26.5H56.25C56.9375 26.5 57.5 27.0625 57.5 27.75V52.75Z"
      fill="white"
    />
  </StyledSvg>
);

export default VideosIcon;
