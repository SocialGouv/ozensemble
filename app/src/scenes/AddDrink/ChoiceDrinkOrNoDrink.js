import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import DateOrTimeDisplay from '../../components/DateOrTimeDisplay';
import H1 from '../../components/H1';
import CocktailGlassTriangle from '../../components/Illustrations/CocktailGlassTriangle';
import NoDrink from '../../components/Illustrations/NoDrink';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale, screenHeight } from '../../styles/theme';
import GoBackButtonText from '../../components/GoBackButtonText';
import DatePicker from '../../components/DatePicker';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { drinksState, modalTimestampState } from '../../recoil/consos';
import { NO_CONSO } from '../ConsoFollowUp/drinksCatalog';
import matomo from '../../services/matomo';
import { ScreenBgStyled } from '../../components/Styles/ScreenBgStyled';

const ChoiceDrinkOrNoDrink = () => {
  const setDrinksState = useSetRecoilState(drinksState);
  const [addDrinkModalTimestamp, setAddDrinkModalTimestamp] = useRecoilState(modalTimestampState);
  const navigation = useNavigation();

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
    setAddDrinkModalTimestamp(newTimestamp);
  };

  return (
    <ScreenBgStyled>
      <SafeAreaView>
        <BackButton content="< Retour" bold onPress={() => navigation.goBack()} />
        <TopContainer>
          <TopTitle>
            <H1 color="#4030a5">Mes consommations</H1>
          </TopTitle>
        </TopContainer>
        <DateAndTimeContainer>
          <DateOrTimeDisplay mode="date" date={addDrinkModalTimestamp} onPress={() => setShowDatePicker('date')} />
          <DateOrTimeDisplay mode="time" date={addDrinkModalTimestamp} onPress={() => setShowDatePicker('time')} />
        </DateAndTimeContainer>
        <Option
          icon={<NoDrink size={40} />}
          value={"Je n'ai pas bu"}
          onPress={() => {
            matomo.logConsoDrinkless();
            setDrinksState((state) => [
              ...state,
              { drinkKey: NO_CONSO, quantity: 1, timestamp: makeSureTimestamp(addDrinkModalTimestamp), id: uuidv4() },
            ]);
            navigation.goBack();
          }}
        />
        <Option
          icon={<CocktailGlassTriangle size={40} />}
          value={"J'ai bu"}
          onPress={() => {
            matomo.logConsoOpenAddScreen();
            matomo.logConsoDrink();
            navigation.replace('CONSOS_LIST');
          }}
        />
        <DatePicker
          visible={Boolean(showDatePicker)}
          mode={showDatePicker}
          initDate={addDrinkModalTimestamp}
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
      </SafeAreaView>
    </ScreenBgStyled>
  );
};

const Option = ({ icon, value, onPress }) => {
  return (
    <AskDrinkContainer>
      <ButtonTouchable onPress={onPress}>
        <Box>{icon}</Box>
      </ButtonTouchable>
      <TextStyled> {value}</TextStyled>
    </AskDrinkContainer>
  );
};

const TopContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
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
  justify-content: space-around;
  align-items: center;
`;

const ButtonTouchable = styled.TouchableOpacity``;

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
const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
`;

export default ChoiceDrinkOrNoDrink;
