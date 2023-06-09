import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { derivedDataFromDrinksState } from '../recoil/consos';
import { goalsState } from '../recoil/gains';
import API from '../services/api';
import { storage } from '../services/storage';
import { hitSlop } from '../styles/theme';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import CheckDefisValidated from './illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from './illustrations/icons/CrossDefisFailed';
import LegendStar from './illustrations/icons/LegendStar';
import ModalGoal from './ModalGoal';
import OnGoingGoal from './illustrations/icons/OnGoingGoal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const dayStyles = {
  goalExistsButNotRespected: {
    borderStyle: 'solid',
    borderColor: '#FC8383',
    backgroundColor: '#FC8383',
    textColor: '#fff',
    isStar: false,
  },
  goalExistsAndDosesWithinGoal: {
    borderStyle: 'solid',
    borderColor: '#34D39A',
    backgroundColor: '#34D39A',
    textColor: '#fff',
    isStar: false,
  },
  goalExistsAndNoDoses: {
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    textColor: '#fff',
    isStar: true,
  },
  noGoalAndDoses: {
    borderStyle: 'solid',
    borderColor: '#FC8383',
    backgroundColor: '#FC8383',
    textColor: '#fff',
    isStar: false,
  },
  noGoalAndNoDoses: {
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    textColor: '#fff',
    isStar: true,
  },
  notFilled: {
    borderStyle: 'dashed',
    borderColor: '#4030A5',
    backgroundColor: 'white',
    textColor: '#4030A5',
    isStar: false,
  },
};

const cols = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.', 'Obj.'];

// arbitrary choice of a medium screen size for 414. If smaller screen -> smaller font size else bigger font size
const widthBaseScale = SCREEN_WIDTH / 414;
const fontSize = Math.round(PixelRatio.roundToNearestPixel(15 * widthBaseScale));

const Calendar = ({ onDayPress }) => {
  let now = Date.now();
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week').format('YYYY-MM-DD');
  const today = dayjs().startOf('day');
  const { calendarDays, calendarGoalsStartOfWeek } = useRecoilValue(derivedDataFromDrinksState);
  const [modalContent, setModalContent] = useState(null);
  const nbDays = dayjs(firstDayOfCalendar).add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
  const [goals, setGoals] = useRecoilState(goalsState);

  // console.log(JSON.stringify({ calendarGoalsStartOfWeek }, null, 2));

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
            if (JSON.stringify(res.data) !== JSON.stringify(goals)) {
              setGoals(res.data);
            }
          }
        })
        .catch((err) => console.log('Get goals err', err));
    }, [setGoals, goals])
  );

  const calendarDayByWeek = useMemo(() => {
    // console.log('Calendar 1', Date.now() - now);
    // now = Date.now();
    // console.log({ firstDayOfCalendar });
    // console.log('Calendar 2', Date.now() - now);
    // now = Date.now();
    let weekDays = [];
    let daysByWeek = [];
    let goalStatus = null;
    for (let i = 0; i < nbDays; ++i) {
      const isDayIsMonday = i % 7 === 0;
      const isDayIsSunday = i % 7 === 6;
      const day = dayjs(firstDayOfCalendar).add(i, 'days').format('YYYY-MM-DD');
      // now = Date.now();
      const styles = dayStyles[calendarDays[day] || 'notFilled'];
      // console.log('Calendar computeStyleWithDrinks', Date.now() - now);
      weekDays = [
        ...weekDays,
        {
          day: day,
          isAfterToday: dayjs(day).diff(today, 'day') > 0,
          formattedDay: dayjs(day).format('D'),
          styles: styles,
        },
      ];
      if (isDayIsMonday) {
        // now = Date.now();
        goalStatus = calendarGoalsStartOfWeek[day] ?? 'WeekNotStarted';
        // console.log('Calendar computeGoalSuccess', Date.now() - now); // 30 ms
      }
      if (isDayIsSunday) {
        const bgColor = today.diff(dayjs(weekDays[0].day)) >= 0 ? '#F5F6FA' : 'none';
        daysByWeek.push({ days: weekDays, goalStatus, bgColor });
        weekDays = [];
      }
    }
    // console.log('Calendar 3', Date.now() - now); // 222 ms mais fix peut import le nombre de consos
    // now = Date.now();
    return daysByWeek;
  }, [firstDayOfCalendar, nbDays, calendarDays]);

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
          return (
            <View
              className="flex flex-row justify-between mt-2 rounded-lg"
              key={calendarWeek.days[0].day + 'week'}
              style={{ backgroundColor: calendarWeek.bgColor }}>
              {calendarWeek.days.map((calendarDay) => {
                // console.log('Calendar day', Date.now() - now); // 520 ms fix peut importe le nombre de consos ~ 10 ~ 15 ms /day
                return (
                  <CalendarDay
                    key={calendarDay.day}
                    day={calendarDay.day}
                    styles={calendarDay.styles}
                    isAfterToday={calendarDay.isAfterToday}
                    formattedDay={calendarDay.formattedDay}
                    onDayPress={onDayPress}
                  />
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
                        status: 'Success',
                        drinkingDaysContent: calendarWeek.goalStatus.drinkingDayMessage,
                        drinkingDaysGoal: calendarWeek.goalStatus.drinkingDaysGoal,
                        drinkingDays: calendarWeek.goalStatus.drinkingDays,
                        consosWeekGoal: calendarWeek.goalStatus.consosWeekGoal,
                        consosWeek: calendarWeek.goalStatus.consosWeek,
                        firstDay: dayjs(calendarWeek.days[0].day).format('DD MMMM'),
                        lastDay: dayjs(calendarWeek.days[6].day).format('DD MMMM'),
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
                        status: 'Failed',
                        drinkingDaysContent: calendarWeek.goalStatus.drinkingDayMessage,
                        drinkingDaysGoal: calendarWeek.goalStatus.drinkingDaysGoal,
                        drinkingDays: calendarWeek.goalStatus.drinkingDays,
                        consosWeekGoal: calendarWeek.goalStatus.consosWeekGoal,
                        consosWeek: calendarWeek.goalStatus.consosWeek,
                        firstDay: dayjs(calendarWeek.days[0].day).format('DD MMMM'),
                        lastDay: dayjs(calendarWeek.days[6].day).format('DD MMMM'),
                        visible: true,
                      });
                    }}>
                    <CrossDefisFailed size={fontSize * 1.8} />
                  </TouchableOpacity>
                )}
                {calendarWeek.goalStatus.status === 'Ongoing' && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalContent({
                        title: 'Objectif en cours',
                        status: 'Ongoing',
                        drinkingDaysContent: calendarWeek.goalStatus.drinkingDayMessage,
                        drinkingDaysGoal: calendarWeek.goalStatus.drinkingDaysGoal,
                        drinkingDays: calendarWeek.goalStatus.drinkingDays,
                        consosWeekGoal: calendarWeek.goalStatus.consosWeekGoal,
                        consosWeek: calendarWeek.goalStatus.consosWeek,
                        firstDay: dayjs(calendarWeek.days[0].day).format('DD MMMM'),
                        lastDay: dayjs(calendarWeek.days[6].day).format('DD MMMM'),
                        visible: true,
                      });
                    }}>
                    <OnGoingGoal size={fontSize * 1.8} />
                  </TouchableOpacity>
                )}
                {calendarWeek.goalStatus.status === 'NoGoal' && calendarWeek.bgColor === '#F5F6FA' && (
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
                        firstDay: dayjs(calendarWeek.days[0].day).format('DD MMMM'),
                        lastDay: dayjs(calendarWeek.days[6].day).format('DD MMMM'),
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

const CalendarDay = memo(({ day, isAfterToday, formattedDay, styles, onDayPress }) => {
  return isAfterToday ? (
    <View key={day} className="flex flex-row grow items-center basis-4 justify-center aspect-square m-1">
      <Text className="text-[#DCE3E9] font-semibold" style={{ fontSize }}>
        {formattedDay}
      </Text>
    </View>
  ) : (
    <TouchableOpacity
      key={day + 'blue'}
      className="flex flex-row grow basis-4 items-center justify-center rounded-lg aspect-square m-1"
      style={{
        borderStyle: styles.borderStyle,
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
        borderWidth: 1,
      }}
      onPress={() => {
        onDayPress(day);
      }}>
      {Boolean(styles.isStar) && (
        <View className="absolute">
          <LegendStar size={fontSize * 2.5} />
        </View>
      )}

      <Text
        className="font-semibold absolute"
        style={{
          fontSize: fontSize,
          color: styles.textColor,
        }}>
        {formattedDay}
      </Text>
    </TouchableOpacity>
  );
});

export default Calendar;
