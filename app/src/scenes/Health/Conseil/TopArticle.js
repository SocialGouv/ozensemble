import React from 'react';
import styled from 'styled-components';
import { TopContainer, TopTitle } from '../styles';
import Clock from '../../../components/Illustrations/Clock';
import TextStyled from '../../../components/TextStyled';

const TopArticle = ({ title, timeReading }) => (
  <>
    <TopContainer>
      <TopTitle>
        <TextStyled color="#4030a5">{title}</TextStyled>
      </TopTitle>
      <ReadTimeContainer>
        <Clock size={20} />
        <ReadTimeText>
          <TextStyled>Lecture: {timeReading} min </TextStyled>
        </ReadTimeText>
      </ReadTimeContainer>
    </TopContainer>
  </>
);

const ReadTimeContainer = styled.View`
  flex-direction: row;
`;

const ReadTimeText = styled.Text`
  font-size: 10px;
`;

export default TopArticle;
