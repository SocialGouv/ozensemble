import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const MeditationIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 45 45" {...props}>
    <Path
      d="M34.5115 8.79219C35.299 11.3191 35.6365 13.9499 35.5413 16.6326C33.6115 17.6018 31.6298 18.9172 29.7346 20.6739C29.6394 17.9999 29.1288 15.5941 28.4192 13.4912C30.6346 11.1547 32.9365 9.64892 34.5115 8.79219ZM22.5 6.42969C24.5423 8.93065 27.9692 14.2181 27.9692 21.5999C27.9692 24.2393 27.424 30.8249 22.5086 36.7701C20.4663 34.2691 17.0394 28.9816 17.0394 21.5999C17.0394 18.9605 17.5846 12.3749 22.5 6.42969ZM10.4884 8.79219C12.0634 9.64026 14.3654 11.146 16.5894 13.4912C15.6288 16.3903 15.3346 18.9518 15.2654 20.6653C13.3702 18.9085 11.3884 17.5931 9.46729 16.6239C9.38075 13.9499 9.7096 11.3191 10.4971 8.78353L10.4884 8.79219ZM0.0692139 15.7239C3.28844 16.0528 9.44998 17.3768 14.6596 22.5778C14.8154 22.7335 15.0317 22.9585 15.2827 23.2355C15.6894 29.5701 18.3894 34.3124 20.4231 37.0297C17.0307 36.5278 11.5961 34.9787 6.93171 30.3143C5.07114 28.4451 0.796137 23.3739 0.0692139 15.7239ZM38.0596 30.3143C33.3952 34.9787 27.9606 36.5278 24.5682 37.0297C28.4452 31.898 29.4663 26.472 29.6913 23.2441C29.9423 22.9672 30.1673 22.7335 30.3231 22.5778C35.5327 17.3681 41.6942 16.0441 44.9134 15.7239C44.1865 23.3739 39.9115 28.4451 38.0509 30.3143H38.0596Z"
      fill="white"
    />
    <Path
      d="M2.7 10.7994C4.19117 10.7994 5.4 9.59058 5.4 8.09941C5.4 6.60824 4.19117 5.39941 2.7 5.39941C1.20883 5.39941 0 6.60824 0 8.09941C0 9.59058 1.20883 10.7994 2.7 10.7994Z"
      fill="white"
    />
    <Path
      d="M15.3001 5.4C16.7913 5.4 18.0001 4.19117 18.0001 2.7C18.0001 1.20883 16.7913 0 15.3001 0C13.8089 0 12.6001 1.20883 12.6001 2.7C12.6001 4.19117 13.8089 5.4 15.3001 5.4Z"
      fill="white"
    />
    <Path
      d="M42.3 10.7994C43.7911 10.7994 45 9.59058 45 8.09941C45 6.60824 43.7911 5.39941 42.3 5.39941C40.8088 5.39941 39.6 6.60824 39.6 8.09941C39.6 9.59058 40.8088 10.7994 42.3 10.7994Z"
      fill="white"
    />
    <Path
      d="M29.7 5.4C31.1912 5.4 32.4 4.19117 32.4 2.7C32.4 1.20883 31.1912 0 29.7 0C28.2088 0 27 1.20883 27 2.7C27 4.19117 28.2088 5.4 29.7 5.4Z"
      fill="white"
    />
  </Svg>
);

export default MeditationIcon;
