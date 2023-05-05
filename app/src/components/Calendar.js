import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { useRecoilValue } from 'recoil';
import { dailyDosesSelector } from '../recoil/consos';
import { totalDrinksByDrinkingDaySelector, daysWithGoalNoDrinkState, maxDrinksPerWeekSelector } from '../recoil/gains';
import API from '../services/api';
import { storage } from '../services/storage';
import { hitSlop } from '../styles/theme';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import CheckDefisValidated from './illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from './illustrations/icons/CrossDefisFailed';
import LegendStar from './illustrations/icons/LegendStar';
import ModalGoal from './ModalGoal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Calendar = ({ onDayPress }) => {
  const cols = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.', 'Obj.'];
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const dailyDoses = useRecoilValue(dailyDosesSelector());
  const maxDosesByDrinkingDay = useRecoilValue(totalDrinksByDrinkingDaySelector);
  const daysWithNoDrinkGoal = useRecoilValue(daysWithGoalNoDrinkState);
  const maxDosesPerWeek = useRecoilValue(maxDrinksPerWeekSelector);
  const [modalContent, setModalContent] = useState(null);
  const nbDays = firstDayOfCalendar.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
  const [goals, setGoals] = useState([
    {
      date: dayjs(),
      dosesByDrinkingDay: maxDosesByDrinkingDay,
      dosesPerWeek: maxDosesPerWeek,
      daysWithGoalNoDrink: daysWithNoDrinkGoal,
    },
  ]);
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
            setGoals(res.data);
          }
        })
        .catch((err) => console.log('Get goals err', err));
    }, [setGoals])
  );

  const computeGoalSuccess = (day) => {
    const goalRegistered = goals[0]?.dosesPerWeek;
    let searchedDay = day.subtract(6, 'day');
    const goal = goals?.find((goal) => goal.date === searchedDay.format('YYYY-MM-DD'));
    let sumDoses = 0;
    let drinkingDay = 0;
    let nbDaysRegistered = 0;
    for (let i = 0; i < 7; ++i) {
      const formatedDay = searchedDay.format('YYYY-MM-DD');
      sumDoses += dailyDoses[formatedDay];
      if (dailyDoses[formatedDay] > 0) {
        drinkingDay++;
      }
      if (dailyDoses[formatedDay] >= 0) {
        nbDaysRegistered++;
      }
      searchedDay = searchedDay.add(1, 'day');
    }
    if (nbDaysRegistered < 7) {
      return 'MissCompletedDays';
    }
    if (!goalRegistered) {
      return {
        status: 'NoGoal',
        consommationMessage:
          'Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine',
        consosWeek: sumDoses,
      };
    }
    const checkedGoal = goal ? goal : goals[0];
    if (sumDoses <= checkedGoal.dosesPerWeek && drinkingDay <= 7 - checkedGoal.daysWithGoalNoDrink.length) {
      const consommationMessage = 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.';
      const drinkingDayMessage = 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.';
      return {
        status: 'Success',
        consommationMessage: consommationMessage,
        drinkingDayMessage: drinkingDayMessage,
        consosWeekGoal: checkedGoal.dosesPerWeek,
        consosWeek: sumDoses,
        drinkingDaysGoal: 7 - checkedGoal.daysWithGoalNoDrink.length,
        drinkingDays: drinkingDay,
      };
    }
    const consommationMessage =
      sumDoses > checkedGoal.dosesPerWeek
        ? 'Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.'
        : 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.';

    const drinkingDayMessage =
      drinkingDay > 7 - checkedGoal.daysWithGoalNoDrink.length
        ? 'Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.'
        : 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.';
    return {
      status: 'Fail',
      consommationMessage: consommationMessage,
      drinkingDayMessage: drinkingDayMessage,
      consosWeekGoal: checkedGoal.dosesPerWeek,
      consosWeek: sumDoses,
      drinkingDaysGoal: 7 - checkedGoal.daysWithGoalNoDrink.length,
      drinkingDays: drinkingDay,
    };
  };

  const computeStyleWithDrinks = (day) => {
    const formatedDay = day.format('YYYY-MM-DD');
    const doses = dailyDoses[formatedDay];

    // If there is doses for the day
    if (doses >= 0) {
      // If there is a goal registered
      if (daysWithNoDrinkGoal.length !== 0) {
        //there is a goal and doses > to the daily goal
        if (doses > maxDosesByDrinkingDay) {
          return {
            borderStyle: 'solid',
            borderColor: '#FC8383',
            backgroundColor: '#FC8383',
            textColor: '#fff',
            isStar: false,
          };
        }
        //there is a goal and the doses are like 0 < doses < daily goal
        if (doses > 0) {
          return {
            borderStyle: 'solid',
            borderColor: '#34D39A',
            backgroundColor: '#34D39A',
            textColor: '#fff',
            isStar: false,
          };
        }
        //there is a goal and the doses are 0
        else {
          return {
            borderStyle: 'solid',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            textColor: '#fff',
            isStar: true,
          };
        }
      }
      // if there is no goal registered
      else {
        // if there is no goal and no doses
        if (doses > 0) {
          return {
            borderStyle: 'solid',
            borderColor: '#FC8383',
            backgroundColor: '#FC8383',
            textColor: '#fff',
            isStar: false,
          };
        } // if there is no goal and doses
        else {
          return {
            borderStyle: 'solid',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            textColor: '#fff',
            isStar: true,
          };
        }
      }
    } else {
      return { borderStyle: 'dashed', borderColor: '#4030A5', backgroundColor: 'white', textColor: '#4030A5' };
    }
  };

  const calendarDayByWeek = useMemo(() => {
    const firstDayStyles = computeStyleWithDrinks(firstDayOfCalendar);
    let weekDays = [{ day: firstDayOfCalendar, styles: firstDayStyles }];
    let previousDay = firstDayOfCalendar;
    let daysByWeek = [];
    for (let i = 1; i <= nbDays; ++i) {
      isDayIsSunday = i % 7 === 0;
      if (isDayIsSunday) {
        const goalStatus = computeGoalSuccess(day);
        daysByWeek.push({ days: weekDays, goalStatus: goalStatus });
        weekDays = [];
      }
      const day = previousDay.add(1, 'day');
      const styles = computeStyleWithDrinks(day);
      weekDays = [...weekDays, { day: day, styles: styles }];
      previousDay = day;
    }
    return daysByWeek;
  }, [firstDayOfCalendar, dailyDoses]);

  // arbitrary choice of a medium screen size for 414. If smaller screen -> smaller font size else bigger font size
  const widthBaseScale = SCREEN_WIDTH / 414;
  const fontSize = useMemo(() => {
    const newSize = 15 * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }, [SCREEN_WIDTH]);

  return (
    <>
      <View className="flex flex-row w-full justify-between px-5 items-center">
        <TouchableOpacity
          hitSlop={hitSlop(15)}
          onPress={() => {
            setSelectedMonth(selectedMonth.subtract(1, 'month'));
          }}>
          <ArrowLeft color="#4030A5" size={15} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">{selectedMonth.format('MMMM YYYY').capitalize()}</Text>
        <TouchableOpacity
          hitSlop={hitSlop(15)}
          onPress={() => {
            setSelectedMonth(selectedMonth.add(1, 'month'));
          }}>
          <ArrowRight color="#4030A5" size={15} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between mt-3">
        {cols.map((col) => {
          const isObjectifColonnes = col === 'Obj.';
          return (
            <View key={col} className="flex flex-row grow justify-center basis-4">
              {isObjectifColonnes ? (
                <Text className="text-[#4030A5] font-semibold" style={{ fontSize: fontSize }}>
                  {col}
                </Text>
              ) : (
                <Text className="text-[#B6C1CD]" style={{ fontSize: fontSize }}>
                  {col}
                </Text>
              )}
            </View>
          );
        })}
      </View>
      <View>
        {calendarDayByWeek.map((calendarWeek) => {
          const bgColor = dayjs().startOf('day').diff(calendarWeek.days[0].day) > 0 ? '#F5F6FA' : 'none';
          return (
            <View
              className="flex flex-row justify-between mt-2 rounded-lg"
              key={calendarWeek.days[0].day + 'week'}
              style={{ backgroundColor: bgColor }}>
              {calendarWeek.days.map((calendarDay) => {
                return calendarDay.day.diff(dayjs().startOf('day'), 'day') > 0 ? (
                  <View
                    key={calendarDay.day}
                    className="flex flex-row grow items-center basis-4 justify-center aspect-square m-1">
                    <Text
                      className="text-[#DCE3E9] font-semibold"
                      style={{
                        fontSize: fontSize,
                      }}>
                      {calendarDay.day.date()}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    key={calendarDay.day + 'blue'}
                    className="flex flex-row grow basis-4 items-center justify-center rounded-lg aspect-square m-1"
                    style={{
                      borderStyle: calendarDay.styles.borderStyle,
                      backgroundColor: calendarDay.styles.backgroundColor,
                      borderColor: calendarDay.styles.borderColor,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      onDayPress(calendarDay.day.format('YYYY-MM-DD'));
                    }}>
                    {Boolean(calendarDay.styles.isStar) && (
                      <View className="absolute">
                        <LegendStar size={fontSize * 2.5} />
                      </View>
                    )}

                    <Text
                      className="font-semibold absolute"
                      style={{
                        fontSize: fontSize,
                        color: calendarDay.styles.textColor,
                      }}>
                      {calendarDay.day.date()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View
                className="flex flex-row grow basis-4  items-center justify-center aspect-square m-1"
                key={calendarWeek.days[0].day + 'goal'}>
                {calendarWeek.goalStatus.status === 'Success' && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalContent({
                        consommationContent: calendarWeek.goalStatus.consommationMessage,
                        title: 'Objectif réussi, bravo\u00A0!',
                        drinkingDaysContent: calendarWeek.goalStatus.drinkingDayMessage,
                        drinkingDaysGoal: calendarWeek.goalStatus.drinkingDaysGoal,
                        drinkingDays: calendarWeek.goalStatus.drinkingDays,
                        consosWeekGoal: calendarWeek.goalStatus.consosWeekGoal,
                        consosWeek: calendarWeek.goalStatus.consosWeek,
                        firstDay: calendarWeek.days[0].day.format('DD MMMM'),
                        lastDay: calendarWeek.days[6].day.format('DD MMMM'),
                        failed: false,
                        visible: true,
                      });
                    }}>
                    <CheckDefisValidated size={fontSize * 1.8} />
                  </TouchableOpacity>
                )}
                {calendarWeek.goalStatus.status === 'Fail' && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalContent({
                        consommationContent: calendarWeek.goalStatus.consommationMessage,
                        title: 'Objectif dépassé',
                        drinkingDaysContent: calendarWeek.goalStatus.drinkingDayMessage,
                        drinkingDaysGoal: calendarWeek.goalStatus.drinkingDaysGoal,
                        drinkingDays: calendarWeek.goalStatus.drinkingDays,
                        consosWeekGoal: calendarWeek.goalStatus.consosWeekGoal,
                        consosWeek: calendarWeek.goalStatus.consosWeek,
                        firstDay: calendarWeek.days[0].day.format('DD'),
                        lastDay: calendarWeek.days[6].day.format('DD MMMM'),
                        failed: true,
                        visible: true,
                      });
                    }}>
                    <CrossDefisFailed size={fontSize * 1.8} />
                  </TouchableOpacity>
                )}
                {calendarWeek.goalStatus.status === 'NoGoal' && bgColor === '#F5F6FA' && (
                  <TouchableOpacity
                    className="rounded-full bg-[#767676] flex flex-row grow aspect-square justify-center m-1 items-center"
                    onPress={() => {
                      setModalContent({
                        consommationContent: calendarWeek.goalStatus.consommationMessage,
                        title: "Pas d'objectif fixé",
                        drinkingDaysContent: null,
                        drinkingDaysGoal: null,
                        drinkingDays: null,
                        consosWeekGoal: null,
                        consosWeek: calendarWeek.goalStatus.consosWeek,
                        firstDay: calendarWeek.days[0].day.format('DD'),
                        lastDay: calendarWeek.days[6].day.format('DD MMMM'),
                        failed: false,
                        visible: true,
                      });
                    }}>
                    <Text className="font-bold text-white" style={{ fontSize: fontSize * 1.3 }}>
                      ?
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
        <ModalGoal
          content={modalContent}
          onClose={() => {
            setModalContent(null);
          }}
        />
      </View>
    </>
  );
};

export default Calendar;
