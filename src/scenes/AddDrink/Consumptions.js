import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import DateOrTimeDisplay from '../../components/DateOrTimeDisplay';
import H1 from '../../components/H1';
import CocktailGlassTriangle from '../../components/Illustrations/CocktailGlassTriangle';
import NoDrink from '../../components/Illustrations/NoDrink';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';
import { withToast } from '../../services/toast';
import {
  getDrinksPerCurrentDrinksTimestamp,
  getModalTimestamp,
  updateDrink,
  updateModalTimestamp,
  setOwnDrink,
  removeOwnDrink,
  getOwnDrinks,
  setNoDrink,
} from '../ConsoFollowUp/consoDuck';
import UnderlinedButton from '../../components/UnderlinedButton';
import DatePicker from '../../components/DatePicker';
import { dateWithoutTime } from '../../helpers/dateHelpers';


const Consumptions = ({date, updateModalTimestamp}) => {

  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <ScreenBgStyled>
      <UnderlinedButton content="Retour" bold onPress={()=>navigation.goBack()} />
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Mes consommations</H1>
        </TopTitle>
      </TopContainer>
      <DateAndTimeContainer>
        <DateOrTimeDisplay mode="date" date={date} onPress={() => setShowDatePicker('date')} />
        <DateOrTimeDisplay mode="time" date={date} onPress={() => setShowDatePicker('time')} />
      </DateAndTimeContainer>
      <Option icon={<NoDrink size={40} />} value={"Je n'ai pas bu"} onPress={()=>{
        setNoDrink(dateWithoutTime(date));
        navigation.goBack();
      }}/>
      <Option icon={<CocktailGlassTriangle size={40} />} value={"J'ai bu"} onPress={()=>navigation.navigate("CONSOS_LIST")}/>
      <DatePicker
        visible={Boolean(showDatePicker)}
        mode={showDatePicker}
        initDate={date}
        selectDate={(newDate) => {
          if (newDate && showDatePicker === 'date') {
            const newDateObject = new Date(newDate);
            const oldDateObject = new Date(date);
            newDate = new Date(
              newDateObject.getFullYear(),
              newDateObject.getMonth(),
              newDateObject.getDate(),
              oldDateObject.getHours(),
              oldDateObject.getMinutes()
            );
          }
          setShowDatePicker(false);
          if (newDate) {
            updateModalTimestamp(makeSureTimestamp(newDate));
          }
        }}
      />
    </ScreenBgStyled>
  );
};

const Option = ({ icon, value,onPress}) => {
  return (
    <AskDrinkContainer>
      <ButtonTouchable onPress={onPress}>
        <Box>{icon}</Box>
      </ButtonTouchable>
      <TextStyled> {value}</TextStyled>
    </AskDrinkContainer>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const TopContainer = styled.View`
  padding: 0px 30px 0px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const DateAndTimeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonTouchable = styled.TouchableOpacity``;

const ChangeDate = styled.Text`
  text-decoration: underline;
`;

const Box = styled.View`
  border: 1px solid #de285e;
  border-radius: 5px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const AskDrinkContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${screenHeight * 0.1}px;
`;

const makeStateToProps = () => (state) => ({
  drinks: getDrinksPerCurrentDrinksTimestamp(state),
  date: getModalTimestamp(state),
  ownDrinks: getOwnDrinks(state),
});
const dispatchToProps = {
  updateDrink,
  updateModalTimestamp,
  setOwnDrink,
  removeOwnDrink,
  setNoDrink,
};
export default compose(connect(makeStateToProps, dispatchToProps), withToast) (Consumptions);
