import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DownloadIcon = ({ size, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M13.989 8.501a.89.89 0 0 0-1.259 0l-2.34 2.34V2.078a.89.89 0 1 0-1.78 0v8.763L6.27 8.5a.89.89 0 0 0-1.259 1.26l3.86 3.858.629.631.63-.63 3.859-3.859a.89.89 0 0 0 0-1.26Zm-11.02 3.077a.891.891 0 0 0-1.781 0v3.86a2.375 2.375 0 0 0 2.375 2.374h11.874a2.375 2.375 0 0 0 2.376-2.375v-3.859a.89.89 0 1 0-1.782 0v3.86a.593.593 0 0 1-.593.593H3.562a.594.594 0 0 1-.593-.593v-3.86Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default DownloadIcon;
