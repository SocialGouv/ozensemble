import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { derivedDataFromDrinksState } from '../recoil/consos';
import { goalsState, isOnboardedSelector } from '../recoil/gains';
import API from '../services/api';
import { storage } from '../services/storage';
import { defaultPaddingFontScale } from '../styles/theme';
import CheckDefisValidated from './illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from './illustrations/icons/CrossDefisFailed';
import LegendStar from './illustrations/icons/LegendStar';
import ModalGoal from './ModalGoal';
import OnGoingGoal from './illustrations/icons/OnGoingGoal';
import OnBoardingModal from './OnBoardingModal';
import CalendarLegend from './CalendarLegend';
import { logEvent } from '../services/logEventsWithMatomo';
import TextStyled from './TextStyled';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const dayStyles = {
  goalExistsButNotRespected: {
    borderStyle: 'solid',
    borderColor: '#FF7878',
    backgroundColor: '#FF7878',
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
    borderColor: '#FF7878',
    backgroundColor: '#FF7878',
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

const Calendar = ({ onScrollToDate, selectedMonth }) => {
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week').format('YYYY-MM-DD');
  const today = dayjs().startOf('day');
  const { dailyDoses, weeklyDoses, calendarDays, calendarGoalsStartOfWeek } =
    useRecoilValue(derivedDataFromDrinksState);
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
        if (calendarGoalsStartOfWeek[day]) goalStatus = calendarGoalsStartOfWeek[day];
        if (!calendarGoalsStartOfWeek[day]) {
          if (!goals.length) {
            goalStatus = {
              status: 'WeekNotStarted',
              consommationMessage:
                'Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine',
              consosWeek: 0,
            };
          } else {
            // no drinks in drinksState so no computation of calendarGoalsStartOfWeek;
            // so we do it manually
            const goal = goals.find((goal) => goal.date === day) ?? goals.at(-1);
            goalStatus = {
              status: 'InProgress',
              drinkingDayMessage:
                'Ajoutez vos consommations tous les jours de cette semaine pour accéder à son analyse, bon courage !',
              consosWeekGoal: goal.dosesPerWeek,
              consosWeek: 0,
              drinkingDaysGoal: 7 - goal.daysWithGoalNoDrink.length,
              drinkingDays: 0,
            };
          }
        }
      }
      if (isDayIsSunday) {
        const bgColor = today.diff(dayjs(weekDays[0].day)) >= 0 ? '#F5F6FA' : 'none';
        daysByWeek.push({ days: weekDays, goalStatus, bgColor });
        weekDays = [];
      }
    }
    return daysByWeek;
  }, [firstDayOfCalendar, nbDays, calendarDays, calendarGoalsStartOfWeek, today, weeklyDoses, goals.length]);

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
        <View>
          <View className="flex flex-row justify-between mt-3">
            {cols.map((col) => {
              const isObjectifColonnes = col === 'Obj.';
              return (
                <View key={col} className="flex flex-row grow justify-center basis-4">
                  {isObjectifColonnes ? (
                    <TextStyled className="text-[#4030A5] font-semibold" style={{ fontSize: fontSize }}>
                      {col}
                    </TextStyled>
                  ) : (
                    <TextStyled className="text-[#B6C1CD]" style={{ fontSize: fontSize }}>
                      {col}
                    </TextStyled>
                  )}
                </View>
              );
            })}
          </View>
          <View>
            {calendarDayByWeek.map((calendarWeek) => {
              const weekIsAfterTodaysWeek = calendarWeek.bgColor !== '#F5F6FA';
              return (
                <View
                  className="flex flex-row justify-between mt-2 rounded-lg"
                  key={calendarWeek.days[0].day + 'week'}
                  style={{ backgroundColor: calendarWeek.bgColor }}>
                  {calendarWeek.days.map((calendarDay) => {
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
                    {calendarWeek.goalStatus.status === 'InProgress' && !weekIsAfterTodaysWeek && (
                      <TouchableOpacity
                        onPress={() => {
                          setModalContent({
                            title: 'Objectif en cours',
                            status: 'InProgress',
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
                    {['NoGoal', 'WeekNotStarted'].includes(calendarWeek.goalStatus.status) &&
                      !weekIsAfterTodaysWeek && (
                        <TouchableOpacity
                          className="rounded-full bg-[#767676] flex flex-row grow aspect-square justify-center m-1 items-center"
                          onPress={() => {
                            setModalContent({
                              consommationContent: calendarWeek.goalStatus.consommationMessage,
                              title: "Pas d'objectif fixé",
                              status: 'NoGoal',
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
                          <TextStyled className="font-bold text-white" style={{ fontSize: fontSize * 1.3 }}>
                            ?
                          </TextStyled>
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
      <TextStyled className="text-[#DCE3E9] font-semibold" style={{ fontSize }}>
        {formattedDay}
      </TextStyled>
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

      <TextStyled
        className="font-semibold absolute"
        style={{
          fontSize: fontSize,
          color: styles.textColor,
        }}>
        {formattedDay}
      </TextStyled>
    </TouchableOpacity>
  );
};

export default Calendar;
