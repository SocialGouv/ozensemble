import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { getDailyDoses, setModalTimestamp } from '../ConsoFollowUp/consoDuck';
import { maxDrinksPerWeekSelector } from './recoil';
import { dateWithoutTime } from '../../helpers/dateHelpers';
import { StackActions } from '@react-navigation/native';


/*
markedDates is an object with keys such as `2022-04-30` and values such as
{
        selected: true,
        startingDay: true,
        endingDay: true,
        color: colors.app.color,
      }

*/
const noDrinkDay = {
  selected: true,
  startingDay: true,
  endingDay: true,
  selectedColor: 'green',
};

const drinkDay = {
  selected: true,
  startingDay: true,
  endingDay: true,
  selectedColor: 'red',
};

const GainsCalendar = ({ isOnboarded, dailyDoses, setModalTimestamp }) => {
  // const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const navigation = useNavigation();
  const markedDays = useMemo(() => {
    const todayFormatted = dayjs().format('YYYY-MM-DD');
    const days = {};
    for (const [day, doses] of Object.entries(dailyDoses)) {
      const dayFormatted = dayjs(day).format('YYYY-MM-DD');
      days[dayFormatted] = doses > 0 ? drinkDay : noDrinkDay;
      days[dayFormatted] = { ...days[dayFormatted], marked: dayFormatted === todayFormatted };
    }
    return days;
  }, [dailyDoses]);

  return (
    <TopContainer>
      <TopTitle>
        <H1 color="#4030a5">Mon Calendrier</H1>
      </TopTitle>
      <CalendarContainer>
        <Calendar
          // Initially visible month. Default = now
          key={3}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            arrowColor: '#4130a5',
            'stylesheet.day.basic': {
              today: {
                borderColor: '#4130a5',
                borderWidth: 1,
                borderRadius: 20,
                color: '#000',
              },
            },
            'stylesheet.day.period': {
              todayText: {
                // borderColor: '#4130a5',
                // borderWidth: 1,
                // borderRadius: 20,
                color: '#000',
              },
            },
          }}
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled
          showScrollIndicator
          hideExtraDays={false}
          // showWeekNumbers
          showSixWeeks
          enableSwipeMonths
          firstDay={1}
          markedDates={JSON.parse(JSON.stringify(markedDays))}
          markingType="dot"
          onDayPress={({ dateString }) => {
            setModalTimestamp(dateWithoutTime(dateString));
            navigation.dispatch(StackActions.push('ADD_DRINK', { screen: 'CONSUMPTIONS' }));
          }}
        />
      </CalendarContainer>
      <TextStyled color="#4030a5">État de ma consommation</TextStyled>
      <PartDescription value={"Je n'ai pas bu"} color={'#008001'} />
      <PartDescription value={"J'ai bu"} color={'#DE285E'} />
      {!isOnboarded && (
        <>
          <TextStyled color="#4030a5">Total verres par semaine</TextStyled>
          <PartDescription value={"J'ai respecté mon objectif"} color={'#02594C'} />
          <PartDescription value={"Je n'ai pas respecté mon objectif"} color={'#960031'} />
        </>
      )}
    </TopContainer>
  );
};

const TopContainer = styled.View`
  padding: 20px 30px 0px;
`;

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
`;

const PartDescription = ({ color, value }) => (
  <PartContainer>
    <Dot color={color} />
    <TextStyled>{value}</TextStyled>
  </PartContainer>
);

const PartContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const dotSize = 30;

const dotCss = css`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: ${dotSize}px;
  margin-right: 20px;
  margin-bottom: 2px;
  margin-top: 2px;
  overflow: hidden;
`;

const Dot = styled.View`
  ${dotCss}
  margin-top: ${dotSize * 0.12}px;
  background-color: ${({ color }) => color};
`;

const CalendarContainer = styled.View`
  margin-vertical: 15px;
`;

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const makeStateToProps = () => (state) => ({
  // days: getDaysForDiagram(state),
  // thereIsDrinks: checkIfThereIsDrinks(state),
  dailyDoses: getDailyDoses(state),
  // highestDailyDose: getHighestDailyDoses(state),
});

const dispatchToProps = {
  setModalTimestamp,
};

export default connect(makeStateToProps, dispatchToProps)(GainsCalendar);
