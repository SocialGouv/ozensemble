import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)`
  ${({ marginHorizontal }) => marginHorizontal && 'margin-horizontal:-10px'}
`;

const Shoot = ({ size, marginHorizontal, ...props }) => (
  <StyledSvg width={size} height={size} marginHorizontal={marginHorizontal} fill="none" viewBox="0 0 50 50" {...props}>
    <Path
      d="m37.175 12.844.01-.087c0-.524 0-1.174-12.185-1.174s-12.185.65-12.182 1.23l2.923 25.832c.057.566.895 2.415 9.259 2.415s9.202-1.85 9.259-2.41l2.912-25.773.006-.032h-.002zm-1.807.096c-1.306.186-4.15.4-10.368.4s-9.062-.215-10.367-.4c1.277-.16 4.11-.357 10.367-.357 6.258 0 9.091.196 10.368.357zm.707.38c-.443 2.424-2.04 11.014-3.095 14.493-.78 2.576-2.798 5.645-7.98 5.645s-7.2-3.07-7.98-5.645c-1.054-3.479-2.652-12.07-3.095-14.493 1.552.338 5.373.52 11.075.52 5.702 0 9.523-.182 11.075-.52zm-2.8 25.166c-.006.016-.662 1.574-8.275 1.574-7.527 0-8.253-1.523-8.265-1.523l-1.59-14.036c.321 1.407.637 2.674.918 3.602.72 2.374 2.836 6.355 8.937 6.355s8.218-3.981 8.937-6.355c.281-.929.597-2.195.918-3.603l-1.58 13.986z"
      fill="#DE285E"
      stroke="#DE285E"
    />
  </StyledSvg>
);

export default Shoot;
