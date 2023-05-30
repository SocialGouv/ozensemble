import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import API from '../services/api';
import { storage } from '../services/storage';

const WeeklyGain = ({ selectedMonth }) => {
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const nbDays = firstDayOfCalendar.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
  //const [consosList, setConsosList] = useState([]);

  // const getConsoList = async () => {
  //   const matomoId = storage.getString('@UserIdv2');
  //   const response = await API.post({
  //     path: '/consommation/get-conso-list',
  //     body: {
  //       matomoId: matomoId,
  //       startingDay: firstDayOfMonth,
  //       endingDay: firstDayOfCalendar.add(nbDays, 'days'),
  //     },
  //   });
  //   console.log('response', response);
  //   return response.data;
  // };

  const consosList = useMemo(async () => {
    const matomoId = storage.getString('@UserIdv2');
    const response = await API.post({
      path: '/consommation/get-conso-list',
      body: {
        matomoId: matomoId,
        startingDay: firstDayOfMonth,
        endingDay: firstDayOfCalendar.add(nbDays, 'days'),
      },
    });
    console.log('response', response.data);
    const consos = response.data;
    console.log(consos);
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
      console.log('conso', consos[formatedDay]?.price);
      sumEuros += Number(consos[formatedDay]?.(price));
      sumKcal += Number(consos[formatedDay]?.kcal);
      const day = previousDay.add(1, 'day');
      previousDay = day;
    }
    console.log(weeklyInfos);
    return weeklyInfos;
  }, [firstDayOfCalendar]);

  console.log('consosList', consosList);
  // const computeWeeklyInfos = useMemo(() => {
  //   let previousDay = firstDayOfCalendar;
  //   let sumEuros = 0;
  //   let sumKcal = 0;
  //   let weeklyInfos = [];
  //   for (let i = 1; i <= nbDays; ++i) {
  //     isDayIsSunday = i % 7 === 0;
  //     const formatedDay = previousDay.format('YYYY-MM-DD');
  //     if (isDayIsSunday) {
  //       weeklyInfos = [
  //         ...weeklyInfos,
  //         {
  //           euros: sumEuros,
  //           sumKcal: sumKcal,
  //         },
  //       ];
  //     }
  //     console.log('conso', consosList[formatedDay]?.price);
  //     sumEuros += consosList[formatedDay]?.price;
  //     sumKcal += consosList[formatedDay]?.kcal;
  //     const day = previousDay.add(1, 'day');
  //     previousDay = day;
  //   }
  //   console.log(weeklyInfos);
  //   return weeklyInfos;
  // }, [firstDayOfCalendar, consosList]);

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
