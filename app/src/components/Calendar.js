import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Calendar = () => {
  const cols = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.', 'Obj.'];
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const firstDayOfMonth = selectedMonth.startOf('month');
  const lastDayOfMonth = selectedMonth.endOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const calendarDayByWeek = useMemo(() => {
    let days = [firstDayOfCalendar];
    let previousDay = firstDayOfCalendar;
    let res = [];
    const nbDays = previousDay.add(35, 'days').diff(lastDayOfMonth) > 0 ? 35 : 42;
    for (let i = 1; i <= nbDays; ++i) {
      if (i % 7 === 0) {
        res.push(days);
        days = [];
      }
      const day = previousDay.add(1, 'day');
      days = [...days, day];
      previousDay = day;
    }
    return res;
  }, [firstDayOfCalendar]);
  const widthBaseScale = SCREEN_WIDTH / 414;
  const fontSize = useMemo(() => {
    const newSize = 15 * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }, [SCREEN_WIDTH]);
  return (
    <>
      <View className="flex flex-row w-full justify-between px-5 items-center">
        <TouchableOpacity
          onPress={() => {
            setSelectedMonth(selectedMonth.subtract(1, 'month'));
          }}>
          <ArrowLeft color="#4030A5" size={15} />
        </TouchableOpacity>
        <Text className="text-lg">{selectedMonth.format('MMMM YYYY').capitalize()}</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedMonth(selectedMonth.add(1, 'month'));
          }}>
          <ArrowRight color="#4030A5" size={15} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between mt-3">
        {cols.map((col) => (
          <View className="flex flex-row grow justify-center basis-4">
            <Text key={col} className="text-[#B6C1CD]" style={{ fontSize: fontSize }}>
              {col}
            </Text>
          </View>
        ))}
      </View>
      <View>
        {calendarDayByWeek.map((calendarWeek) => {
          const bgColor = dayjs().startOf('day').diff(calendarWeek[0]) > 0 ? '#F5F6FA' : 'none';
          return (
            <View
              className="flex flex-row justify-between mt-2 rounded-lg"
              key={calendarWeek[0]}
              style={{ backgroundColor: bgColor }}>
              {calendarWeek.map((calendarDay) => {
                return calendarDay.diff(dayjs().startOf('day'), 'day') > 0 ? (
                  <View
                    key={calendarDay}
                    className="flex flex-row grow items-center basis-4 justify-center rounded-md aspect-square m-1">
                    <Text className="text-[#DCE3E9] font-semibold" style={{ fontSize: fontSize }}>
                      {calendarDay.date()}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    key={calendarDay + 'blue'}
                    className="flex flex-row grow basis-4 items-center justify-center border border-dotted bg-white border-[#4030A5] rounded-md aspect-square m-1">
                    <Text className="text-[#4030A5] font-semibold" style={{ fontSize: fontSize }}>
                      {calendarDay.date()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View
                className="flex flex-row grow basis-4  items-center justify-center rounded-md aspect-square m-1"
                key={calendarWeek[0] + 'goal'}>
                <Text style={{ fontSize: fontSize }}>X</Text>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default Calendar;
