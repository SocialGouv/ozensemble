import React from 'react';
import styled from 'styled-components';
import Svg, { Path } from 'react-native-svg';

const StyledSvg = styled(Svg)``;

const Rocket = ({ size, ...props }) => (
    <StyledSvg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path
            d="M4 11.196c-.553 0-1.053.254-1.413.657-.786.88-1.253 4.568-1.253 4.568s3.293-.522 4.08-1.403c.36-.403.587-.963.587-1.583 0-1.239-.894-2.239-2-2.239Zm.474 2.77c-.187.209-1.447.567-1.447.567s.314-1.403.507-1.62a.59.59 0 0 1 .467-.224c.366 0 .666.336.666.746a.792.792 0 0 1-.193.53Zm7.14-3.777c4.24-4.748 2.827-8.443 2.827-8.443S11.14.164 6.9 4.911l-1.66-.373c-.434-.097-.887.06-1.207.41l-2.7 3.031 3.333 1.597 2.78 3.113 1.427 3.732 2.7-3.023c.313-.35.453-.858.367-1.35l-.327-1.86ZM4.941 8.083l-1.274-.612L4.981 6l.96.216c-.38.62-.72 1.27-1 1.867Zm4.386 5.725-.546-1.426a15.676 15.676 0 0 0 1.66-1.12l.193 1.075-1.307 1.47Zm1.34-4.673c-.88.985-2.253 1.792-2.693 2.038L6.021 8.987c.213-.485.933-2.023 1.82-3.016 3.12-3.493 5.486-2.978 5.486-2.978s.46 2.65-2.66 6.143Zm-.666-.926c.733 0 1.333-.671 1.333-1.492s-.6-1.493-1.333-1.493c-.734 0-1.334.672-1.334 1.493 0 .82.6 1.492 1.334 1.492Z"
            fill="#000"
        />
    </StyledSvg>
);

export default Rocket;