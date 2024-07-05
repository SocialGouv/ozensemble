import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Clock = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M7.5 1.172A6.328 6.328 0 1 0 13.828 7.5 6.335 6.335 0 0 0 7.5 1.172Zm0 11.25a4.922 4.922 0 1 1 0-9.844 4.922 4.922 0 0 1 0 9.844ZM11.484 7.5a.703.703 0 0 1-.703.703H7.5a.703.703 0 0 1-.703-.703V4.219a.703.703 0 0 1 1.406 0v2.578h2.578a.703.703 0 0 1 .703.703Z"
    />
  </Svg>
);
export default Clock;
