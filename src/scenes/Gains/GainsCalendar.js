import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styled, { css } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { dailyDosesSelector, modalTimestampState } from '../../recoil/consos';

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
  selectedColor: '#008001',
  isNoDrinkDay: true,
};

const drinkDay = {
  selected: true,
  startingDay: true,
  endingDay: true,
  selectedColor: '#DE285E',
  isDrinkDay: true,
};

const GainsCalendar = ({ isOnboarded, setShowOnboardingGainModal }) => {
  const dailyDoses = useRecoilValue(dailyDosesSelector());
  const setModalTimestamp = useSetRecoilState(modalTimestampState);

  const navigation = useNavigation();
  const markedDays = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const days = { [today]: { marked: true } };
    for (const [day, doses] of Object.entries(dailyDoses)) {
      days[day] = doses > 0 ? drinkDay : noDrinkDay;
      days[day] = { ...days[day], marked: day === today };
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
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            arrowColor: '#4130a5',
            todayTextColor: '#000000',
            todayDotColor: '#000000',
          }}
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled
          showScrollIndicator
          hideExtraDays={false}
          showSixWeeks
          enableSwipeMonths
          firstDay={1}
          minDate="2022-01-01"
          maxDate={dayjs().format('YYYY-MM-DD')}
          markedDates={JSON.parse(JSON.stringify(markedDays))}
          markingType="dot"
          disableAllTouchEventsForDisabledDays
          onDayPress={({ dateString }) => {
            if (!isOnboarded) return setShowOnboardingGainModal(true);
            if (markedDays[dateString]?.isDrinkDay) {
              navigation.navigate('CONSO_FOLLOW_UP', { scrollToDay: dateString });
            } else {
              const now = dayjs();
              const date = dayjs(dateString).set('hours', now.get('hours')).set('minutes', now.get('minutes'));
              setModalTimestamp(new Date(date).getTime());
              navigation.push('ADD_DRINK');
            }
          }}
        />
      </CalendarContainer>
      <Legend>État de ma consommation</Legend>
      <PartDescription value={"Je n'ai pas bu"} color={'#008001'} />
      <PartDescription value={"J'ai bu"} color={'#DE285E'} />
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

const Legend = styled(TextStyled)`
  color: #4030a5;
  margin-bottom: 5px;
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

export default GainsCalendar;
