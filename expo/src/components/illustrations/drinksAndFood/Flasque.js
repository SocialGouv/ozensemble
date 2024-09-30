import React from "react";
import Svg, { G, Path } from "react-native-svg";
import styled from "styled-components";

const HalfCider = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill="#DE285E">
      <Path d="m818.78 446.11-118.64-65.379v-104.62c14.52-1.2656 25.953-13.488 25.953-28.324v-80.23c0-14.836-11.434-27.074-25.953-28.324v-17.906c0-15.68-12.766-28.445-28.43-28.445h-118.52c-15.664 0-28.43 12.766-28.43 28.445v17.895c-14.52 1.2773-25.938 13.488-25.938 28.324v80.23c0 14.836 11.418 27.059 25.938 28.324v103.57l-120.54 67.781c-38.398 22.43-59.551 56.32-59.551 95.418l-0.003907 462.37c0 56.203 40.379 101.89 89.988 101.89h355.61c49.621 0 89.973-45.691 89.973-101.89v-462.37c0-46.988-31.82-80.824-61.453-96.754zm-148.31-323.58v16.574h-116.06l0.003906-16.574zm180.09 882.7c0 39.824-27.059 72.223-60.305 72.223h-355.61c-33.258 0-60.316-32.398-60.316-72.223v-462.37c0-28.129 15.93-52.918 44.609-69.664l127.93-71.945c4.668-2.625 7.543-7.5547 7.543-12.91v-112.13h73.621c8.1875 0 14.836-6.6445 14.836-14.836 0-8.1875-6.6445-14.836-14.836-14.836h-99.559v-77.75h167.95v77.75h-11.117c-8.1875 0-14.836 6.6445-14.836 14.836v128.12c0 5.4062 2.9414 10.379 7.6758 12.988l126.46 69.68c22.219 11.934 45.957 36.793 45.957 70.695z" />
      <Path d="m454.2 948.73h316.48c8.1875 0 14.836-6.6445 14.836-14.836v-375.82c0-8.1875-6.6445-14.836-14.836-14.836h-316.48c-8.1875 0-14.836 6.6445-14.836 14.836v375.82c0 8.1875 6.6445 14.836 14.836 14.836zm14.832-375.81h286.81v346.15h-286.81z" />
      <Path d="m809.25 1018.3c-7.6992-1.7539-78.672-17.184-194.65-17.184-120.49 0-195.77 16.43-198.91 17.129-7.9922 1.7812-13.043 9.707-11.262 17.695 1.793 8.0039 9.7305 12.977 17.711 11.273 0.73828-0.18359 75.219-16.43 192.48-16.43 112.73 0 180.67 14.758 188.08 16.457 1.1094 0.26562 2.2148 0.35547 3.3086 0.35547 6.7656 0 12.871-4.668 14.441-11.539 1.8047-7.9727-3.207-15.938-11.195-17.758z" />
    </G>
  </Svg>
);

export default HalfCider;
