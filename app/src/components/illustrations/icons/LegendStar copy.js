import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M9.45993 0.79996C9.85608 0.369355 10.5357 0.369354 10.9318 0.799959L14.4802 4.65699C14.5639 4.74803 14.6639 4.82274 14.7749 4.87733L19.4692 7.18564C19.9746 7.43414 20.1752 8.05074 19.9128 8.54901L17.4174 13.2872C17.3616 13.393 17.3253 13.508 17.3102 13.6266L16.649 18.8107C16.5701 19.4298 15.9495 19.8261 15.3546 19.6373L10.4984 18.096C10.3016 18.0335 10.0902 18.0335 9.89336 18.096L5.0372 19.6373C4.44229 19.8261 3.82168 19.4298 3.74272 18.8107L3.08156 13.6266C3.06643 13.508 3.03013 13.393 2.97439 13.2872L0.478978 8.54901C0.216556 8.05074 0.417149 7.43414 0.92251 7.18564L5.61688 4.87733C5.72789 4.82274 5.82781 4.74803 5.91157 4.65699L9.45993 0.79996Z"
        fill="#FCBC49"
      />
    </Svg>
  );
}

export default SvgComponent;
