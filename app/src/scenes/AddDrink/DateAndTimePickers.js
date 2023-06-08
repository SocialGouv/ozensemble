import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import DateOrTimeDisplay from '../../components/DateOrTimeDisplay';
import DatePicker from '../../components/DatePicker';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { drinksState } from '../../recoil/consos';

const DateAndTimePickers = ({ addDrinkModalTimestamp, setDrinkModalTimestamp }) => {
  const setDrinksState = useSetRecoilState(drinksState);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateModalTimestamp = (newTimestamp) => {
    const oldTimestamp = addDrinkModalTimestamp;
    setDrinksState((drinks) =>
      drinks.map((drink) => {
        if (drink.timestamp === oldTimestamp) {
          return {
            ...drink,
            timestamp: newTimestamp,
          };
        }
        return drink;
      })
    );
    setDrinkModalTimestamp(newTimestamp);
  };

  return (
    <>
      <DateAndTimeContainer>
        <DateOrTimeDisplay mode="date" date={addDrinkModalTimestamp} onPress={() => setShowDatePicker('date')} />
        <DateOrTimeDisplay mode="time" date={addDrinkModalTimestamp} onPress={() => setShowDatePicker('time')} />
      </DateAndTimeContainer>
      <DatePicker
        visible={Boolean(showDatePicker)}
        mode={showDatePicker}
        initDate={addDrinkModalTimestamp}
        key={addDrinkModalTimestamp}
        selectDate={(newDate) => {
          if (newDate && showDatePicker === 'date') {
            const newDateObject = new Date(newDate);
            const oldDateObject = new Date(addDrinkModalTimestamp);
            newDate = new Date(
              newDateObject.getFullYear(),
              newDateObject.getMonth(),
              newDateObject.getDate(),
              oldDateObject.getHours(),
              oldDateObject.getMinutes()
            );
          }
          setShowDatePicker(false);
          if (newDate) updateModalTimestamp(makeSureTimestamp(newDate));
        }}
      />
    </>
  );
};

const DateAndTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
`;

export default DateAndTimePickers;
