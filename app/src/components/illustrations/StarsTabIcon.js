import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const StarsTabIcon = ({ color = '#5150A2', fillOpacity = 0.25, size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 24 20" {...props}>
    <G id="Infos" fill={color} fillRule="evenodd">
      <Path
        clip-rule="evenodd"
        d="M10.6602 6.89L11.6002 10H14.4202L12.1502 11.62L13.0802 14.63L10.6602 12.79L8.24016 14.63L9.17016 11.62L6.90016 10H9.72016L10.6602 6.89ZM8.24016 8H0.660156L6.83016 12.41L4.49016 20L10.6602 15.31L16.8402 20L14.4902 12.41L20.6602 8H13.0802L10.6602 0L8.24016 8ZM21.0202 20L19.1602 13.99L23.3402 11H19.9002L16.8202 13.2L18.2802 17.92L21.0202 20ZM16.6602 6L14.8402 0L13.8002 3.45L14.5702 6H16.6602Z"
        fillOpacity={fillOpacity}
      />
    </G>
  </StyledSvg>
);

export default StarsTabIcon;
