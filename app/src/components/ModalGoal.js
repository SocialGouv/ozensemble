import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import CrossDefisFailed from './illustrations/icons/CrossDefisFailed';
import CheckDefisValidated from './illustrations/icons/CheckDefisValidated';
import TextStyled from './TextStyled';
import InterogationMark from './illustrations/icons/InterogationMark';
import Confetti from './Confettis';
import OnGoingGoal from './illustrations/icons/OnGoingGoal';

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
          {content?.consosWeekGoal >= 0 && content?.status === 'NoGoal' && <InterogationMark size={50} />}
          {content?.consosWeekGoal >= 0 && content?.status === 'InProgress' && <OnGoingGoal size={50} />}
          {content?.consosWeekGoal >= 0 && content?.status === 'Failed' && <CrossDefisFailed size={50} />}
          {content?.consosWeekGoal >= 0 && content?.status === 'Success' && <CheckDefisValidated size={50} />}
        </View>

        <View className="mb-4 p-2">
          <TextStyled color="#000" className="text-center mb-1 text-xl font-extrabold">
            {content?.title}
          </TextStyled>
          <TextStyled className="text-xs text-[#939EA6] text-center">
            semaine du {firstDayDisplay} au {content?.lastDay}
          </TextStyled>
          <View className="flex flex-row justify-around mt-8">
            <View>
              <TextStyled className="text-[#4030A5] font-semibold text-center text-xs">Consos semaine</TextStyled>
              <View className={'flex flex-row justify-center'}>
                <TextStyled className="text-center font-bold mt-1 text-xl">
                  {Math.round(content?.consosWeek)}
                </TextStyled>
                <TextStyled className="text-center font-bold mt-1 text-lg">
                  {' '}
                  {Math.round(content?.consosWeek) > 1 ? 'unités' : 'unité'}
                </TextStyled>
              </View>
            </View>
            <View>
              <TextStyled className="text-[#4030A5] font-semibold text-center text-xs">Objectif max</TextStyled>
              {content?.consosWeekGoal >= 0 ? (
                <View className={'flex flex-row justify-center'}>
                  <TextStyled className="text-center font-bold mt-1 text-xl">
                    {Math.round(content?.consosWeekGoal)}
                  </TextStyled>
                  <TextStyled className="text-center font-bold mt-1 text-lg">
                    {' '}
                    {Math.round(content?.consosWeekGoal) > 1 ? 'unités' : 'unité'}
                  </TextStyled>
                </View>
              ) : (
                <TextStyled className="text-center font-bold mt-1 text-xl">?</TextStyled>
              )}
            </View>
          </View>
          {content?.consommationContent && (
            <TextStyled className="text-center mt-4">
              {content?.consommationContent?.split('__')?.map((string, index) => {
                return (
                  <React.Fragment key={string}>
                    <TextStyled bold={index % 2}>{string}</TextStyled>
                  </React.Fragment>
                );
              })}
            </TextStyled>
          )}

          {content?.consosWeekGoal >= 0 && (
            <View>
              <View className="flex flex-row justify-center">
                <View className="w-3/4 border border-[#DDDDDD] my-8"></View>
              </View>

              <View className="flex flex-row justify-around">
                <View>
                  <TextStyled className="text-[#4030A5] text-center font-semibold text-xs">Jours où j'ai bu</TextStyled>
                  <View className={'flex flex-row justify-center'}>
                    <TextStyled className="text-center font-bold mt-1 text-xl ">{content?.drinkingDays}</TextStyled>
                    <TextStyled className="text-center font-bold mt-1 text-lg">
                      {' '}
                      {content?.drinkingDays > 1 ? 'jours' : 'jour'}
                    </TextStyled>
                  </View>
                </View>
                <View>
                  <TextStyled className="text-[#4030A5] text-center font-semibold text-xs">Objectif max</TextStyled>
                  <View className={'flex flex-row justify-center'}>
                    <TextStyled className="text-center font-bold mt-1 text-xl">{content?.drinkingDaysGoal}</TextStyled>
                    <TextStyled className="text-center font-bold mt-1 text-lg">
                      {' '}
                      {content?.drinkingDaysGoal > 1 ? 'jours' : 'jour'}
                    </TextStyled>
                  </View>
                </View>
              </View>
              <TextStyled className="text-center mt-4">
                {content?.drinkingDaysContent?.split('__')?.map((string, index) => {
                  return (
                    <React.Fragment key={string}>
                      <TextStyled bold={index % 2}>{string}</TextStyled>
                    </React.Fragment>
                  );
                })}
              </TextStyled>
            </View>
          )}
        </View>
      </View>
      {content?.status === 'Success' && <Confetti run={true} />}
    </Modal>
  );
};

export default ModalGoal;
