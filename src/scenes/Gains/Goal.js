import React from 'react';

import H1 from '../../components/H1';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';


const Goal = () => {
  return (
    <ScreenBgStyled>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Se fixer un objectif</H1>
        </TopTitle>
      </TopContainer>
    </ScreenBgStyled>
  )
}

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const TopContainer = styled.View`
  padding: 20px 30px 0px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;


export default Goal