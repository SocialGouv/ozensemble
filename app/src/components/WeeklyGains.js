import React, { useMemo, useState } from 'react';
import { Dimensions, PixelRatio, View, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { consolidatedCatalogObjectSelector, derivedDataFromDrinksState } from '../recoil/consos';
import { previousDrinksPerWeekState } from '../recoil/gains';
import { defaultPaddingFontScale } from '../styles/theme';
import ModalGainDetails from './ModalGainDetails';

const WeeklyGains = ({ selectedMonth }) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const nbDays = firstDayOfCalendar.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42; // 35 days if the month run on 5 weeks, 42 if it run on 6 weeks
  const catalogObject = useRecoilValue(consolidatedCatalogObjectSelector);
  const [modalContent, setModalContent] = useState(null);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const { dailyDoses, weeklyExpenses, weeklyKcals } = useRecoilValue(derivedDataFromDrinksState);
  // arbitrary choice of a medium screen size for 414. If smaller screen -> smaller font size else bigger font size
  const widthBaseScale = SCREEN_WIDTH / 414;
  const fontSize = useMemo(() => {
    const newSize = 14 * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }, [SCREEN_WIDTH]);
  const myWeeklyKcalBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) => sum + drink.quantity * (catalogObject[drink.drinkKey]?.kcal || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
  const myWeeklyExpensesBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) => sum + drink.quantity * (catalogObject[drink.drinkKey]?.price || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
  const weekInfos = useMemo(() => {
    const _weekInfos = [];
    const nbWeeks = nbDays / 7;
    for (let i = 0; i < nbWeeks; i++) {
      const startDay = firstDayOfCalendar.add(i * 7, 'days');
      const endDay = firstDayOfCalendar.add(i * 7 + 6, 'days');
      let daysWithConsos = 0;
      let day = startDay;
      for (let j = 0; j < 7; j++) {
        if (dailyDoses[day.format('YYYY-MM-DD')] >= 0) {
          daysWithConsos++;
        }
        day = day.add(1, 'day');
      }
      _weekInfos[i] = {
        startDay: startDay,
        endDay: endDay,
        isWeekCompleted: daysWithConsos === 7,
        kcals: weeklyKcals[dayjs(startDay).format('YYYY-MM-DD')],
        euros: weeklyExpenses[dayjs(startDay).format('YYYY-MM-DD')],
      };
    }
    return _weekInfos;
  }, [firstDayOfCalendar]);

  return (
    <View style={{ paddingHorizontal: defaultPaddingFontScale() }} className="py-5">
      <View className="flex flex-row mt-3 mb-2">
        <View className="flex flex-row grow justify-center basis-14">
          <Text className=" text-[#B6C1CD]" style={{ fontSize: fontSize }}>
            Semaine
          </Text>
        </View>

        <View className=" flex flex-row grow justify-center basis-16">
          <Text className=" text-[#B6C1CD]" style={{ fontSize: fontSize }}>
            € épargnés
          </Text>
        </View>
        <View className=" flex flex-row grow justify-center basis-16">
          <Text className="text-[#B6C1CD]" style={{ fontSize: fontSize }}>
            KCAL évitées
          </Text>
        </View>
        <View className=" flex flex-row grow mr-1 justify-center basis-16">
          <Text className="text-[#B6C1CD]" style={{ fontSize: fontSize }}>
            Détails
          </Text>
        </View>
      </View>
      {weekInfos.map((week) => {
        return (
          <View className="flex flex-row mb-2 bg-[#F5F6FA] rounded-lg py-1" key={week.startDay}>
            <View className="flex flex-row grow items-center justify-center basis-14">
              <Text className=" text-[#939EA6] font-semibold" style={{ fontSize: fontSize }}>
                {week.startDay.format('DD')} au {week.endDay.format('DD')}
              </Text>
            </View>
            {week.isWeekCompleted ? (
              <>
                <View className="flex flex-row grow justify-center items-center basis-16">
                  <View
                    className={[
                      'justify-center rounded-md flex flex-row my-1 py-1 mx-4 grow',
                      week.euros > myWeeklyExpensesBeforeObjective ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
                    ].join(' ')}>
                    <Text className=" text-white font-semibold" style={{ fontSize: fontSize }}>
                      {Math.round(Math.abs(week.euros - myWeeklyExpensesBeforeObjective) * 10) / 10}€
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row grow justify-center items-center basis-16">
                  <View
                    className={[
                      'justify-center rounded-md flex flex-row my-1 py-1 mx-1 grow',
                      week.kcals > myWeeklyKcalBeforeObjective ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
                    ].join(' ')}>
                    <Text className="text-white font-semibold" style={{ fontSize: fontSize }}>
                      {Math.round(Math.abs(week.kcals - myWeeklyKcalBeforeObjective))} KCAL
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View className="flex flex-row grow justify-center items-center basis-16">
                  <View className={'justify-center rounded-md flex flex-row my-1 py-1 mx-4 grow bg-[#939EA6]'}>
                    <Text className=" text-white font-semibold" style={{ fontSize: fontSize }}>
                      - €
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row grow justify-center items-center basis-16">
                  <View className={'justify-center rounded-md flex flex-row my-1 py-1 mx-1 grow bg-[#939EA6]'}>
                    <Text className=" text-white font-semibold" style={{ fontSize: fontSize }}>
                      - KCAL
                    </Text>
                  </View>
                </View>
              </>
            )}

            <View className="flex flex-row grow justify-center items-center basis-16">
              <TouchableOpacity
                className="bg-[#4030A5] rounded-full py-1 px-2"
                onPress={() => {
                  setModalContent({
                    weekKcal: week.kcals,
                    estimationKcal: myWeeklyKcalBeforeObjective,
                    weekExpenses: week.euros,
                    estimationExpenses: myWeeklyExpensesBeforeObjective,
                    firstDay: week.startDay.format('DD MMMM'),
                    lastDay: week.endDay.format('DD MMMM'),
                    isWeekCompleted: week.isWeekCompleted,
                  });
                }}>
                <Text className="text-white font-semibold" style={{ fontSize: fontSize }}>
                  Détails
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <ModalGainDetails content={modalContent} onClose={() => setModalContent(null)} />
    </View>
  );
};

export default WeeklyGains;
