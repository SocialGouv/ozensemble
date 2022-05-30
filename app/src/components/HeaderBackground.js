import React from 'react';
import styled from 'styled-components';
import { screenHeight, screenWidth } from '../styles/theme';

const HeaderBackground = () => (
  <>
    <HeaderBackgroundStyled />
    <Oblique />
  </>
);

const HeaderBackgroundStyled = styled.View`
  width: 100%;
  height: 20px;
  background: #39cec0;
`;

const obliqueHeight = Math.min(screenHeight * 0.1, 10);

const Oblique = styled.View`
  height: ${obliqueHeight}px;
  background-color: #f9f9f9;
  border-left-color: #39cec0;
  border-left-width: ${screenWidth}px;
  border-bottom-width: ${obliqueHeight}px;
  border-bottom-color: transparent;
  border-top-width: 0px;
  border-top-color: transparent;
  border-right-width: ${screenWidth}px;
  border-right-color: transparent;
`;

export default HeaderBackground;
