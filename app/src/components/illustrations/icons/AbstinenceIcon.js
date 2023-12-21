import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const AbstinenceIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect width="25" height="25" rx="7" fill="#FEF0D6" />
    <Path
      fill="#FCBC49"
      d="M12.258 5.823a1 1 0 0 1 1.484 0l2.593 2.873a1 1 0 0 0 .294.224l3.466 1.738a1 1 0 0 1 .44 1.353L18.682 15.6a1 1 0 0 0-.104.334l-.493 3.941a1 1 0 0 1-1.24.845l-3.598-.916a1 1 0 0 0-.494 0l-3.599.916a1 1 0 0 1-1.239-.845l-.493-3.94a1 1 0 0 0-.104-.335l-1.853-3.59a1 1 0 0 1 .44-1.352L9.37 8.92a1 1 0 0 0 .294-.224l2.593-2.873Z"
    />
  </Svg>
);

export default AbstinenceIcon;
