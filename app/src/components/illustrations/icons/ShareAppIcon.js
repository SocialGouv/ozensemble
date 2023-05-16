import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const ShareAppIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect width="25" height="25" rx="7" fill="#CFD5F6" />
    <Path
      d="M11.1007 14.1667L20.2674 5M11.1007 14.1667L14.0174 20C14.054 20.0798 14.1127 20.1474 14.1865 20.1948C14.2604 20.2422 14.3463 20.2674 14.4341 20.2674C14.5218 20.2674 14.6077 20.2422 14.6816 20.1948C14.7555 20.1474 14.8142 20.0798 14.8507 20L20.2674 5M11.1007 14.1667L5.26739 11.25C5.18761 11.2134 5.12 11.1547 5.0726 11.0809C5.0252 11.007 5 10.9211 5 10.8333C5 10.7456 5.0252 10.6597 5.0726 10.5858C5.12 10.5119 5.18761 10.4532 5.26739 10.4167L20.2674 5"
      stroke="#3E5DE6"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ShareAppIcon;
