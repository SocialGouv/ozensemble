import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";

const StyledSvg = styled(Svg)``;

const PlusIcon = ({ size, color = "#4030A5", ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <Path
      d="M7.71422 11.1426H16.2858C16.536 11.1426 16.7415 11.223 16.9021 11.3835C17.0628 11.5441 17.1429 11.7495 17.1429 11.9998C17.1429 12.2501 17.0628 12.4556 16.9021 12.6161C16.7415 12.7766 16.536 12.857 16.2858 12.857H7.71422C7.46396 12.857 7.25847 12.7766 7.09794 12.6161C6.93742 12.4556 6.85706 12.2501 6.85706 11.9998C6.85706 11.7495 6.93742 11.5441 7.09794 11.3835C7.25847 11.223 7.46396 11.1426 7.71422 11.1426ZM11.1428 16.2856V7.71402C11.1428 7.46376 11.2232 7.25827 11.3837 7.09775C11.5443 6.93723 11.7497 6.85686 12 6.85686C12.2503 6.85686 12.4557 6.93722 12.6163 7.09775C12.7768 7.25827 12.8572 7.46376 12.8572 7.71402V16.2856C12.8572 16.5358 12.7768 16.7413 12.6163 16.9019C12.4557 17.0626 12.2503 17.1427 12 17.1427C11.7497 17.1427 11.5443 17.0626 11.3837 16.9019C11.2232 16.7413 11.1428 16.5358 11.1428 16.2856ZM12 22.2857C14.9109 22.2141 17.3349 21.2096 19.2721 19.2719C21.2093 17.3343 22.214 14.9101 22.2859 11.9998C22.2144 9.08885 21.2099 6.66481 19.2721 4.72764C17.3345 2.79041 14.9104 1.78578 12 1.71382C9.0891 1.78519 6.66506 2.78987 4.72788 4.72764C2.79066 6.66525 1.78602 9.08939 1.71407 11.9998C1.78543 14.9107 2.79012 17.3347 4.72788 19.2719C6.6655 21.2091 9.08963 22.2137 12 22.2857ZM12 24C8.60679 23.9108 5.78096 22.7368 3.52198 20.478C1.26316 18.219 0.0891443 15.3929 0 12C0.089159 8.60679 1.26316 5.78096 3.52198 3.52198C5.78101 1.26316 8.60713 0.0891443 12 0C15.3932 0.089159 18.219 1.26316 20.478 3.52198C22.7368 5.78101 23.9109 8.60713 24 12C23.9108 15.3932 22.7368 18.219 20.478 20.478C18.219 22.7368 15.3929 23.9109 12 24Z"
      fill={color}
    />
  </StyledSvg>
);

export default PlusIcon;
