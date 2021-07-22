import React from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import ButtonPrimary from '../components/ButtonPrimary';
import { today } from '../helpers/dateHelpers';
import UnderlinedButton from '../components/UnderlinedButton';
import { getModalTimestamp } from '../ConsoFollowUp/consoDuck';

/*
  onChange:
  - triggered everytime the datepicker changes date on iOS -> need state
  - triggered everytime the OK button is tapped on android -> no need state
*/

// https://github.com/react-native-community/react-native-datetimepicker/issues/114

const DatePicker = ({ visible, selectDate, initDate, mode }) => {
  const [date, setDate] = React.useState(new Date(initDate));
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <ModalContent>
          <DatePickerContainer>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              maximumDate={today(1, true)}
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
                  selectDate(Date.parse(date));
                }}
              />
              <UnderlinedButton content="Retour" bold onPress={() => selectDate(initDate)} />
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
      value={initDate}
      mode={mode}
      display="spinner"
      maximumDate={today(1, true)}
      onChange={(_, selectedDate) => {
        const currentDate = selectedDate || initDate;
        selectDate(Date.parse(currentDate));
      }}
    />
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

const makeStateToProps = () => (state) => ({
  initDate: getModalTimestamp(state),
});

export default connect(makeStateToProps)(DatePicker);
