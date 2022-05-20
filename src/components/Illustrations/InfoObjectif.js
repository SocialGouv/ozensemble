import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const InfosIcon = ({ color = '#000000', size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <G id="Infos" fillRule="evenodd" clip-rule="evenodd">
      <Path
        d="M3.50862 3.50862C5.75515 1.26209 8.80209 0 11.9792 0C15.1562 0 18.2032 1.26209 20.4497 3.50862C22.6962 5.75515 23.9583 8.80209 23.9583 11.9792C23.9583 15.1562 22.6962 18.2032 20.4497 20.4497C18.2032 22.6962 15.1562 23.9583 11.9792 23.9583C8.80209 23.9583 5.75515 22.6962 3.50862 20.4497C1.26209 18.2032 0 15.1562 0 11.9792C0 8.80209 1.26209 5.75515 3.50862 3.50862ZM11.9792 1.04167C9.07836 1.04167 6.29637 2.19401 4.24519 4.24519C2.19401 6.29637 1.04167 9.07836 1.04167 11.9792C1.04167 14.88 2.19401 17.662 4.24519 19.7131C6.29637 21.7643 9.07836 22.9167 11.9792 22.9167C14.88 22.9167 17.662 21.7643 19.7131 19.7131C21.7643 17.662 22.9167 14.88 22.9167 11.9792C22.9167 9.07836 21.7643 6.29637 19.7131 4.24519C17.662 2.19401 14.88 1.04167 11.9792 1.04167Z"
        fill={color}
      />
      <Path
        d="M3.50862 3.50862C5.75515 1.26209 8.80209 0 11.9792 0C15.1562 0 18.2032 1.26209 20.4497 3.50862C22.6962 5.75515 23.9583 8.80209 23.9583 11.9792C23.9583 15.1562 22.6962 18.2032 20.4497 20.4497C18.2032 22.6962 15.1562 23.9583 11.9792 23.9583C8.80209 23.9583 5.75515 22.6962 3.50862 20.4497C1.26209 18.2032 0 15.1562 0 11.9792C0 8.80209 1.26209 5.75515 3.50862 3.50862ZM11.9792 1.04167C9.07836 1.04167 6.29637 2.19401 4.24519 4.24519C2.19401 6.29637 1.04167 9.07836 1.04167 11.9792C1.04167 14.88 2.19401 17.662 4.24519 19.7131C6.29637 21.7643 9.07836 22.9167 11.9792 22.9167C14.88 22.9167 17.662 21.7643 19.7131 19.7131C21.7643 17.662 22.9167 14.88 22.9167 11.9792C22.9167 9.07836 21.7643 6.29637 19.7131 4.24519C17.662 2.19401 14.88 1.04167 11.9792 1.04167Z"
        fill={color}
      />
      <Path
        d="M9.375 8.85824C9.375 8.57059 9.60819 8.3374 9.89583 8.3374H11.4583C11.7346 8.3374 11.9996 8.44715 12.1949 8.6425C12.3903 8.83785 12.5 9.1028 12.5 9.37907V16.1499C12.5 16.288 12.5549 16.4205 12.6525 16.5182C12.7502 16.6159 12.8827 16.6707 13.0208 16.6707H14.5833C14.871 16.6707 15.1042 16.9039 15.1042 17.1916C15.1042 17.4792 14.871 17.7124 14.5833 17.7124H13.0208C12.6064 17.7124 12.209 17.5478 11.916 17.2548C11.623 16.9617 11.4583 16.5643 11.4583 16.1499V9.37907H9.89583C9.60819 9.37907 9.375 9.14588 9.375 8.85824Z"
        fill={color}
      />
      <Path
        d="M9.375 8.85824C9.375 8.57059 9.60819 8.3374 9.89583 8.3374H11.4583C11.7346 8.3374 11.9996 8.44715 12.1949 8.6425C12.3903 8.83785 12.5 9.1028 12.5 9.37907V16.1499C12.5 16.288 12.5549 16.4205 12.6525 16.5182C12.7502 16.6159 12.8827 16.6707 13.0208 16.6707H14.5833C14.871 16.6707 15.1042 16.9039 15.1042 17.1916C15.1042 17.4792 14.871 17.7124 14.5833 17.7124H13.0208C12.6064 17.7124 12.209 17.5478 11.916 17.2548C11.623 16.9617 11.4583 16.5643 11.4583 16.1499V9.37907H9.89583C9.60819 9.37907 9.375 9.14588 9.375 8.85824Z"
        fill={color}
      />
      <Path
        d="M11.2795 5.85969C11.4079 5.77385 11.559 5.72803 11.7135 5.72803C11.9207 5.72803 12.1194 5.81034 12.2659 5.95685C12.4124 6.10336 12.4948 6.30208 12.4948 6.50928C12.4948 6.66379 12.4489 6.81484 12.3631 6.94332C12.2772 7.07179 12.1552 7.17193 12.0125 7.23106C11.8697 7.29019 11.7126 7.30566 11.5611 7.27552C11.4095 7.24537 11.2703 7.17097 11.1611 7.0617C11.0518 6.95244 10.9774 6.81324 10.9473 6.66169C10.9171 6.51014 10.9326 6.35306 10.9917 6.21031C11.0509 6.06755 11.151 5.94554 11.2795 5.85969Z"
        fill={color}
      />
      <Path
        d="M11.2795 5.85969C11.4079 5.77385 11.559 5.72803 11.7135 5.72803C11.9207 5.72803 12.1194 5.81034 12.2659 5.95685C12.4124 6.10336 12.4948 6.30208 12.4948 6.50928C12.4948 6.66379 12.4489 6.81484 12.3631 6.94332C12.2772 7.07179 12.1552 7.17193 12.0125 7.23106C11.8697 7.29019 11.7126 7.30566 11.5611 7.27552C11.4095 7.24537 11.2703 7.17097 11.1611 7.0617C11.0518 6.95244 10.9774 6.81324 10.9473 6.66169C10.9171 6.51014 10.9326 6.35306 10.9917 6.21031C11.0509 6.06755 11.151 5.94554 11.2795 5.85969Z"
        fill={color}
      />
    </G>
  </StyledSvg>
);

export default InfosIcon;
