import * as React from "react";
import Svg, { Path } from "react-native-svg";

const UploadIcon = ({ size, ...props }) => (
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
      d="M13.989 6.936a.89.89 0 0 1-1.259 0l-2.34-2.34v8.763a.89.89 0 1 1-1.78 0V4.597l-2.34 2.34a.89.89 0 0 1-1.259-1.26l3.86-3.859.629-.63.63.629 3.859 3.86a.89.89 0 0 1 0 1.26Zm-11.02 4.642a.89.89 0 1 0-1.781 0v3.86a2.375 2.375 0 0 0 2.375 2.374h11.874a2.375 2.375 0 0 0 2.376-2.375v-3.859a.89.89 0 1 0-1.782 0v3.86a.593.593 0 0 1-.593.593H3.562a.594.594 0 0 1-.593-.593v-3.86Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default UploadIcon;
