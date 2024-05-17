import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import ChillIcon from '../../components/illustrations/ChillIcon';
import FunIcon from '../../components/illustrations/FunIcon';
import SensationIcon from '../../components/illustrations/SensationIcon';
import { logEvent } from '../../services/logEventsWithMatomo';
import { defineStrategyState } from '../../recoil/strategies';
import { useEffect, useState } from 'react';
import { storage } from '../../services/storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TipIcon from '../../components/illustrations/TipIcon';
import NoStrategyIcon from '../../components/illustrations/NoStrategyIcon';
import { strategy } from '../../../../api/src/prisma';

const NoStrategy = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <ScrollView className="h-full w-screen px-6 mt-3 space-y-4">
          <BackButton content="< Retour" bold onPress={() => navigation.navigate('CRAVING_INDEX')} marginTop />
          <Text className="text-[#4030A5] text-2xl font-extrabold mb-4 mt-3 ">Définir ma stratégie</Text>
          <View className="flex flex-row ">
            <TipIcon size={20} className="mt-1 -mr-4 " />
            <Text className="text-start text-black text-base font-semibold">
              {'     '}
              Vous êtes dans un moment de craving, et nous sommes là pour vous aider !
            </Text>
          </View>
          <Text className="text-start text-[#DE285E] font-bold text-base">
            Sachez qu’un moment de craving n’est pas éternel, et dure généralement entre 5 et 20 minutes.
          </Text>
          <View className="flex flex-col ">
            <Text className="text-start text-black text-base font-semibold">
              Oz vous propose divers conseils et activités afin de vous accompagner dans ces moments délicats.{' '}
            </Text>
          </View>
          <View className="flex flex-row justify-center ">
            <NoStrategyIcon size={140} className="" />
          </View>
          <Text className="text-start text-black text-base font-semibold">
            Pour commencer, nous vous proposons de définir une stratégie à mettre en place afin de surmonter ce craving.{' '}
          </Text>
          <Text className="text-start text-black text-base font-semibold">
            Vous pourrez ajouter une nouvelle stratégie à chaque craving.{' '}
          </Text>

          <Text className="text-start text-black text-base font-extrabold">
            Cliquez sur “Commencer” pour commencer à définir votre première stratégie !{' '}
          </Text>
          <View className=" items-center mt-8">
            <View className="flex flex-row flex-wrap">
              <TouchableOpacity
                className="bg-[#DE285E] rounded-3xl "
                onPress={() =>
                  navigation.navigate('DEFINE_STRATEGY', {
                    strategyIndex: 0,
                  })
                }>
                <Text className="text-white text-xl font-bold py-3 px-7 ">Commencer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaProvider>
  );
};

export default NoStrategy;
