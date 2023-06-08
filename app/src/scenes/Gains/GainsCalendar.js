import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { View } from 'react-native';
import H1 from '../../components/H1';
import { dosesByPeriodSelector } from '../../recoil/consos';
import Calendar from '../../components/Calendar';
import { logEvent } from '../../services/logEventsWithMatomo';
import { defaultPaddingFontScale } from '../../styles/theme';

/*
markedDates is an object with keys such as `2022-04-30` and values such as
{
        selected: true,
        startingDay: true,
        endingDay: true,
        color: colors.app.color,
      }

*/
const noDrinkDay = () => ({
  selected: true,
  startingDay: true,
  endingDay: true,
  // selectedColor: activeMonth ? '#2c864d' : '#2c864d66',
  selectedColor: '#2c864d',
  isDrinkDay: true,
  activeOpacity: 0.5,
});

const drinkDay = () => ({
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

const GainsCalendar = ({ isOnboarded, setShowOnboardingGainModal, setDateToScroll }) => {
  const [dailyDoses] = useRecoilValue(dosesByPeriodSelector);
  const navigation = useNavigation();

  const markedDays = useMemo(() => {
    const date = Date.now();
    const today = dayjs().format('YYYY-MM-DD');
    const days = { [today]: { marked: true } };
    for (const [day, doses] of Object.entries(dailyDoses)) {
      days[day] = doses > 0 ? drinkDay() : noDrinkDay();
      days[day] = { ...days[day], marked: day === today };
    }
    const firstTrackedDay = dayjs().startOf('week').add(-1, 'week');
    const differenceDays = dayjs().diff(firstTrackedDay, 'day');
    for (let i = 0; i < differenceDays; i++) {
      const day = dayjs(firstTrackedDay).add(i, 'day').format('YYYY-MM-DD');
      if (days[day]) continue;
      days[day] = needToFillupConso;
    }
    console.log('Gains calendar 1', Date.now() - date);
    return days;
  }, [dailyDoses]);

  return (
    <View className="py-5" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
      <View className="flex flex-row shrink-0 mb-4">
        <H1 color="#4030a5">Calendrier</H1>
      </View>
      <View>
        <Calendar
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
      </View>
    </View>
  );
};

export default GainsCalendar;
