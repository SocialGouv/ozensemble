import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";

const StyledSvg = styled(Svg)``;

const ChillIcon = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 51 47" {...props}>
    <Path
      d="M25.9664 46.5129L10.9864 17.1229C10.7364 16.6229 10.9364 16.0229 11.4264 15.7729C11.9164 15.5229 12.5264 15.7229 12.7764 16.2129L27.7864 45.6729C28.8864 43.2629 33.8964 30.9329 26.9464 17.3429C19.3664 2.50291 4.64636 0.102911 4.02636 0.0129108C3.59636 -0.0570892 3.17636 0.162911 2.97636 0.542911C2.69636 1.10291 -3.97364 14.4429 3.61636 29.2829C10.4564 42.6629 23.0964 45.9329 25.9664 46.5129Z"
      fill="white"
    />
    <Path
      d="M47.9663 13.5928C47.5263 13.6028 38.0663 13.9228 30.9763 21.9028C32.5663 26.9228 32.7863 31.6128 32.4163 35.5528L34.6663 32.2328C34.9763 31.7828 35.5963 31.6628 36.0563 31.9728C36.5163 32.2828 36.6363 32.9028 36.3263 33.3528L31.6763 40.2328C31.0363 43.0428 30.2063 45.1428 29.7163 46.2428C33.6663 45.4728 40.6763 43.0928 45.6663 35.8228C52.8163 25.3928 49.0963 14.7028 48.9263 14.2528C48.7863 13.8528 48.3963 13.6028 47.9663 13.5928Z"
      fill="white"
    />
  </StyledSvg>
);

export default ChillIcon;
