import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { dailyDosesSelector } from '../../recoil/consos';
import { logEvent } from '../../services/logEventsWithMatomo';
import Calendar from '../../components/Calendar';
import { View } from 'react-native';

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

const GainsCalendar = ({ isOnboarded, setShowOnboardingGainModal }) => {
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
    <Container>
      <TopTitle>
        <H1 color="#4030a5">Mon Calendrier</H1>
      </TopTitle>
      <View className="mt-7 mb-4">
        <Calendar />
      </View>
      <Legend>État de ma consommation</Legend>
      <PartDescription value={"Je n'ai pas bu"} color={'#2c864d'} />
      <PartDescription value={"J'ai bu"} color={'#de295e'} />
      <PartDescription value={'Je saisis ma consommation'} color={'transparent'} dashed />
    </Container>
  );
};

const Container = styled.View`
  padding-vertical: 20px;
`;

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
`;

const Legend = styled(TextStyled)`
  color: #4030a5;
  margin-bottom: 5px;
`;

const PartDescription = ({ color, value, dashed }) => (
  <PartContainer>
    <Dot color={color} dashed={dashed} />
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
  ${(props) => props.dashed && 'border-style: dashed;'}
  ${(props) => props.dashed && 'border-width: 1px;'}
`;

export default GainsCalendar;
