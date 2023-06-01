import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import H1 from '../../components/H1';
import { dailyDosesSelector, drinksState, feedDaysSelector } from '../../recoil/consos';
import Calendar from '../../components/Calendar';
import { logEvent } from '../../services/logEventsWithMatomo';
import { Text, TouchableOpacity, View } from 'react-native';
import { defaultPaddingFontScale, hitSlop } from '../../styles/theme';
import CalendarSwitch from '../../components/CalendarSwitch';
import ArrowLeft from '../../components/ArrowLeft';
import ArrowRight from '../../components/ArrowRight';
import WeeklyGains from '../../components/WeeklyGains';
import TextStyled from '../../components/TextStyled';
import CheckDefisValidated from '../../components/illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from '../../components/illustrations/icons/CrossDefisFailed';
import LegendStar from '../../components/illustrations/icons/LegendStar';
import LegendInfos from '../../components/illustrations/icons/LegendInfos';
import ButtonPrimary from '../../components/ButtonPrimary';
import OnGoingGoal from '../../components/illustrations/icons/OnGoingGoal';
import GainsIcon from '../../components/illustrations/icons/GainsIcon';
import H2 from '../../components/H2';
import styled from 'styled-components';
import InfoRoundIcon from '../../components/illustrations/icons/InfoRoundIcon';
import { previousDrinksPerWeekState } from '../../recoil/gains';
import EuroIcon from '../../components/illustrations/icons/EuroIcon';
import KcalIcon from '../../components/illustrations/icons/KcalIcon';

import TargetGoal from '../../components/illustrations/icons/TargetGoal';

/*
markedDates is an object with keys such as `2022-04-30` and values such as
{
        selected: true,
        startingDay: true,
        endingDay: true,
        color: colors.app.color,
      }

*/
const noDrinkDay = (activeMonth) => ({
  selected: true,
  startingDay: true,
  endingDay: true,
  // selectedColor: activeMonth ? '#2c864d' : '#2c864d66',
  selectedColor: '#2c864d',
  isDrinkDay: true,
  activeOpacity: 0.5,
});

const drinkDay = (activeMonth) => ({
  selected: true,
  startingDay: true,
  endingDay: true,
  // selectedColor: activeMonth ? '#de295e' : '#de295e66',
  selectedColor: '#de295e',
  isDrinkDay: true,
});

const needToFillupConso = {
  startingDay: true,
  endingDay: true,
  customStyles: {
    container: {
      borderStyle: 'dashed',
      borderWidth: 1,
    },
  },
};

const GainsCalendar = ({ isOnboarded, setShowOnboardingGainModal, setDateToScroll, onLegendClick }) => {
  const dailyDoses = useRecoilValue(dailyDosesSelector);
  const [currentMonth, setCurrentMonth] = React.useState(dayjs().format('YYYY-MM'));
  const navigateToFirstStep = () => {
    logEvent({
      category: 'GAINS',
      action: 'GOAL_OPEN',
    });
    navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
    setShowOnboardingGainModal(false);
  };
  const navigation = useNavigation();

  const markedDays = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const days = { [today]: { marked: true } };
    for (const [day, doses] of Object.entries(dailyDoses)) {
      days[day] =
        doses > 0
          ? drinkDay(dayjs(day).isSame(currentMonth, 'month'))
          : noDrinkDay(dayjs(day).isSame(currentMonth, 'month'));
      days[day] = { ...days[day], marked: day === today };
    }
    const firstTrackedDay = dayjs().startOf('week').add(-1, 'week');
    const differenceDays = dayjs().diff(firstTrackedDay, 'day');
    for (let i = 0; i < differenceDays; i++) {
      const day = dayjs(firstTrackedDay).add(i, 'day').format('YYYY-MM-DD');
      if (days[day]) continue;
      days[day] = needToFillupConso;
    }
    return days;
  }, [dailyDoses, currentMonth]);
  const [window, setWindow] = useState('calendar');
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const days = useRecoilValue(feedDaysSelector);
  const beginDateOfOz = useMemo(() => {
    if (!days.length) return null;
    return dayjs(days[days.length - 1]);
  }, [days]);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const drinks = useRecoilValue(drinksState);

  const myWeeklyExpensesBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum +
          drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.price || 0),
        0
      ),
    [previousDrinksPerWeek]
  );

  const myWeeklyKcalBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum +
          drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.kcal || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
  const mySavingsSinceBeginning = useMemo(() => {
    if (!days.length) return null;
    const myExpensesSinceBegnining = drinks.reduce(
      (sum, drink) =>
        sum +
        drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.price || 0),
      0
    );
    const numberOfDaysSinceBeginning = Math.abs(dayjs(beginDateOfOz).diff(dayjs(), 'days'));
    const averageDailyExpenses = myExpensesSinceBegnining / numberOfDaysSinceBeginning;
    const averageDailyExpensesBeforeObjective = myWeeklyExpensesBeforeObjective / 7;
    return Math.ceil(averageDailyExpensesBeforeObjective - averageDailyExpenses) * numberOfDaysSinceBeginning;
  }, [drinks, days, myWeeklyExpensesBeforeObjective, beginDateOfOz]);

  const myKcalSavingsSinceBeginning = useMemo(() => {
    if (!days.length) return null;
    const myKcalSinceBegnining = drinks.reduce(
      (sum, drink) =>
        sum +
        drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.kcal || 0),
      0
    );
    const numberOfDaysSinceBeginning = Math.abs(dayjs(beginDateOfOz).diff(dayjs(), 'days'));
    const averageDailyKcal = myKcalSinceBegnining / numberOfDaysSinceBeginning;
    const averageDailyKcalBeforeObjective = myWeeklyKcalBeforeObjective / 7;
    return Math.ceil(averageDailyKcalBeforeObjective - averageDailyKcal) * numberOfDaysSinceBeginning;
  }, [drinks, days, myWeeklyKcalBeforeObjective, beginDateOfOz]);

  return (
    <View className="py-5">
      <View className="flex flex-row shrink-0 mb-4" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
        <H1 color="#4030a5">Calendrier</H1>
      </View>
      <View>
        <View style={{ paddingHorizontal: defaultPaddingFontScale() }}>
          <CalendarSwitch window={window} setWindow={setWindow} />
          {(isOnboarded || window === 'calendar') && (
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
          )}
        </View>

        {window === 'calendar' ? (
          <>
            <Calendar
              selectedMonth={selectedMonth}
              onDayPress={(dateString) => {
                if (!isOnboarded) return setShowOnboardingGainModal(true);
                if (markedDays[dateString]?.isDrinkDay) {
                  setDateToScroll(dateString);
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
              }}
            />
            <TouchableOpacity
              onPress={() => {
                onLegendClick(true);
              }}
              disabled={!isOnboarded}
              className="flex flex-row justify-start mt-3 mb-3 bg-[#FAFAFA]"
              style={{ paddingHorizontal: defaultPaddingFontScale() }}>
              <View className="mt-2 mb-4">
                <View className="flex flex-row items-center space-x-1 mb-1">
                  <TextStyled color={'#939EA6'} className="text-xs">
                    Consommations jour
                  </TextStyled>
                  {isOnboarded && <LegendInfos />}
                </View>
                <View className="flex flex-row space-x-1 items-center">
                  <LegendStar />
                  <Text className="text-xs">Pas bu</Text>
                </View>
                {isOnboarded ? (
                  <View>
                    <View className="flex flex-row items-center">
                      <View className="bg-[#34D39A] w-5 h-5 rounded-md mt-1 mr-1"></View>
                      <Text className="text-xs mt-1">Dans l'objectif</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1"></View>
                      <Text className="text-xs mt-1">Au dessus de l'objectif</Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View className="flex flex-row items-center">
                      <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1"></View>
                      <Text className="text-xs mt-1">Bu</Text>
                    </View>
                  </View>
                )}
              </View>
              <View className="mx-auto mt-2 mb-4">
                <View className="flex flex-row items-center space-x-1 mb-1 justify-center">
                  <TextStyled color={'#939EA6'} className="text-xs">
                    Objectif semaine
                  </TextStyled>
                  {isOnboarded && <LegendInfos />}
                </View>
                {isOnboarded ? (
                  <View>
                    <View className="flex flex-row items-center space-x-2 my-1 ">
                      <CheckDefisValidated />
                      <Text className="text-xs">Réussi</Text>
                    </View>
                    <View className="flex flex-row items-center space-x-2 mb-1">
                      <CrossDefisFailed />
                      <Text className="text-xs">Dépassé</Text>
                    </View>
                    <View className="flex flex-row items-center space-x-2">
                      <OnGoingGoal />
                      <Text className="text-xs">En cours</Text>
                    </View>
                  </View>
                ) : (
                  <View className="mt-2">
                    <ButtonPrimary content={'Me fixer un objectif'} small onPress={navigateToFirstStep} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {isOnboarded ? (
              <WeeklyGains selectedMonth={selectedMonth} />
            ) : (
              <View style={{ paddingHorizontal: defaultPaddingFontScale() }}>
                <TouchableOpacity
                  onPress={() => {
                    logEvent({
                      category: 'GAINS',
                      action: 'TOOLTIP_GOAL',
                    });
                    navigateToFirstStep();
                  }}
                  className="flex flex-row items-center justify-around bg-[#E8E8F3] rounded-lg py-4 px-8 border border-[#4030a5]">
                  <TargetGoal size={35} />
                  <Text className="mx-6">
                    Complétez l’
                    <Text className="font-bold">estimation de votre consommation initiale </Text>et fixez-vous un
                    <Text className="font-bold"> objectif </Text>pour calculer vos gains dans le temps&nbsp;!
                  </Text>
                  <View>
                    <ArrowRight color="#4030a5" size={15} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <WeeklyGains selectedMonth={selectedMonth} />
            <View className="pt-5" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
              <View className="flex flex-row space-x-1 items-center mb-3 mt-6">
                <GainsIcon size={25} />
                <H2 color="#4030a5">Mes gains depuis le début</H2>
                <GainsFromStartInfoButton onPress={() => navigation.push('GAINS_FROM_START_MODALE')}>
                  <InfoRoundIcon size={25} />
                </GainsFromStartInfoButton>
              </View>
              <CategoriesContainer>
                <Categorie>
                  <View>
                    <EuroIcon size={25} />
                  </View>
                  <Spacer size={5} />
                  <TextStyled bold size={35}>
                    {mySavingsSinceBeginning > 0 ? mySavingsSinceBeginning : 0}
                  </TextStyled>
                  <Text>Euros épargnés</Text>
                </Categorie>
                <Spacer size={20} />
                <Categorie>
                  <View>
                    <KcalIcon size={25} />
                  </View>
                  <Spacer size={5} />
                  <TextStyled bold size={35}>
                    {myKcalSavingsSinceBeginning > 0 ? myKcalSavingsSinceBeginning : 0}
                  </TextStyled>
                  <CategorieText>KCalories évitées</CategorieText>
                </Categorie>
              </CategoriesContainer>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const Spacer = styled.View`
  height: ${({ size }) => size || 20}px;
  width: ${({ size }) => size || 20}px;
`;

const GainsFromStartInfoButton = styled.TouchableOpacity`
  justify-content: center;
`;

const CategorieText = styled(TextStyled)`
  text-align: center;
`;

const CategoriesContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 15px;
`;

const Categorie = styled.View`
  border: 1px solid #dddddd;
  border-radius: 5px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  padding: 10px 4px 10px 4px;
  min-height: 90px;
`;

const Container = styled.View`
  padding-top: 20px;
`;

export default GainsCalendar;
