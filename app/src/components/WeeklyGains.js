import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { consolidatedCatalogSelector, drinksState } from '../recoil/consos';
import { previousDrinksPerWeekState } from '../recoil/gains';

const WeeklyGains = ({ selectedMonth }) => {
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const nbDays = firstDayOfCalendar.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
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
    let weeklyInfos = [];
    for (let i = 0; i < nbDays; i += 7) {
      const startDay = firstDayOfCalendar.add(i, 'days').format('DD');
      const endDay = firstDayOfCalendar.add(i + 6, 'days').format('DD');
      weeklyInfos[i / 7] = {
        startDay: startDay,
        endDay: endDay,
        kcal: 0,
        euros: 0,
      };
    }
    const montlyConsos = drinks.filter(
      (drink) =>
        dayjs(drink.timestamp).diff(firstDayOfCalendar, 'days') >= 0 &&
        dayjs(drink.timestamp).diff(firstDayOfCalendar.add(nbDays, 'days'), 'days') <= 0
    );
    montlyConsos.map((conso) => {
      const weekNumber = dayjs(conso.timestamp).diff(firstDayOfCalendar, 'week');
      const drinkFromCatalog = catalog.find((_drink) => _drink.drinkKey === conso.drinkKey);

      weeklyInfos[weekNumber].kcal += drinkFromCatalog.kcal;
      weeklyInfos[weekNumber].euros += drinkFromCatalog.price;
    });
    return weeklyInfos;
  }, [firstDayOfCalendar]);

  return (
    <>
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
            {week.euros > myWeeklyExpensesBeforeObjective ? (
              <View className="flex flex-row grow justify-center items-center basis-20">
                <View className="bg-[#FF7979] justify-center rounded-md flex flex-row my-1 py-1 mx-4 grow">
                  <Text className="text-sm text-white font-semibold">
                    {Math.abs(week.euros - myWeeklyExpensesBeforeObjective)}€
                  </Text>
                </View>
              </View>
            ) : (
              <View className="flex flex-row grow justify-center items-center basis-20">
                <View className="bg-[#3AD39D] justify-center rounded-md flex flex-row my-1 py-1 mx-4 grow">
                  <Text className="text-sm text-white font-semibold">
                    {Math.abs(week.euros - myWeeklyExpensesBeforeObjective)}€
                  </Text>
                </View>
              </View>
            )}
            {week.kcal > myWeeklyKcalBeforeObjective ? (
              <View className="flex flex-row grow justify-center items-center basis-24">
                <View className="bg-[#FF7979] justify-center rounded-md flex flex-row my-1 mx-2 py-1 grow">
                  <Text className="text-sm text-white font-semibold">
                    {Math.abs(week.kcal - myWeeklyKcalBeforeObjective)} KCAL
                  </Text>
                </View>
              </View>
            ) : (
              <View className="flex flex-row grow justify-center items-center basis-24">
                <View className="bg-[#3AD39D] justify-center rounded-md flex flex-row my-1 mx-2 py-1 grow">
                  <Text className="text-sm text-white font-semibold">
                    {Math.abs(week.kcal - myWeeklyKcalBeforeObjective)} KCAL
                  </Text>
                </View>
              </View>
            )}
            <View className="flex flex-row grow justify-center items-center">
              <TouchableOpacity className="rounded-xl bg-[#4030A5] py-1 px-2">
                <Text className="text-white text-xs font-semibold">Détails</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default WeeklyGains;
