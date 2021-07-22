import React from 'react';
import styled, { css } from 'styled-components';
import { mediaHeight } from '../../styles/mediaQueries';

const DrinksHeader = ({ content }) => (
  <HeaderWrapper>
    <Line />
    <HeaderContainer>
      <ContentStyled>{content}</ContentStyled>
    </HeaderContainer>
    <Line />
  </HeaderWrapper>
);

const height = 35;
const HeaderWrapper = styled.View`
  margin-top: ${height / 2}px;
  margin-bottom: -${height / 2}px;
  z-index: 1000;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Line = styled.View`
  background-color: #de285e;
  flex-grow: 1;
  height: 1px;
`;

const HeaderContainer = styled.View`
  height: ${height}px;
  border-radius: ${height}px;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  padding-horizontal: 10px;
`;

const bigContent = css`
  font-size: 20px;
`;

const mediumContent = css`
  font-size: 18px;
`;

const smallContent = css`
  font-size: 15px;
`;

const ContentStyled = styled.Text`
  color: ${({ color }) => color || '#de285e'};
  font-weight: bold;
  flex-grow: 0;
  ${bigContent}
  ${mediaHeight.medium`${mediumContent}`}
  ${mediaHeight.small`${smallContent}`}
`;

export default DrinksHeader;
