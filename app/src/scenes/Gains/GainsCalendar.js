import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { dailyDosesSelector } from '../../recoil/consos';
import Calendar from '../../components/Calendar';
import { logEvent } from '../../services/logEventsWithMatomo';
import { View, Text } from 'react-native';
import CheckDefisValidated from '../../components/illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from '../../components/illustrations/icons/CrossDefisFailed';
import LegendStar from '../../components/illustrations/icons/LegendStar';
import LegendInfos from '../../components/illustrations/icons/LegendInfos';

/*
markedDates is an object with keys such as `2022-04-30` and values such as
{
        selected: true,
        startingDay: true,
        endingDay: true,
        color: colors.app.color,
      }

*/
const noDrinkDay = (activeMonth) => ({
  selected: true,
  startingDay: true,
  endingDay: true,
  // selectedColor: activeMonth ? '#2c864d' : '#2c864d66',
  selectedColor: '#2c864d',
  isDrinkDay: true,
  activeOpacity: 0.5,
});

const drinkDay = (activeMonth) => ({
  selected: true,
  startingDay: true,
  endingDay: true,
  // selectedColor: activeMonth ? '#de295e' : '#de295e66',
  selectedColor: '#de295e',
  isDrinkDay: true,
});

const needToFillupConso = {
  startingDay: true,
  endingDay: true,
  customStyles: {
    container: {
      borderStyle: 'dashed',
      borderWidth: 1,
    },
  },
};

const GainsCalendar = ({ isOnboarded, setShowOnboardingGainModal, setDateToScroll }) => {
  const dailyDoses = useRecoilValue(dailyDosesSelector());
  const [currentMonth, setCurrentMonth] = React.useState(dayjs().format('YYYY-MM'));
  const navigation = useNavigation();

  const markedDays = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const days = { [today]: { marked: true } };
    for (const [day, doses] of Object.entries(dailyDoses)) {
      days[day] =
        doses > 0
          ? drinkDay(dayjs(day).isSame(currentMonth, 'month'))
          : noDrinkDay(dayjs(day).isSame(currentMonth, 'month'));
      days[day] = { ...days[day], marked: day === today };
    }
    const firstTrackedDay = dayjs().startOf('week').add(-1, 'week');
    const differenceDays = dayjs().diff(firstTrackedDay, 'day');
    for (let i = 0; i < differenceDays; i++) {
      const day = dayjs(firstTrackedDay).add(i, 'day').format('YYYY-MM-DD');
      if (days[day]) continue;
      days[day] = needToFillupConso;
    }
    return days;
  }, [dailyDoses, currentMonth]);

  return (
    <View className="py-5">
      <View className="flex flex-row shrink-0">
        <H1 color="#4030a5">Mon Calendrier</H1>
      </View>
      <View>
        <Calendar
          onDayPress={(dateString) => {
            if (!isOnboarded) return setShowOnboardingGainModal(true);
            if (markedDays[dateString]?.isDrinkDay) {
              setDateToScroll(dateString);
            } else {
              const now = dayjs();
              const date = dayjs(dateString).set('hours', now.get('hours')).set('minutes', now.get('minutes'));
              navigation.push('ADD_DRINK', { timestamp: String(date) });
              logEvent({
                category: 'GAINS',
                action: 'CALENDAR_DAY_PRESS_TO_ADD_CONSO',
              });
              logEvent({
                category: 'CONSO',
                action: 'CONSO_OPEN_CONSO_ADDSCREEN',
                name: 'FROM_GAINS',
              });
            }
          }}
        />
      </View>
      <View className="flex flex-row justify-start space-x-2 mt-3">
        <View>
          <View className="flex flex-row items-center space-x-2">
            <TextStyled color={'#939EA6'}>Consommations jour</TextStyled>
            <LegendInfos />
          </View>
          <View className="flex flex-row space-x-1 items-center">
            <LegendStar />
            <Text>Pas bu</Text>
          </View>
          <PartDescription value={"Dans l'objectif"} color={'#34D39A'} />
          <PartDescription value={"Au dessus de l'objectif"} color={'#FF7878'} />
        </View>
        <View>
          <View className="flex flex-row items-center space-x-2">
            <TextStyled color={'#939EA6'}>Objectif semaine</TextStyled>
            <LegendInfos />
          </View>
          <View className="flex flex-row items-center space-x-2 my-1 ">
            <CheckDefisValidated />
            <Text>Réussi</Text>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <CrossDefisFailed />
            <Text>Dépassé</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const PartDescription = ({ color, value, dashed }) => (
  <View className="flex flex-row items-center">
    <Dot color={color} dashed={dashed} />
    <TextStyled>{value}</TextStyled>
  </View>
);

const dotSize = 20;

const dotCss = css`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: 7px;
  margin-right: 5px;
  margin-bottom: 2px;
  margin-top: 2px;
  overflow: hidden;
`;

const Dot = styled.View`
  ${dotCss}
  margin-top: ${dotSize * 0.12}px;
  margin-left: 1px
  background-color: ${({ color }) => color};
  ${(props) => props.dashed && 'border-style: dashed;'}
  ${(props) => props.dashed && 'border-width: 1px;'}
`;

export default GainsCalendar;
