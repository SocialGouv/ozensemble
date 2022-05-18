import React, { useEffect, useMemo, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { today } from '../helpers/dateHelpers';
import ButtonPrimary from './ButtonPrimary';
import GoBackButtonText from './GoBackButtonText';

/*
  onChange:
  - triggered everytime the datepicker changes date on iOS -> need state
  - triggered everytime the OK button is tapped on android -> no need state
*/

// https://github.com/react-native-community/react-native-datetimepicker/issues/114

const TimePicker = ({ visible, selectDate }) => {
  const [date, setDate] = useState(new Date(Date.now() + 60 * 1000));
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) setDate(new Date(Date.now() + 60 * 1000));
  }, [visible]);
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <ModalContent>
          <DatePickerContainer>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              display="spinner"
              maximumDate={today(1)}
              locale="fr-FR"
              onChange={(_, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
              }}
            />
            <ButtonsContainer>
              <ButtonPrimary
                content="Validez"
                onPress={() => {
                  selectDate(date);
                }}
              />
              <GoBackButtonText content="< Retour" bold onPress={() => selectDate(null)} />
            </ButtonsContainer>
          </DatePickerContainer>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <>
      {useMemo(() => {
        return (
          !!show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              display="spinner"
              maximumDate={today(1)}
              onChange={(_, selectedDate) => {
                console.log({ selectedDate });
                setShow(false);
                selectDate(selectedDate);
              }}
            />
          )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [show])}
    </>
  );
};

const Modal = styled.Modal``;

const ModalContent = styled.View`
  height: 100%;
  width: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const DatePickerContainer = styled.View`
  width: 100%;
  max-width: 320px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
  /* align-items: center; */
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-vertical: 15px;
`;

export default TimePicker;
