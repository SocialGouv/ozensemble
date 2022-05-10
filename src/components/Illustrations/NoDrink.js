import React from 'react';
import styled from 'styled-components';
import Svg, { Path } from 'react-native-svg';

const StyledSvg = styled(Svg)``;

const NoDrink = ({ size, ...props }) => (
    <StyledSvg width={size} height={size} viewBox="0 0 20 20" {...props}>
        <Path
            d="M19.9001 18.4801L1.5201 0.100098L0.100098 1.5101L8.3301 9.7401L9.7101 11.2901V16.2901H4.7101V18.2901H16.7101V18.1201L18.4901 19.9001L19.9001 18.4801ZM11.7101 16.2901V13.1201L14.8801 16.2901H11.7101ZM6.5401 2.2901L4.5401 0.290098H19.7101V2.2901L13.5101 9.2601L12.0901 7.8401L13.4801 6.2901H10.5401L8.5401 4.2901H15.2801L17.0601 2.2901H6.5401Z"
            fill="black"
        />

    </StyledSvg>
);

export default NoDrink;