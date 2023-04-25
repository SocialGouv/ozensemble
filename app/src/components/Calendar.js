import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import H3 from './H3';

const Calendar = () => {
  const cols = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.', 'Obj.'];
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const firstDayOfMonth = selectedMonth.startOf('month');
  const firstDayOfCalendar = firstDayOfMonth.startOf('week');
  const getCalendarDayByWeek = () => {
    let days = [firstDayOfCalendar];
    let previousDay = firstDayOfCalendar;
    let res = [];
    for (let i = 1; i <= 35; ++i) {
      if (i % 7 === 0) {
        res.push(days);
        days = [];
      }
      const day = previousDay.add(1, 'day');
      days = [...days, day];
      previousDay = day;
    }
    return res;
  };
  const calendarDayByWeek = getCalendarDayByWeek();

  return (
    <>
      <View className="flex flex-row w-full justify-between px-5">
        <TouchableOpacity
          onPress={() => {
            setSelectedMonth(selectedMonth.subtract(1, 'month'));
          }}>
          <ArrowLeft color="#4030A5" size={15} />
        </TouchableOpacity>
        <H3 semibold>{selectedMonth.format('MMMM YYYY').capitalize()}</H3>
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
