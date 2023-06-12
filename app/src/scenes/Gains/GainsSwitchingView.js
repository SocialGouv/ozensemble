import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import H1 from '../../components/H1';
import { drinksState, feedDaysSelector } from '../../recoil/consos';
import { logEvent } from '../../services/logEventsWithMatomo';
import { Text, TouchableOpacity, View } from 'react-native';
import { defaultPaddingFontScale, hitSlop } from '../../styles/theme';
import CalendarSwitch from '../../components/CalendarSwitch';
import ArrowLeft from '../../components/ArrowLeft';
import ArrowRight from '../../components/ArrowRight';
import WeeklyGains from '../../components/WeeklyGains';
import H2 from '../../components/H2';
import styled from 'styled-components';
import { isOnboardedSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import EuroIcon from '../../components/illustrations/icons/EuroIcon';
import KcalIcon from '../../components/illustrations/icons/KcalIcon';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';

import TargetGoal from '../../components/illustrations/icons/TargetGoal';
import Feed from '../ConsoFollowUp/Feed';

/*
markedDates is an object with keys such as `2022-04-30` and values such as
{
        selected: true,
        startingDay: true,
        endingDay: true,
        color: colors.app.color,
      }

*/
const GainsSwitchingView = () => {
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
  const isOnboarded = useRecoilValue(isOnboardedSelector);

  return (
    <View className="py-5 bg-white h-full">
      <View className="flex flex-row shrink-0 mb-4" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
        <H1 color="#4030a5">Calendrier</H1>
      </View>
      <View>
        <View>
          <View style={{ paddingHorizontal: defaultPaddingFontScale() }}>
            <CalendarSwitch window={window} setWindow={setWindow} />
            {(isOnboarded || window === 'calendar') && (
              <View className="flex flex-row w-gfain justify-between px-5 items-center">
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
          <View
            style={{ opacity: window !== 'calendar', zIndex: window !== 'calendar' }}
            className="absolute w-full top-28">
            {isOnboarded ? (
              <>
                <WeeklyGains selectedMonth={selectedMonth} />
                <View className="pt-5" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
                  <H2 color="#4030a5">Total depuis que j'utilise Oz</H2>
                  <View className="flex flex-row justify-between mt-4">
                    <View className="flex flex-1 rounded-md items-center justify-center bg-[#FAFAFA]">
                      <View>
                        <EuroIcon size={25} />
                      </View>
                      <Spacer size={5} />
                      {isOnboarded ? (
                        <Text className="font-bold text-2xl">
                          {mySavingsSinceBeginning > 0 ? mySavingsSinceBeginning : 0}€
                        </Text>
                      ) : (
                        <Text className="font-bold text-2xl">-€</Text>
                      )}

                      <Text className="text-xs text-[#939EA6]">Euros épargnés</Text>
                    </View>
                    <Spacer size={20} />
                    <View className="flex flex-1 rounded-md items-center justify-center bg-[#FAFAFA] p-3">
                      <View>
                        <KcalIcon size={25} />
                      </View>
                      <Spacer size={5} />
                      {isOnboarded ? (
                        <View className="flex flex-row justify-center items-baseline">
                          <Text className="font-bold text-2xl">
                            {myKcalSavingsSinceBeginning > 0 ? myKcalSavingsSinceBeginning : 0}
                          </Text>
                          <Text className="font-bold text-lg ">KCAL</Text>
                        </View>
                      ) : (
                        <>
                          <Text className="text-lg font-bold">- KCAL</Text>
                        </>
                      )}
                      <Text className="text-xs text-[#939EA6]">KCalories évitées</Text>
                    </View>
                  </View>
                </View>
              </>
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
                    Complétez l'
                    <Text className="font-bold">estimation de votre consommation initiale </Text>et fixez-vous un
                    <Text className="font-bold"> objectif </Text>pour calculer vos gains dans le temps&nbsp;!
                  </Text>
                  <View>
                    <ArrowRight color="#4030a5" size={15} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            <Feed selectedMonth={selectedMonth} show={window === 'calendar'} />
          </View>
        </View>
      </View>
    </View>
  );
};

const Spacer = styled.View`
  height: ${({ size }) => size || 20}px;
  width: ${({ size }) => size || 20}px;
`;

export default GainsSwitchingView;
