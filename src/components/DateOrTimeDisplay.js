import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { isToday, makeSureDate } from '../helpers/dateHelpers';
import ValidateIcon from './ValidateIcon';

const DateOrTimeDisplay = ({ date, onPress, mode }) => {
  if (!date) return null;
  return (
    <DatesContainer>
      {Boolean(date) && (
        <TouchableOpacity onPress={() => onPress(mode)}>
          <CurrentDateContainer>
            <ValidateIcon size={15} />
            {mode === 'date' && (
              <CurrentDate>{isToday(date) ? "Aujourd'hui" : makeSureDate(date).getLocaleDate('fr')}</CurrentDate>
            )}
            {mode === 'time' && <CurrentDate>{makeSureDate(date).getLocaleTime('fr')}</CurrentDate>}
          </CurrentDateContainer>
        </TouchableOpacity>
      )}
    </DatesContainer>
  );
};

const DatesContainer = styled.View`
  flex-direction: row;
  margin: 0px 30px 15px;
`;

const CurrentDateContainer = styled.View`
  background-color: #4030a5;
  height: 30px;
  border-radius: 30px;
  padding-horizontal: 15px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const CurrentDate = styled.Text`
  color: #f9f9f9;
`;

export default DateOrTimeDisplay;
