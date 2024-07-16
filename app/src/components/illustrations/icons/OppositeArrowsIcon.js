import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const OppositeArrowsIcon = ({ size, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size + 3} fill="none" {...props}>
    <Path
      fill="#4030A5"
      fillRule="evenodd"
      d="M0 5.408c0 .438.323.793.721.793h12.804l-2.213 2.473a.85.85 0 0 0 .009 1.122.676.676 0 0 0 1.02-.01l3.475-3.883a.756.756 0 0 0 .002-.988L12.343 1a.676.676 0 0 0-1.02-.013.85.85 0 0 0-.013 1.122l2.224 2.505H.721c-.398 0-.721.356-.721.794ZM16.377 15.27c0 .44-.324.798-.725.798H2.863l2.223 2.484a.854.854 0 0 1-.008 1.127.68.68 0 0 1-1.025-.01L.562 15.769a.76.76 0 0 1-.002-.992l3.49-3.933a.68.68 0 0 1 1.026-.014.854.854 0 0 1 .012 1.127l-2.234 2.518h12.798c.4 0 .725.357.725.797Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default OppositeArrowsIcon;
