import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { today } from '../helpers/dateHelpers';
import ButtonPrimary from './ButtonPrimary';
import UnderlinedButton from './UnderlinedButton';

/*
  onChange:
  - triggered everytime the datepicker changes date on iOS -> need state
  - triggered everytime the OK button is tapped on android -> no need state
*/

// https://github.com/react-native-community/react-native-datetimepicker/issues/114

const DatePicker = ({ visible, selectDate, initDate, mode }) => {
  const [date, setDate] = useState(new Date(initDate));
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <ModalBackdropContent>
          <ModalContent>
            <DatePickerContainer>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="spinner"
                maximumDate={today(1, true)}
                locale="fr-FR"
                onChange={(_, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
              />
            </DatePickerContainer>
            <ButtonsContainer>
              <ButtonPrimary
                content="Validez"
                onPress={() => {
                  selectDate(Date.parse(date));
                }}
              />
              <UnderlinedButton content="Retour" bold onPress={() => selectDate(initDate)} />
            </ButtonsContainer>
          </ModalContent>
        </ModalBackdropContent>
      </Modal>
    );
  }

  if (!visible) {
    return null;
  }

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      display="spinner"
      is24Hour
      maximumDate={today(1, true)}
      onChange={(_, selectedDate) => {
        const currentDate = selectedDate || date;
        selectDate(Date.parse(currentDate));
      }}
    />
  );
};

const Modal = styled.Modal``;

const ModalBackdropContent = styled.View`
  height: 100%;
  width: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: 100%;
  max-width: 320px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
`;

const DatePickerContainer = styled.View`
  width: 100%;
  max-width: 320px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-vertical: 15px;
`;

export default DatePicker;
