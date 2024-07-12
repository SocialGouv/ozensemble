import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const StyledSvg = styled(Svg)``;

const HalfBeer = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 17 39" {...props}>
    <Path
      d="M16.8068,2.66579 C16.8242,2.4827 16.7633,2.30056 16.6392,2.16506 C16.5158,2.02862 16.3406,1.95119 16.1569,1.95119 L16.0646,1.95119 C15.7691,0.806944 14.7391,0.00603442 13.5574,0.00159197 L11.6082,0.00159197 C10.8587,0.00413051 10.1472,0.331602 9.65856,0.8996 C8.73294,-0.178327 7.10859,-0.301764 6.03067,0.624169 C5.98212,0.665737 5.93484,0.709527 5.88946,0.754904 C4.51992,-0.392199 2.4802,-0.211645 1.33342,1.1579 C1.13287,1.39715 0.968184,1.66434 0.844113,1.95119 L0.653088,1.95119 C0.294201,1.94929 0.0016349,2.23868 9.54223367e-11,2.59757 C-0.000269049,2.62041 0.00100018,2.64326 0.00322142,2.66579 L3.10627,34.4832 C3.12785,34.7447 3.0482,35.0042 2.88383,35.2086 L1.54538,36.8818 C1.09765,37.4431 1.18999,38.2609 1.75101,38.7083 C1.9817,38.8923 2.26792,38.9920007 2.56302,38.9920007 L14.1546,38.9920007 C14.8727,38.9920007 15.4544,38.41 15.4544,37.6922 C15.4544,37.3971 15.3541,37.1109 15.1697,36.8805 L13.8313,35.2067 C13.6685,35.0055 13.5885,34.7498 13.6076,34.4918 L16.8068,2.66579 Z M11.6082,1.30132 L13.5574,1.30132 C14.0198,1.30259 14.4462,1.55042 14.6766,1.95119 L10.489,1.95119 C10.7193,1.55042 11.1458,1.30259 11.6082,1.30132 Z M3.81008,1.30132 C4.45106,1.30196 5.05047,1.61801 5.4138,2.14602 C5.61657,2.44208 6.02115,2.51792 6.3172,2.31484 C6.41335,2.24883 6.49014,2.1584 6.53933,2.05241 C6.83697,1.40604 7.60234,1.12331 8.24872,1.42095 C8.50542,1.539 8.71581,1.73827 8.84813,1.98736 C8.56413,2.05654 8.36295,2.30881 8.35882,2.60106 L8.35882,4.55034 C8.35882,4.90922 8.06784,5.2002 7.70896,5.2002 C7.35007,5.2002 7.05909,4.90922 7.05909,4.55034 C7.05909,4.19145 6.76811,3.90079 6.40923,3.90079 C6.05034,3.90079 5.75936,4.19145 5.75936,4.55034 L5.75936,6.49994 C5.75936,6.85882 5.46838,7.1498 5.10949,7.1498 C4.75093,7.1498 4.45994,6.85882 4.45994,6.49994 L4.45994,2.60106 C4.45994,2.24217 4.16896,1.95119 3.81008,1.95119 L2.36851,1.95119 C2.73437,1.53868 3.2589,1.30228 3.81008,1.30132 Z M1.36927,3.25092 L3.16021,3.25092 L3.16021,6.49994 C3.16021,7.57659 4.03284,8.44954 5.10949,8.44954 C6.18647,8.44954 7.05909,7.57659 7.05909,6.49994 L7.05909,6.38888 C8.07419,6.74776 9.18797,6.21562 9.54686,5.20084 C9.6208,4.99173 9.65856,4.77214 9.65856,4.55034 L9.65856,3.25092 L15.442,3.25092 L14.8515,9.0994 L1.93918,9.0994 L1.36927,3.25092 Z M12.8162,36.0184 L14.1546,37.6922 L2.56302,37.6922 L3.90147,36.019 C4.27431,35.5529 4.45423,34.9611 4.40378,34.3664 L2.06578,10.3991 L14.7207,10.3991 L12.3126,34.3782 C12.265,34.969 12.4452,35.5557 12.8162,36.0184 Z"
      id="Shape"
      fill="#de285e"
    />
    <Path d="M5.10938 34.4432H11.608V35.7427H5.10938V34.4432Z" fill="#de285e" />
    <Path d="M10.9583 11.6989H12.258V17.5473H10.9583V11.6989Z" fill="#de285e" />
    <Path d="M10.9583 18.8471H12.258V20.1466H10.9583V18.8471Z" fill="#de285e" />
  </StyledSvg>
);

export default HalfBeer;
