import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { consolidatedCatalogSelector, drinksState } from '../recoil/consos';
import { previousDrinksPerWeekState } from '../recoil/gains';
import { defaultPaddingFontScale } from '../styles/theme';

const WeeklyGains = ({ selectedMonth }) => {
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const nbDays = firstDayOfCalendar.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42; // 35 days if the month run on 5 weeks, 42 if it run on 6 weeks
  const catalog = useRecoilValue(consolidatedCatalogSelector);
  const drinks = useRecoilValue(drinksState);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const myWeeklyKcalBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum + drink.quantity * (catalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.kcal || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
  const myWeeklyExpensesBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum + drink.quantity * (catalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.price || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
  const weekInfos = useMemo(() => {
    const _weekInfos = [];
    const nbWeeks = nbDays / 7;
    for (let i = 0; i < nbWeeks; i++) {
      const startDay = firstDayOfCalendar.add(i * 7, 'days').format('DD');
      const endDay = firstDayOfCalendar.add(i * 7 + 6, 'days').format('DD');
      _weekInfos[i] = {
        startDay: startDay,
        endDay: endDay,
        kcal: 0,
        euros: 0,
      };
    }
    drinks
      .filter((drink) => {
        return (
          dayjs(drink.timestamp).diff(firstDayOfCalendar, 'days') >= 0 &&
          dayjs(drink.timestamp).diff(firstDayOfCalendar.add(nbDays, 'days'), 'days') <= 0
        );
      })
      .forEach((conso) => {
        const weekNumber = dayjs(conso.timestamp).diff(firstDayOfCalendar, 'week');
        const drinkFromCatalog = catalog.find((_drink) => _drink.drinkKey === conso.drinkKey);
        _weekInfos[weekNumber].kcal += drinkFromCatalog.kcal * conso.quantity;
        _weekInfos[weekNumber].euros += drinkFromCatalog.price * conso.quantity;
      });
    return _weekInfos;
  }, [firstDayOfCalendar]);

  return (
    <View style={{ paddingHorizontal: defaultPaddingFontScale() }}>
      <View className="flex flex-row mt-4 mb-2">
        <View className=" flex flex-grow">
          <Text className="text-center text-sm text-[#B6C1CD]">Semaine</Text>
        </View>
        <View className=" flex flex-grow ">
          <Text className="flex flex-grow text-center text-sm text-[#B6C1CD]">€ épargnés</Text>
        </View>
        <View className=" flex flex-grow ">
          <Text className="flex flex-grow text-center text-sm text-[#B6C1CD]">KCAL évitées</Text>
        </View>
        <View className=" flex flex-grow ">
          <Text className="flex flex-grow text-center text-sm text-[#B6C1CD]">Détails</Text>
        </View>
      </View>
      {weekInfos.map((week) => {
        return (
          <View className="flex flex-row mb-2 bg-[#F5F6FA] rounded-lg py-1">
            <View className="flex flex-row grow items-center justify-center basis-16">
              <Text className="text-sm text-[#939EA6] font-semibold">
                {week.startDay} au {week.endDay}
              </Text>
            </View>
            <View className="flex flex-row grow justify-center items-center basis-20">
              <View
                className={[
                  'justify-center rounded-md flex flex-row my-1 py-1 mx-4 grow',
                  week.euros > myWeeklyExpensesBeforeObjective ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
                ].join(' ')}>
                <Text className="text-sm text-white font-semibold">
                  {Math.abs(week.euros - myWeeklyExpensesBeforeObjective)}€
                </Text>
              </View>
            </View>
            <View className="flex flex-row grow justify-center items-center basis-20">
              <View
                className={[
                  'justify-center rounded-md flex flex-row my-1 py-1 mx-4 grow',
                  week.kcal > myWeeklyKcalBeforeObjective ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
                ].join(' ')}>
                <Text className="text-sm text-white font-semibold">
                  {Math.abs(week.kcal - myWeeklyKcalBeforeObjective)} KCAL
                </Text>
              </View>
            </View>
            <View className="flex flex-row grow justify-center items-center">
              <TouchableOpacity className="rounded-xl bg-[#4030A5] py-1 px-2">
                <Text className="text-white text-xs font-semibold">Détails</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default WeeklyGains;
