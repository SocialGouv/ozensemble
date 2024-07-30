import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import styled from "styled-components";

const BreathingIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 85 85" {...props}>
    <Circle cx="40" cy="40" r="38.5" stroke="white" fill="none" strokeWidth={"3"} />
    <Path
      d="M48.75 30C46.6875 30 45 31.6875 45 33.75V35.75L43.75 34.5V21.25C43.75 20.5625 43.1875 20 42.5 20C41.8125 20 41.25 20.5625 41.25 21.25V35C41.25 35.3125 41.375 35.625 41.625 35.875L50.375 44.625C50.625 44.875 50.9375 45 51.25 45C51.5625 45 51.875 44.875 52.125 44.625C52.625 44.125 52.625 43.375 52.125 42.875L47.5 38.25V33.75C47.5 33.0625 48.0625 32.5 48.75 32.5C52.6875 32.5 57.5 40.3125 57.5 50V56.25C57.5 56.9375 56.9375 57.5 56.25 57.5H55.4375C54.5625 57.5 53.6875 57.25 52.9375 56.8125L49.375 54.8125C47.4375 53.6875 46.25 51.625 46.25 49.375V46.75L49.125 49.625C49.375 49.875 49.6875 50 50 50C50.3125 50 50.625 49.875 50.875 49.625C51.375 49.125 51.375 48.375 50.875 47.875L43 40C41.3125 38.3125 38.625 38.3125 37 40L29.125 47.875C28.625 48.375 28.625 49.125 29.125 49.625C29.625 50.125 30.375 50.125 30.875 49.625L33.75 46.75V49.375C33.75 51.625 32.5625 53.6875 30.625 54.8125L27.125 56.8125C26.375 57.25 25.5 57.5 24.625 57.5H23.75C23.0625 57.5 22.5 56.9375 22.5 56.25V50C22.5 40.3125 27.3125 32.5 31.25 32.5C31.9375 32.5 32.5 33.0625 32.5 33.75V38.25L27.875 42.875C27.375 43.375 27.375 44.125 27.875 44.625C28.125 44.875 28.4375 45 28.75 45C29.0625 45 29.375 44.875 29.625 44.625L38.375 35.875C38.625 35.625 38.75 35.3125 38.75 35V21.25C38.75 20.5625 38.1875 20 37.5 20C36.8125 20 36.25 20.5625 36.25 21.25V34.5L35 35.75V33.75C35 31.6875 33.3125 30 31.25 30C25.375 30 20 39.5625 20 50V56.25C20 58.3125 21.6875 60 23.75 60H24.5625C25.875 60 27.125 59.6875 28.3125 59L31.8125 57C34.5625 55.4375 36.25 52.5 36.25 49.375V44.25L38.75 41.75C39.4375 41.0625 40.5625 41.0625 41.25 41.75L43.75 44.25V49.375C43.75 52.5 45.4375 55.4375 48.1875 57L51.6875 59C52.8125 59.625 54.125 60 55.4375 60H56.25C58.3125 60 60 58.3125 60 56.25V50C60 39.5625 54.625 30 48.75 30Z"
      fill="white"
    />
  </Svg>
);

export default BreathingIcon;
