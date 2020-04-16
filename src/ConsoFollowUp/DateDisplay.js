import React from 'react';
import styled from 'styled-components';
import TextStyled from '../components/TextStyled';

const DateDisplay = ({ day }) => (
  <React.Fragment>
    <WeekDay type="title">{day.getLocaleWeekDay('fr').capitalize()}</WeekDay>
    <DayAndMonth type="buttonPrimary">
      {day.getDate()} {day.getLocaleMonth('fr')}
    </DayAndMonth>
  </React.Fragment>
);

const WeekDay = styled(TextStyled)`
  font-weight: bold;
`;

const DayAndMonth = styled(TextStyled)`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 11px;
  margin-top: 2px;
  margin-bottom: 20px;
`;

export default DateDisplay;
