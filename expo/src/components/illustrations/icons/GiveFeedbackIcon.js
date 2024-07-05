import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const GiveFeedbackIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect width="25" height="25" rx="7" fill="#FEE4CD" />
    <Path
      d="M9.71429 19.9377L5 20.7863L5.78571 16.0091L16.3614 5.46483C16.5075 5.31754 16.6813 5.20063 16.8728 5.12085C17.0643 5.04107 17.2697 5 17.4771 5C17.6846 5 17.89 5.04107 18.0815 5.12085C18.273 5.20063 18.4468 5.31754 18.5929 5.46483L20.2586 7.13054C20.4059 7.27662 20.5228 7.45043 20.6025 7.64192C20.6823 7.83341 20.7234 8.03881 20.7234 8.24625C20.7234 8.4537 20.6823 8.6591 20.6025 8.85059C20.5228 9.04208 20.4059 9.21588 20.2586 9.36197L9.71429 19.9377Z"
      stroke="#ED9A4B"
      strokeWidth="1.57143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default GiveFeedbackIcon;
