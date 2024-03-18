import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const CalendarIcon = ({ color = '#5150A2', size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 21 21" {...props}>
    <G id="CalendarIcon" fill={color} fillRule="evenodd">
      <Path
        d="M4.73741 0.0748062C4.53234 0.169142 4.36417 0.361916 4.30675 0.566994C4.28624 0.649025 4.26573 0.907423 4.26573 1.13301V1.55137L3.45773 1.56777C2.54718 1.58828 2.31339 1.6416 1.8048 1.91641C1.39464 2.14199 0.914758 2.65059 0.701477 3.08125C0.361047 3.77441 0.389758 3.05254 0.389758 11.2803C0.389758 19.4957 0.365149 18.7861 0.697375 19.467C1.00089 20.0904 1.59152 20.6031 2.29288 20.8533L2.64562 20.9805H10.5001H18.3546L18.6827 20.8656C19.6056 20.5416 20.2864 19.8074 20.5366 18.8682C20.6064 18.618 20.6105 18.134 20.6105 11.2803C20.6105 3.04844 20.6392 3.77852 20.2946 3.07715C20.0526 2.58496 19.5646 2.09688 19.0724 1.85899C18.5925 1.62109 18.2398 1.55957 17.4112 1.55957H16.7345V1.13711C16.7345 0.640821 16.6894 0.456251 16.5253 0.267578C16.1685 -0.134375 15.4917 -0.0523434 15.2579 0.42754C15.1882 0.571095 15.1759 0.681837 15.1759 1.07969V1.55957H10.5042H5.83253L5.81613 1.03457C5.80382 0.55879 5.79562 0.493164 5.70538 0.361916C5.4798 0.0378914 5.07784 -0.0851555 4.73741 0.0748062ZM4.27394 3.59805C4.29034 4.15996 4.35597 4.33223 4.60206 4.5127C4.90148 4.73008 5.28292 4.70957 5.56593 4.45938C5.78331 4.2666 5.82433 4.13535 5.82433 3.58984V3.11816H10.5001H15.1759V3.58984C15.1759 4.13535 15.2169 4.2666 15.4343 4.45938C15.7255 4.71367 16.1234 4.72598 16.431 4.49219C16.6484 4.32812 16.7099 4.14355 16.7263 3.59805L16.7427 3.11816H17.3948C17.9485 3.11816 18.0757 3.13047 18.2685 3.2002C18.5515 3.30684 18.8017 3.54883 18.9411 3.84824L19.0519 4.08203L19.0642 5.34121L19.0806 6.60449H10.5001H1.91964L1.93605 5.34121C1.94835 4.24199 1.96066 4.06152 2.02218 3.91797C2.13702 3.65547 2.29288 3.4627 2.46925 3.34375C2.76456 3.14688 2.88761 3.12227 3.59308 3.12227L4.25753 3.11816L4.27394 3.59805ZM19.0642 13.3188L19.0519 18.4785L18.9452 18.7041C18.8181 18.9748 18.5966 19.2004 18.3382 19.3275L18.1495 19.4219H10.5001H2.8507L2.66202 19.3275C2.39952 19.2004 2.18214 18.9789 2.05499 18.7082L1.94835 18.4785L1.93605 13.3188L1.92784 8.16309H10.5001H19.0724L19.0642 13.3188Z"
        fill={color}
      />
      <Defs>
        <ClipPath id="clip0_2279_1468">
          <Rect width="21" height="21" fill="white" />
        </ClipPath>
      </Defs>
    </G>
  </StyledSvg>
);

export default CalendarIcon;