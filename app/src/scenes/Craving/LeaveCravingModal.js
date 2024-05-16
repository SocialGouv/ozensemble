import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { logEvent } from '../../services/logEventsWithMatomo';
import Modal from '../../components/Modal';

const LeaveCravingModal = ({ navigation }) => {
  return (
    <Modal className="flex flex-grow justify-center items-center" animationType="fade" withBackground>
      <View className="bg-white rounded-xl max-w-[90%]">
        <View className=" flex w-full px-2 space-y-8 my-8">
          <Text className="text-start  text-xl px-2 font-extrabold text-[#4030A5]">
            Vous quittez votre espace d'aide au craving
          </Text>

          <Text className=" text-center px-2 font-semibold">Vous allez être redirigé vers la page demandée.</Text>
          <Text className=" text-center text-lg px-2 font-extrabold mx-5">
            Est-ce que les activités et conseils proposés vous ont aidés à surmonter votre craving ?
          </Text>
          <View className="flex flex-row justify-center p-2 ">
            <TouchableOpacity
              className="justify-center  items-center rounded-3xl h-12 w-24 bg-[#4030A5] "
              onPress={() => {
                navigation.goBack();
                logEvent({
                  category: 'CRAVING_VOTE',
                  action: 'CRAVING_VOTE_YES',
                });
              }}>
              <Text className="text-xl color-white font-extrabold">Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="justify-center  items-center rounded-3xl h-12 w-24 bg-[#DE285E] ml-7"
              onPress={() => {
                navigation.goBack();
                logEvent({
                  category: 'CRAVING_VOTE',
                  action: 'CRAVING_VOTE_NO',
                });
              }}>
              <Text className="text-xl color-white font-extrabold">Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LeaveCravingModal;
