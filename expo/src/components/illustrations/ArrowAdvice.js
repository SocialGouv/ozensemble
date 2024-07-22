import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const StyledSvg = styled(Svg)``;

const ArrowAdvice = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 20 10" {...props}>
    <Path
      d="M13.7811 4.23689L8.03314 0.214008C7.85451 0.0896244 7.64526 0.0164724 7.42804 0.00247135C7.21082 -0.0115297 6.99391 0.0341538 6.80079 0.134576C6.60767 0.234999 6.4457 0.386334 6.33241 0.572199C6.21912 0.758064 6.15883 0.971376 6.15807 1.18904V2.0959C4.72819 2.15054 3.35571 2.6727 2.25111 3.58232C1.57308 4.17438 1.02361 4.89913 0.636609 5.71183C0.249609 6.52453 0.0332955 7.40793 0.00102387 8.30749C-0.0077377 8.48611 0.0399074 8.66296 0.137214 8.813C0.23452 8.96304 0.376557 9.07868 0.543217 9.14353C0.709876 9.20838 0.892713 9.21917 1.06584 9.17437C1.23897 9.12956 1.39362 9.03143 1.5079 8.89388C2.1634 8.07178 3.05995 7.47567 4.07163 7.18927C4.7532 7.01269 5.46477 6.98479 6.15807 7.10745V8.11657C6.15747 8.33462 6.21697 8.54862 6.33004 8.73506C6.4431 8.9215 6.60537 9.07318 6.799 9.17343C6.96988 9.26151 7.15906 9.30823 7.3513 9.3098C7.59555 9.30857 7.83355 9.23241 8.03314 9.09161L13.7811 5.06873C13.8486 5.02238 13.9038 4.96028 13.9419 4.88782C13.9801 4.81536 14 4.7347 14 4.65281C14 4.57092 13.9801 4.49026 13.9419 4.4178C13.9038 4.34534 13.8486 4.28324 13.7811 4.23689Z"
      fill="#4030A5"
    />
  </StyledSvg>
);

export default ArrowAdvice;
