import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CloudIcon = ({ size, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size + 4}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill="#4030A5"
      fillRule="evenodd"
      d="M3.386 3.55C4.225 1.694 5.977.416 8 .416c2.023 0 3.776 1.278 4.615 3.136C14.51 3.733 16 5.475 16 7.593c0 2.24-1.664 4.058-3.714 4.058H3.715C1.665 11.651 0 9.832 0 7.593c0-2.118 1.49-3.86 3.386-4.042Zm8.9 6.853c1.42 0 2.571-1.26 2.571-2.81s-1.151-2.81-2.571-2.81h-.038a.57.57 0 0 1-.538-.389c-.594-1.6-2.032-2.73-3.71-2.73-1.677 0-3.115 1.13-3.71 2.73a.57.57 0 0 1-.537.39h-.038c-1.42 0-2.572 1.258-2.572 2.809 0 1.55 1.152 2.81 2.572 2.81h8.57Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default CloudIcon;
