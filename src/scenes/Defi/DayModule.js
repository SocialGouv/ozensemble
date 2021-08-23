import React from 'react';
import styled from 'styled-components';

import TextStyled from '../../components/TextStyled';
import { ScreenBgStyled, TopContainer, Title, FeedDay, FeedContainer, FeedDayContent } from './styles';
import { getTitle, getTagline, getDescription } from './utils';

export default ({ day }) => {
  return (
    <FeedDayContent>
      <TitleDay>
        {getTitle(day)} : {getTagline(day)}
      </TitleDay>
      <DescriptionContainer>{getDescription(day)}</DescriptionContainer>
    </FeedDayContent>
  );
};

const TitleDay = styled(TextStyled)`
  font-size: 12px;
  font-weight: bold;
  color: #de285e;
  margin-bottom: 5px;
`;

const DescriptionContainer = styled.View`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #81dbd391;
  background-color: #81dbd326;
`;
