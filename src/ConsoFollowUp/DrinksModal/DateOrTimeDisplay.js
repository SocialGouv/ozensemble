/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import { isToday, makeSureDate } from '../../helpers/dateHelpers';
import ValidateIcon from '../../components/ValidateIcon';
import { TouchableOpacity } from 'react-native';

const DateOrTimeDisplay = ({ date, onPress, mode }) => {
  if (!date) return null;
  return (
    <DatesContainer>
      {Boolean(date) && (
        <TouchableOpacity onPress={() => onPress(mode)}>
          <CurrentDateContainer>
            <ValidateIcon size={15} />
            {mode === 'date' && (
              <CurrentDate>
                {isToday(date) ? 'Aujourd\'hui' : makeSureDate(date).getLocaleDate('fr')}
              </CurrentDate>
            )}
            {mode === 'time' && (
              <CurrentDate>
                {makeSureDate(date).getLocaleTime('fr')}
              </CurrentDate>
            )}
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
  background-color: ${({ theme }) => theme.colors.title};
  height: 30px;
  border-radius: 30px;
  padding-horizontal: 15px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const CurrentDate = styled.Text`
  color: ${({ theme }) => theme.colors.whiteBg};
`;

export default DateOrTimeDisplay;
