import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const FunIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 45 45" {...props}>
    <Path
      d="M22.5 0C18.0499 0 13.6998 1.3196 9.99968 3.79193C6.29957 6.26426 3.41569 9.77828 1.71272 13.8896C0.00974893 18.001 -0.435826 22.525 0.432341 26.8895C1.30051 31.2541 3.44343 35.2632 6.59011 38.4099C9.73679 41.5566 13.7459 43.6995 18.1105 44.5677C22.475 45.4358 26.999 44.9902 31.1104 43.2873C35.2217 41.5843 38.7357 38.7004 41.2081 35.0003C43.6804 31.3002 45 26.9501 45 22.5C44.9934 16.5347 42.6207 10.8155 38.4026 6.5974C34.1845 2.37927 28.4653 0.00661713 22.5 0ZM29.765 14.53C30.1823 14.53 30.5903 14.6537 30.9373 14.8856C31.2842 15.1174 31.5547 15.447 31.7144 15.8325C31.8741 16.2181 31.9159 16.6423 31.8345 17.0516C31.753 17.4609 31.5521 17.8369 31.257 18.132C30.9619 18.4271 30.5859 18.628 30.1766 18.7095C29.7673 18.7909 29.3431 18.7491 28.9575 18.5894C28.572 18.4297 28.2425 18.1592 28.0106 17.8122C27.7788 17.4653 27.655 17.0573 27.655 16.64C27.655 16.3629 27.7096 16.0885 27.8156 15.8325C27.9217 15.5765 28.0771 15.3439 28.273 15.148C28.4689 14.9521 28.7015 14.7966 28.9575 14.6906C29.2135 14.5846 29.4879 14.53 29.765 14.53ZM15.235 14.53C15.6523 14.53 16.0603 14.6537 16.4073 14.8856C16.7542 15.1174 17.0247 15.447 17.1844 15.8325C17.3441 16.2181 17.3859 16.6423 17.3045 17.0516C17.223 17.4609 17.0221 17.8369 16.727 18.132C16.4319 18.4271 16.0559 18.628 15.6466 18.7095C15.2373 18.7909 14.8131 18.7491 14.4275 18.5894C14.042 18.4297 13.7125 18.1592 13.4806 17.8122C13.2488 17.4653 13.125 17.0573 13.125 16.64C13.125 16.0804 13.3473 15.5437 13.743 15.148C14.1387 14.7523 14.6754 14.53 15.235 14.53ZM22.5 37.5C14.71 37.5 9.41001 32.935 9.00001 25.87C8.99108 25.7419 9.00865 25.6132 9.05162 25.4922C9.09459 25.3711 9.16205 25.2602 9.24978 25.1664C9.33751 25.0726 9.44363 24.9978 9.56152 24.9468C9.67942 24.8958 9.80656 24.8697 9.93501 24.87H35.07C35.1941 24.8706 35.3168 24.8959 35.4309 24.9445C35.5451 24.993 35.6485 25.0638 35.7351 25.1527C35.8216 25.2415 35.8896 25.3468 35.9351 25.4622C35.9806 25.5776 36.0027 25.701 36 25.825C36 32.5 30.2 37.5 22.5 37.5Z"
      fill="white"
    />
  </Svg>
);

export default FunIcon;
