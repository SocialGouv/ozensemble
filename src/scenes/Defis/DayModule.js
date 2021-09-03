import React from 'react';
import styled from 'styled-components';

import TextStyled from '../../components/TextStyled';

const DayModule = ({ dayData }) => {
  return (
    <FeedDayContent>
      <TitleDay>
        {dayData?.title} : {dayData?.tagLine}
      </TitleDay>
      <DescriptionContainer>
        <TextStyled>{dayData?.description}</TextStyled>
      </DescriptionContainer>
    </FeedDayContent>
  );
};

const TitleDay = styled(TextStyled)`
  font-size: 12px;
  font-weight: bold;
  color: #de285e;
  margin-bottom: 10px;
`;

const DescriptionContainer = styled.View`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #81dbd391;
  background-color: #81dbd326;
`;

export const FeedDayContent = styled.View`
  flex-grow: 1;
  padding-horizontal: 15px;
  padding-vertical: 10px;
`;

export default DayModule;
