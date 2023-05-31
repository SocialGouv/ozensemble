import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import Confetti from './Confettis';

const ModalGainDetails = ({ content, onClose, visible }) => {
  const firstDayMonth = content?.firstDay?.split(' ')[1];
  const lastDayMonth = content?.lastDay?.split(' ')[1];
  const firstDayDisplay = firstDayMonth === lastDayMonth ? content?.firstDay?.split(' ')[0] : content?.firstDay;
  const caloriesTitle = content?.weekKcal <= content?.estimationKcal ? 'KCalories évitées' : 'Calories en plus';
  const eurosTitle = content?.weekExpenses <= content?.estimationExpenses ? 'Euros épargnés' : 'Euros non-épargnés';
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

        <View className=" p-2">
          <Text color="#000" className="text-center mb-1 text-xl font-extrabold">
            Résultats semaine
          </Text>
          <Text className="text-xs text-[#939EA6] text-center">
            semaine du {firstDayDisplay} au {content?.lastDay}
          </Text>
          <View className="flex flex-row mt-8 space-x-3">
            <View className="py-2 px-1 bg-[#F5F6FA] rounded-md grow basis-28">
              <Text className="text-[#939EA6] text-center text-xs">Estimation initiale</Text>
              <View className="flex flex-row grow justify-center">
                <Text className="text-center font-bold mt-1 text-xl">
                  {Math.round(content?.estimationExpenses * 10) / 10}
                </Text>
                <Text className="text-center font-bold mt-1 text-lg">€</Text>
              </View>
            </View>
            <View className="py-2 px-1 bg-[#F5F6FA] rounded-md grow basis-28">
              <Text className="text-[#939EA6] text-center text-xs">Consommation</Text>
              <View className="flex flex-row justify-center">
                <Text className="text-center font-bold mt-1 text-xl">
                  {Math.round(content?.weekExpenses * 10) / 10}
                </Text>
                <Text className="text-center font-bold mt-1 text-lg">€</Text>
              </View>
            </View>
          </View>
          <View className="py-2 mt-3 bg-[#F5F6FA] rounded-md">
            <Text className="text-center text-[#939EA6] text-xs">{eurosTitle}</Text>
            <View
              className={[
                'mx-auto px-2 py-1 rounded-md mt-2',
                eurosTitle === 'Euros non-épargnés' ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
              ].join(' ')}>
              <Text className="text-center text-white font-bold text-xl">
                {Math.round(Math.abs(content?.weekExpenses - content?.estimationExpenses) * 10) / 10}€
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-center">
            <View className="w-3/4 border border-[#DDDDDD] my-8"></View>
          </View>
          <View className="flex flex-row space-x-3">
            <View className="py-2 bg-[#F5F6FA] rounded-md grow basis-24">
              <Text className="text-[#939EA6] text-center text-xs">Estimation initiale</Text>
              <View className="flex flex-row justify-center items-baseline">
                <Text className="text-center font-bold mt-1 text-xl ">
                  {Math.round(content?.estimationKcal * 10) / 10}
                </Text>
                <Text className="text-center font-bold mt-1 text-base"> KCAL</Text>
              </View>
            </View>
            <View className="py-2 bg-[#F5F6FA] rounded-md grow basis-24">
              <Text className="text-[#939EA6] text-center text-xs">Consommation</Text>
              <View className="flex flex-row justify-center items-baseline">
                <Text className="text-center font-bold mt-1 text-xl">{Math.round(content?.weekKcal * 10) / 10}</Text>
                <Text className="text-center font-bold mt-1 text-base"> KCAL</Text>
              </View>
            </View>
          </View>
          <View className="py-2 bg-[#F5F6FA] rounded-md mt-3">
            <Text className="text-center text-[#939EA6] text-xs">{caloriesTitle}</Text>
            <View
              className={[
                'flex flex-row justify-center mx-auto px-2 py-1 rounded-md mt-2 items-baseline',
                caloriesTitle === 'Calories en plus' ? 'bg-[#FF7979]' : 'bg-[#3AD39D] ',
              ].join(' ')}>
              <Text className="text-center font-bold text-xl text-white">
                {Math.round(Math.abs(content?.weekKcal - content?.estimationKcal) * 10) / 10}
              </Text>
              <Text className="text-center font-bold text-base text-white"> KCAL</Text>
            </View>
          </View>
        </View>
      </View>

      {content?.status === 'Success' && <Confetti run={true} />}
    </Modal>
  );
};

export default ModalGainDetails;
