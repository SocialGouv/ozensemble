import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FolderIcon = ({ size, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill="#4030A5"
      d="M13.79 2.43H8.854c-.297 0-.578-.13-.767-.354L6.996.784A2.208 2.208 0 0 0 5.302 0H2.21C.99 0 0 .98 0 2.188v9.802c0 1.207.99 2.187 2.21 2.187h11.583A2.2 2.2 0 0 0 16 11.99V4.618c0-1.207-.99-2.188-2.21-2.188Zm.995 9.56a.984.984 0 0 1-.994.972H2.21a.984.984 0 0 1-.995-.972V2.188c0-.537.446-.973.995-.973h3.092c.298 0 .578.13.768.355l1.09 1.292c.42.498 1.038.785 1.695.785h4.937a.98.98 0 0 1 .993.971v7.372Z"
    />
    <Path
      fill="#4030A5"
      d="M10.102 8.482 8.71 9.876V5.823a.607.607 0 1 0-1.215 0v4.053L6.101 8.483a.606.606 0 1 0-.859.858l1.93 1.93c.256.257.594.385.93.385.337 0 .673-.128.93-.385l1.93-1.93a.609.609 0 0 0-.86-.86Z"
    />
  </Svg>
);

export default FolderIcon;
