import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { dailyDosesSelector, drinksState } from '../recoil/consos';

const WeeklyGain = ({ selectedMonth }) => {
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const nbDays = firstDayOfCalendar.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
  const [consosList, setConsosList] = useState();
  useFocusEffect(
    useCallback(() => {
      API.get({
        path: '/goal/list',
        query: {
          matomoId: storage.getString('@UserIdv2'),
        },
      })
        .then((res) => {
          if (res.ok) {
            setConsosList(res.data);
          }
        })
        .catch((err) => console.log('Get goals err', err));
    }, [setGoals])
  );
  console.log(consosList);
  const computeWeeklyInfos = useMemo(() => {
    let previousDay = firstDayOfCalendar;
    let sumEuros = 0;
    let sumKcal = 0;
    let weeklyInfos = [];
    for (let i = 1; i <= nbDays; ++i) {
      isDayIsSunday = i % 7 === 0;
      const formatedDay = previousDay.format('YYYY-MM-DD');
      if (isDayIsSunday) {
        weeklyInfos = [
          ...weeklyInfos,
          {
            euros: sumEuros,
            sumKcal: sumKcal,
          },
        ];
      }
      console.log('conso', consosList[formatedDay]?.price);
      sumEuros += consosList[formatedDay]?.price;
      sumKcal += consosList[formatedDay]?.kcal;
      const day = previousDay.add(1, 'day');
      previousDay = day;
    }
    console.log(weeklyInfos);
    return weeklyInfos;
  }, [firstDayOfCalendar, consosList]);

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
