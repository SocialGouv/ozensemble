import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Location = (props) => (
  <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M12.8333 6.31818C12.8333 10.4545 7.41667 14 7.41667 14C7.41667 14 2 10.4545 2 6.31818C2 4.90771 2.57068 3.55501 3.5865 2.55766C4.60233 1.56031 5.98008 1 7.41667 1C8.85326 1 10.231 1.56031 11.2468 2.55766C12.2626 3.55501 12.8333 4.90771 12.8333 6.31818Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M9.25 6.5C9.25 7.4665 8.4665 8.25 7.5 8.25C6.5335 8.25 5.75 7.4665 5.75 6.5C5.75 5.5335 6.5335 4.75 7.5 4.75C8.4665 4.75 9.25 5.5335 9.25 6.5Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default Location;
