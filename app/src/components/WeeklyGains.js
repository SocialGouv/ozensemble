import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { dailyDosesSelector } from '../recoil/consos';

const WeeklyGain = ({ selectedMonth }) => {
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const nbDays = firstDayOfCalendar.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
  //const drinksState = useRecoilValue(drinksState); ????? pk ça marche po
  //console.log(drinksState);
  const computeWeeklyInfos = useMemo(() => {
    let previousDay = firstDayOfCalendar;
    let sumEuros = 0;
    let sumKcal = 0;
    let weeklyInfos = [];
    for (let i = 1; i <= nbDays; ++i) {
      isDayIsSunday = i % 7 === 0;
      const formatedDay = previousDay.format('YYYY-MM-DD');
      if (isDayIsSunday) {
      }
      sumEuros += drinksState[formatedDay]?.price;
      sumKcal += drinksState[formatedDay].kcal;
      const day = previousDay.add(1, 'day');
      previousDay = day;
    }
    return weeklyInfos;
  }, [firstDayOfCalendar, dailyDoses]);

  return (
    <>
      <View className="flex flex-row mt-4">
        <Text className="flex flex-grow text-center text-sm text-[#B6C1CD]">Semaine</Text>
        <Text className="flex flex-grow text-center text-sm text-[#B6C1CD]">€ épargnés</Text>
        <Text className="flex flex-grow text-center text-sm text-[#B6C1CD]">KCAL évitées</Text>
        <Text className="flex flex-grow text-center text-sm text-[#B6C1CD]">Détails</Text>
      </View>
    </>
  );
};

export default WeeklyGain;
