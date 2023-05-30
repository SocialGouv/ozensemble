import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import API from '../services/api';
import { storage } from '../services/storage';
import dayjs from 'dayjs';

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
        startingDate: firstDayOfMonth,
        endingDate: firstDayOfCalendar.add(nbDays, 'days'),
      },
    });
    const consos = response.data;
    let previousDay = firstDayOfCalendar;
    let sumEuros = 0;
    let sumKcal = 0;
    let weeklyInfos = {
      1: { kcal: 0, euros: 0 },
      2: { kcal: 0, euros: 0 },
      3: { kcal: 0, euros: 0 },
      4: { kcal: 0, euros: 0 },
      5: { kcal: 0, euros: 0 },
    };
    consos.map((conso) => {
      console.log(dayjs(conso.date).format('YYYY-MM-DD'));
      const weekNumber = Math.abs(firstDayOfCalendar.diff(dayjs(conso.date).format('YYYY-MM-DD'), 'week'));
      weeklyInfos[weekNumber].kcal += conso.kcal;
      weeklyInfos[weekNumber].euros += conso.price;
    });
    return weeklyInfos;
  }, [firstDayOfCalendar]);

  console.log('consosList', consosList[1]);

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
