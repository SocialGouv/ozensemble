import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import Confetti from './Confettis';
import TextStyled from './TextStyled';

const ModalGainDetails = ({ content, onClose }) => {
  const firstDayMonth = content?.firstDay?.split(' ')[1];
  const lastDayMonth = content?.lastDay?.split(' ')[1];
  const firstDayDisplay = firstDayMonth === lastDayMonth ? content?.firstDay?.split(' ')[0] : content?.firstDay;
  const caloriesTitle = content?.weekKcal <= content?.estimationKcal ? 'KCalories évitées' : 'KCalories en plus';
  const eurosTitle = content?.weekExpenses <= content?.estimationExpenses ? 'Euros épargnés' : 'Euros non-épargnés';
  return (
    <Modal visible={!!content} animationType="fade" withBackground hideOnTouch>
      <View className="bg-white rounded-xl min-w-full">
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

        <View className=" p-2">
          <TextStyled color="#000" className="text-center mb-1 text-xl font-extrabold">
            Résultats semaine
          </TextStyled>
          <TextStyled className="text-xs text-[#939EA6] text-center">
            semaine du {firstDayDisplay} au {content?.lastDay}
          </TextStyled>
          {content?.isWeekCompleted ? (
            <>
              <View className="flex flex-row mt-8 space-x-3">
                <View className="py-2 px-1 bg-[#F5F6FA] rounded-md grow basis-28">
                  <TextStyled className="text-[#939EA6] text-center text-xs">Estimation initiale</TextStyled>
                  <View className="flex flex-row grow justify-center">
                    <TextStyled className="text-center font-bold mt-1 text-xl">
                      {Math.round(content?.estimationExpenses * 10) / 10}
                    </TextStyled>
                    <TextStyled className="text-center font-bold mt-1 text-lg">€</TextStyled>
                  </View>
                </View>
                <View className="py-2 px-1 bg-[#F5F6FA] rounded-md grow basis-28">
                  <TextStyled className="text-[#939EA6] text-center text-xs">Consommation</TextStyled>
                  <View className="flex flex-row justify-center">
                    <TextStyled className="text-center font-bold mt-1 text-xl">
                      {Math.round(content?.weekExpenses * 10) / 10}
                    </TextStyled>
                    <TextStyled className="text-center font-bold mt-1 text-lg">€</TextStyled>
                  </View>
                </View>
              </View>
              <View className="py-2 mt-3 bg-[#F5F6FA] rounded-md">
                <TextStyled className="text-center text-[#939EA6] text-xs">{eurosTitle}</TextStyled>
                <View
                  className={[
                    'mx-auto px-2 py-1 rounded-md mt-2',
                    eurosTitle === 'Euros non-épargnés' ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
                  ].join(' ')}>
                  <TextStyled className="text-center text-white font-bold text-xl">
                    {Math.round(Math.abs(content?.weekExpenses - content?.estimationExpenses) * 10) / 10}€
                  </TextStyled>
                </View>
              </View>
              <View className="flex flex-row justify-center">
                <View className="w-3/4 border border-[#DDDDDD] my-8"></View>
              </View>
              <View className="flex flex-row space-x-3">
                <View className="py-2 bg-[#F5F6FA] rounded-md grow basis-24">
                  <TextStyled className="text-[#939EA6] text-center text-xs">Estimation initiale</TextStyled>
                  <View className="flex flex-row justify-center items-baseline">
                    <TextStyled className="text-center font-bold mt-1 text-xl ">
                      {Math.round(content?.estimationKcal * 10) / 10}
                    </TextStyled>
                    <TextStyled className="text-center font-bold mt-1 text-base"> KCAL</TextStyled>
                  </View>
                </View>
                <View className="py-2 bg-[#F5F6FA] rounded-md grow basis-24">
                  <TextStyled className="text-[#939EA6] text-center text-xs">Consommation</TextStyled>
                  <View className="flex flex-row justify-center items-baseline">
                    <TextStyled className="text-center font-bold mt-1 text-xl">
                      {Math.round(content?.weekKcal * 10) / 10}
                    </TextStyled>
                    <TextStyled className="text-center font-bold mt-1 text-base"> KCAL</TextStyled>
                  </View>
                </View>
              </View>
              <View className="py-2 bg-[#F5F6FA] rounded-md mt-3">
                <TextStyled className="text-center text-[#939EA6] text-xs">{caloriesTitle}</TextStyled>
                <View
                  className={[
                    'flex flex-row justify-center mx-auto px-2 py-1 rounded-md mt-2 items-baseline',
                    caloriesTitle === 'KCalories en plus' ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
                  ].join(' ')}>
                  <TextStyled className="text-center font-bold text-xl text-white">
                    {Math.round(Math.abs(content?.weekKcal - content?.estimationKcal) * 10) / 10}
                  </TextStyled>
                  <TextStyled className="text-center font-bold text-base text-white"> KCAL</TextStyled>
                </View>
              </View>
            </>
          ) : (
            <View>
              <TextStyled className="text-center text-base mt-8 mb-4">
                Ajoutez vos consommations tous les jours de cette semaine pour accéder aux euros épargnés et aux
                KCalories évitées.
              </TextStyled>
            </View>
          )}
        </View>
      </View>

      {eurosTitle === 'Euros épargnés' && caloriesTitle === 'KCalories évitées' && content?.isWeekCompleted && (
        <Confetti run={true} />
      )}
    </Modal>
  );
};

export default ModalGainDetails;
