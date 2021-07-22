import React from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonPrimary from '../components/ButtonPrimary';
import { today } from '../helpers/dateHelpers';
import UnderlinedButton from '../components/UnderlinedButton';

/*
  onChange:
  - triggered everytime the datepicker changes date on iOS -> need state
  - triggered everytime the OK button is tapped on android -> no need state
*/

// https://github.com/react-native-community/react-native-datetimepicker/issues/114

const TimePicker = ({ visible, selectDate }) => {
  const [date, setDate] = React.useState(new Date(Date.now() + 60 * 1000));
  React.useEffect(() => {
    if (visible) setDate(new Date(Date.now() + 60 * 1000));
  }, [visible]);
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <ModalContent>
          <DatePickerContainer>
            <DateTimePickerStyled
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
              <UnderlinedButton content="Retour" bold onPress={() => selectDate(null)} />
            </ButtonsContainer>
          </DatePickerContainer>
        </ModalContent>
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
      mode="time"
      display="spinner"
      maximumDate={today(1)}
      onChange={(_, selectedDate) => {
        selectDate(selectedDate);
      }}
    />
  );
};

const Modal = styled.Modal``;

const ModalContent = styled.View`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const DatePickerContainer = styled.View`
  width: 80%;
  max-width: 320px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
  /* align-items: center; */
`;

const DateTimePickerStyled = styled(DateTimePicker)`
  width: 100%;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 15px;
`;

export default TimePicker;
