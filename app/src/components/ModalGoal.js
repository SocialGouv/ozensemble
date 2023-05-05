import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import H2 from './H2';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import CrossDefisFailed from './illustrations/icons/CrossDefisFailed';
import CheckDefisValidated from './illustrations/icons/CheckDefisValidated';
import TextStyled from './TextStyled';
import InterogationMark from './illustrations/icons/InterogationMark';

const ModalGoal = ({ content, onClose }) => {
  const firstDayMonth = content?.firstDay?.split(' ')[1];
  const lastDayMonth = content?.lastDay?.split(' ')[1];
  const firstDayDisplay = firstDayMonth === lastDayMonth ? content?.firstDay?.split(' ')[0] : content?.firstDay;
  return (
    <Modal visible={!!content} animationType="fade" withBackground hideOnTouch>
      <View className="bg-white rounded-xl">
        <View className="h-5 flex flex-row  justify-end">
          <TouchableOpacity onPress={onClose} hitSlop={hitSlop(15)}>
            <Svg fill="none" viewBox="0 0 24 24" className="h-5 w-5">
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                stroke="black"
                d="M6 18L18 6M6 6l12 12"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-center">
          {!content?.consosWeekGoal && <InterogationMark size={50} />}
          {content?.consosWeekGoal && content?.failed && <CrossDefisFailed size={50} />}
          {content?.consosWeekGoal && !content?.failed && <CheckDefisValidated size={50} />}
        </View>

        <View className="mb-4 p-2">
          <Text color="#000" className="text-center mb-1 text-xl font-extrabold">
            {content?.title}
          </Text>
          <Text className="text-xs text-[#939EA6] text-center">
            semaine du {firstDayDisplay} au {content?.lastDay}
          </Text>
          <View className="flex flex-row justify-around mt-8">
            <View>
              <Text className="text-[#4030A5] font-semibold text-center text-xs">Consos semaine</Text>
              <View className={'flex flex-row justify-center'}>
                <Text className="text-center font-bold mt-1 text-xl">{Math.round(content?.consosWeek)}</Text>
                <Text className="text-center font-bold mt-1 text-lg">
                  {' '}
                  {Math.round(content?.consosWeek) > 1 ? 'unités' : 'unité'}
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[#4030A5] font-semibold text-center text-xs">Objectif max</Text>
              {content?.consosWeekGoal ? (
                <View className={'flex flex-row justify-center'}>
                  <Text className="text-center font-bold mt-1 text-xl">{Math.round(content?.consosWeekGoal)}</Text>
                  <Text className="text-center font-bold mt-1 text-lg">
                    {' '}
                    {Math.round(content?.consosWeekGoal) > 1 ? 'unités' : 'unité'}
                  </Text>
                </View>
              ) : (
                <Text className="text-center font-bold mt-1 text-xl">?</Text>
              )}
            </View>
          </View>
          <Text className="text-center mt-4">
            {content?.consommationContent?.split('__')?.map((string, index) => {
              return (
                <React.Fragment key={string}>
                  <TextStyled bold={index % 2}>{string}</TextStyled>
                </React.Fragment>
              );
            })}
          </Text>
          {content?.consosWeekGoal && (
            <View>
              <View className="flex flex-row justify-center">
                <View className="w-3/4 border border-[#DDDDDD] my-8"></View>
              </View>

              <View className="flex flex-row justify-around">
                <View>
                  <Text className="text-[#4030A5] text-center font-semibold text-xs">Jours où j'ai bu</Text>
                  <View className={'flex flex-row justify-center'}>
                    <Text className="text-center font-bold mt-1 text-xl ">{content?.drinkingDays}</Text>
                    <Text className="text-center font-bold mt-1 text-lg">
                      {' '}
                      {content?.drinkingDays > 1 ? 'jours' : 'jour'}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="text-[#4030A5] text-center font-semibold text-xs">Objectif max</Text>
                  <View className={'flex flex-row justify-center'}>
                    <Text className="text-center font-bold mt-1 text-xl">{content?.drinkingDaysGoal}</Text>
                    <Text className="text-center font-bold mt-1 text-lg">
                      {' '}
                      {content?.drinkingDaysGoal > 1 ? 'jours' : 'jour'}
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="text-center mt-4">
                {content?.drinkingDaysContent?.split('__')?.map((string, index) => {
                  return (
                    <React.Fragment key={string}>
                      <TextStyled bold={index % 2}>{string}</TextStyled>
                    </React.Fragment>
                  );
                })}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalGoal;
