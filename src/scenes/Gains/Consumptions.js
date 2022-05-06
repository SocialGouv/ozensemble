import React from 'react';

import H1 from '../../components/H1';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import DateOrTimeDisplay from '../../components/DateOrTimeDisplay';

import { screenHeight } from '../../styles/theme';
import CocktailGlassTriangle from '../../components/Illustrations/CocktailGlassTriangle';
import NoDrink from '../../components/Illustrations/NoDrink';

const Consumptions = () => {

  const date = 1651849680000
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Mes consommations</H1>
        </TopTitle>
      </TopContainer>
      <DateAndTimeContainer>
        <DateOrTimeDisplay mode="date" date={date} onPress={() => setShowDatePicker('date')} />
        <ButtonTouchable>
          <ChangeDate>
            <TextStyled color="#4030a5"> Choisir une autre date</TextStyled>
          </ChangeDate>
        </ButtonTouchable>
      </DateAndTimeContainer>
      <Option icon={<NoDrink size={40} />} value={"Je n'ai pas bu"} />
      <Option icon={<CocktailGlassTriangle size={40} />} value={"J'ai bu"} />
    </ScreenBgStyled>
  )
}

const Option = ({ icon, value }) => {

  return (

    <AskDrinkContainer>
      <ButtonTouchable>
        <Box>{icon}</Box>
      </ButtonTouchable>
      <TextStyled> {value}</TextStyled>
    </AskDrinkContainer>
  )
}

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

const ButtonTouchable = styled.TouchableOpacity`
`;

const ChangeDate = styled.Text`
  text-decoration: underline;
`;

const Box = styled.View`
  border: 1px solid #DE285E;
  border-radius: 5px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const AskDrinkContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${screenHeight * 0.1}
`;

export default Consumptions