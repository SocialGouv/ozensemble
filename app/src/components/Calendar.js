import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

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
          <View className="w-9">
            <Text key={col} className="text-[#B6C1CD] text-center">
              {col}
            </Text>
          </View>
        ))}
      </View>
      <View>
        {calendarDayByWeek.map((calendarWeek) => {
          return (
            <View className="flex flex-row justify-between mt-2 " key={calendarWeek[0]}>
              {calendarWeek.map((calendarDay) => {
                return (
                  <View key={calendarDay} className="w-9 mt-1 ">
                    <Text className="text-center">{calendarDay.date()}</Text>
                  </View>
                );
              })}
              <View className="w-9 mt-1">
                <Text className="text-center">X</Text>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default Calendar;
