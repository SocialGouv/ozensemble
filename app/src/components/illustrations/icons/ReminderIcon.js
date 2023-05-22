import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const ReminderIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect width="25" height="25" rx="7" fill="#FEE4CD" />
    <Path
      d="M18 9.66675C18 8.34067 17.4732 7.0689 16.5355 6.13121C15.5979 5.19353 14.3261 4.66675 13 4.66675C11.6739 4.66675 10.4021 5.19353 9.46447 6.13121C8.52678 7.0689 8 8.34067 8 9.66675C8 15.5001 5.5 17.1667 5.5 17.1667H20.5C20.5 17.1667 18 15.5001 18 9.66675Z"
      stroke="#ED9A4B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.4419 20.5C14.2954 20.7526 14.0851 20.9622 13.8321 21.1079C13.5791 21.2537 13.2922 21.3304 13.0003 21.3304C12.7083 21.3304 12.4214 21.2537 12.1684 21.1079C11.9154 20.9622 11.7051 20.7526 11.5586 20.5"
      stroke="#ED9A4B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ReminderIcon;
