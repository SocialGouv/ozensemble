import React from 'react';
import styled from 'styled-components';
import { defaultPadding, screenWidth } from '../styles/theme';

const ScreenBgStyled = styled.View`
  background-color: #f9f9f9;
  padding-horizontal: ${defaultPadding}px;
  padding-top: ${defaultPadding / 2}px;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  width: ${screenWidth}px;
  max-width: ${screenWidth}px;
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;

export default ScreenBgStyled;
