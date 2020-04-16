import React from 'react';
import styled from 'styled-components';

const HeaderBackground = () => (
  <>
    <HeaderBackgroundStyled />
    <Oblique />
  </>
);

const HeaderBackgroundStyled = styled.View`
  width: 100%;
  height: 20px;
  background: ${({ theme }) => theme.colors.headerBackground};
`;

const obliqueHeight = ({ theme }) => Math.min(theme.dimensions.screen.height * 0.1, 10);

const Oblique = styled.View`
  height: ${obliqueHeight}px;
  background-color: ${({ theme }) => theme.colors.whiteBg};
  border-left-color: ${({ theme }) => theme.colors.headerBackground};
  border-left-width: ${({ theme }) => theme.dimensions.screen.width}px;
  border-bottom-width: ${obliqueHeight}px;
  border-bottom-color: transparent;
  border-top-width: 0px;
  border-top-color: transparent;
  border-right-width: ${({ theme }) => theme.dimensions.screen.width}px;
  border-right-color: transparent;
`;

export default HeaderBackground;
