import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { derivedDataFromDrinksState } from '../recoil/consos';
import { goalsState, isOnboardedSelector } from '../recoil/gains';
import API from '../services/api';
import { storage } from '../services/storage';
import { defaultPaddingFontScale, hitSlop } from '../styles/theme';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import CheckDefisValidated from './illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from './illustrations/icons/CrossDefisFailed';
import LegendStar from './illustrations/icons/LegendStar';
import ModalGoal from './ModalGoal';
import OnGoingGoal from './illustrations/icons/OnGoingGoal';
import OnBoardingModal from './OnBoardingModal';
import CalendarLegend from './CalendarLegend';
import { logEvent } from '../services/logEventsWithMatomo';
import H1 from './H1';

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

const Calendar = ({ onScrollToDate }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week').format('YYYY-MM-DD');
  const today = dayjs().startOf('day');
  const { dailyDoses, calendarDays, calendarGoalsStartOfWeek } = useRecoilValue(derivedDataFromDrinksState);
  const isOnboarded = useRecoilValue(isOnboardedSelector);
  const [modalContent, setModalContent] = useState(null);
  const nbDays = dayjs(firstDayOfCalendar).add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
  const [goals, setGoals] = useRecoilState(goalsState);
  const navigation = useNavigation();

  const [showOnboardingGainModal, setShowOnboardingGainModal] = useState(false);
  const navigateToFirstStep = useCallback(() => {
    logEvent({
      category: 'GAINS',
      action: 'GOAL_OPEN',
    });
    navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
    setShowOnboardingGainModal(false);
  }, [navigation]);

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
    let weekDays = [];
    let daysByWeek = [];
    let goalStatus = null;
    for (let i = 0; i < nbDays; ++i) {
      const isDayIsMonday = i % 7 === 0;
      const isDayIsSunday = i % 7 === 6;
      const day = dayjs(firstDayOfCalendar).add(i, 'days').format('YYYY-MM-DD');
      const styles = dayStyles[calendarDays[day] || 'notFilled'];
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
        goalStatus = calendarGoalsStartOfWeek[day] ?? 'WeekNotStarted';
      }
      if (isDayIsSunday) {
        const bgColor = today.diff(dayjs(weekDays[0].day)) >= 0 ? '#F5F6FA' : 'none';
        daysByWeek.push({ days: weekDays, goalStatus, bgColor });
        weekDays = [];
      }
    }
    return daysByWeek;
  }, [firstDayOfCalendar, nbDays, calendarDays, calendarGoalsStartOfWeek, today]);

  const handleDayPress = useCallback(
    (dateString) => {
      if (!isOnboarded) return setShowOnboardingGainModal(true);
      if (dailyDoses[dateString] > 0) {
        onScrollToDate(dateString);
      } else {
        const now = dayjs();
        const date = dayjs(dateString).set('hours', now.get('hours')).set('minutes', now.get('minutes'));
        navigation.push('ADD_DRINK', { timestamp: String(date) });
        logEvent({
          category: 'GAINS',
          action: 'CALENDAR_DAY_PRESS_TO_ADD_CONSO',
        });
        logEvent({
          category: 'CONSO',
          action: 'CONSO_OPEN_CONSO_ADDSCREEN',
          name: 'FROM_GAINS',
        });
      }
    },
    [dailyDoses, onScrollToDate, isOnboarded, navigation]
  );

  return (
    <>
      <View className="py-5" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
        <View className="flex flex-row shrink-0 mb-4">
          <H1 color="#4030a5">Calendrier</H1>
        </View>
        <View>
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
                        onDayPress={handleDayPress}
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
          </View>
        </View>
      </View>
      <CalendarLegend navigateToFirstStep={navigateToFirstStep} />
      <ModalGoal
        content={modalContent}
        onClose={() => {
          setModalContent(null);
        }}
      />
      <OnBoardingModal
        title="Sans objectif, pas de gains"
        description="En 3 étapes, je peux me fixer un objectif pour réduire ma consommation d'alcool."
        boutonTitle="Je me fixe un objectif"
        onPress={navigateToFirstStep}
        visible={showOnboardingGainModal}
        hide={() => {
          setShowOnboardingGainModal(false);
        }}
      />
    </>
  );
};

const CalendarDay = ({ day, isAfterToday, formattedDay, styles, onDayPress }) => {
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
};

export default Calendar;
