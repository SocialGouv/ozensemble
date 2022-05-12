import React from 'react';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';

const DateDisplay = ({ day }) => (
  <>
    <WeekDay color="#4030a5">{day.getLocaleWeekDay('fr').capitalize()}</WeekDay>
    <DayAndMonth>
      {day.getDate()} {day.getLocaleMonth('fr')}
    </DayAndMonth>
  </>
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
  color: #de285e;
`;

export default DateDisplay;
