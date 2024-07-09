import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";

const StyledSvg = styled(Svg)``;

const TickDone = ({ size, color, opacity = 1, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 25 24" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.51472 3.51472C5.76515 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76515 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76515 3.51472 3.51472ZM12 2C9.34783 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34783 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34783 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34783 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2Z"
      fill={color}
      fill-opacity={opacity}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.8247 7.88265C18.2842 8.21833 18.3773 8.85327 18.0327 9.30084L12.5124 16.4701C12.3335 16.7021 12.1052 16.8945 11.8436 17.0333C11.582 17.172 11.2928 17.2544 10.9957 17.2749C10.6985 17.2954 10.4004 17.2535 10.1213 17.152C9.84227 17.0506 9.58887 16.8919 9.37823 16.6868C9.3782 16.6868 9.37826 16.6868 9.37823 16.6868L6.0655 13.4614C5.65928 13.0659 5.65914 12.4245 6.0652 12.0289C6.47125 11.6332 7.12974 11.633 7.53597 12.0286L10.8487 15.2539L16.3687 8.08525C16.7133 7.63768 17.3652 7.54697 17.8247 7.88265Z"
      fill={color}
      fill-opacity={opacity}
    />
  </StyledSvg>
);

export default TickDone;
