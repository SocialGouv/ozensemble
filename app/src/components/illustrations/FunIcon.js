import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const FunIcon = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 45 45" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22.5 0C10.0821 0 0 10.0821 0 22.5C0 34.9179 10.0821 45 22.5 45C34.9179 45 45 34.9179 45 22.5C45 10.0821 34.9179 0 22.5 0ZM12.3614 29.2919C12.2044 28.6744 12.3405 28.0193 12.7298 27.5149C13.1212 27.0126 13.7219 26.7174 14.3581 26.7174C18.3851 26.686 26.6149 26.686 30.6419 26.686C31.2886 26.686 31.8998 26.9853 32.2953 27.496C32.693 28.0067 32.8312 28.6723 32.67 29.3002C31.4791 33.8086 27.3767 37.1512 22.5 37.1512C17.6233 37.1512 13.5209 33.8086 12.3614 29.2919ZM34.1895 19.0026L30.7193 17.2674L34.1895 15.5323C34.966 15.1451 35.28 14.2012 34.8928 13.4267C34.5056 12.6502 33.5616 12.3363 32.7872 12.7235L26.5081 15.863C25.9765 16.1288 25.6395 16.673 25.6395 17.2674C25.6395 17.8619 25.9765 18.406 26.5081 18.6719L32.7872 21.8114C33.5616 22.1986 34.5056 21.8847 34.8928 21.1081C35.28 20.3337 34.966 19.3898 34.1895 19.0026ZM12.2128 21.8114L18.4919 18.6719C19.0235 18.406 19.3605 17.8619 19.3605 17.2674C19.3605 16.673 19.0235 16.1288 18.4919 15.863L12.2128 12.7235C11.4384 12.3363 10.4944 12.6502 10.1072 13.4267C9.72 14.2012 10.034 15.1451 10.8105 15.5323L14.2807 17.2674L10.8105 19.0026C10.034 19.3898 9.72 20.3337 10.1072 21.1081C10.4944 21.8847 11.4384 22.1986 12.2128 21.8114Z"
      fill="white"
    />
  </StyledSvg>
);

export default FunIcon;
