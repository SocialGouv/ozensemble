import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const StatsIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect width="25" height="25" rx="7" fill="#E8E8F3" />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.8311 6.16602C8.0576 6.18947 5 9.28074 5 13.082C5 16.8994 8.08097 20 11.8743 20C15.6528 20 18.7227 16.9234 18.7465 13.1265C18.7465 12.9052 18.6434 12.8217 18.4466 12.8217H12.1329V6.46832C12.1329 6.26855 12.0253 6.16602 11.8311 6.16602Z"
      fill="#4030A5"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.8691 5.30191V11.916C12.8691 12.0694 12.9874 12.1763 13.1277 12.1763H19.6992C19.9041 12.1745 20 12.0696 20 11.8727C19.9769 8.09014 16.9306 5.02397 13.1721 5C12.955 5 12.8691 5.12642 12.8691 5.30191Z"
      fill="#4030A5"
    />
  </Svg>
);

export default StatsIcon;
