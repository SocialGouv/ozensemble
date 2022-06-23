import styled from 'styled-components';
import React from 'react';
import TextStyled from '../../components/TextStyled';

const DayModule = ({ dayData, activeDayIsDone }) => {
  return (
    <FeedDayContent>
      <TitleDay>
        {dayData?.title} : {dayData?.tagLine}
      </TitleDay>
      <DescriptionContainer>
        <TextStyled>
          {activeDayIsDone ? dayData?.descriptionDone || dayData?.description : dayData?.description}
        </TextStyled>
      </DescriptionContainer>
    </FeedDayContent>
  );
};

const TitleDay = styled(TextStyled)`
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
  margin-vertical: 10px;
  margin-horizontal: 5px;
`;

export default DayModule;
