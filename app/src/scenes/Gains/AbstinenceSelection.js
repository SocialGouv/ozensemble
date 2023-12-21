import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { logEvent } from '../../services/logEventsWithMatomo';
import { storage } from '../../services/storage';

const AbstinenceSelection = ({ navigation, route }) => {
  const isFromInfo = route?.name.includes('ABSTINENCE_SELECTION');
  const onClose = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={{
        justifyContent: 'start',
        marginTop: Dimensions.get('window').height * 0.3,
      }}
      className=" rounded-t-xl">
      <View className="bg-white rounded-xl mx-5">
        <View className=" flex w-full mb-2 px-2">
          <Text className="text-center mb-3 text-xl mt-8 px-2 font-extrabold">Compteur d'abstinence</Text>
          {isFromInfo && (
            <Text className="line text-lg text-justify  color-black mb-5 mx-6 mt-2">
              Il sera affiché sous votre calendrier et vous permettra de suivre vos jours consécutifs sans consommation
              d'alcool si vous avez fait le choix d'être abstinent.
            </Text>
          )}
          {!isFromInfo && (
            <Text className="line text-lg text-justify  color-black mb-5 mx-6 mt-2">
              Il vous permettra de suivre vos jours consécutifs sans consommation d’alcool si vous avez fait le choix
              d’être abstinent. Vous pourrez toujours modifier ce choix dans l’onglet Infos.
            </Text>
          )}
          <Text className=" text-center mb-1 text-xl px-2 font-bold">
            Voulez-vous activer le compteur d'abstinence ?
          </Text>
          <View className="flex flex-row justify-center p-2 mb-6 mt-2">
            <TouchableOpacity
              className="justify-center  items-center rounded-3xl h-12 w-24 bg-[#4030A5] "
              onPress={() => {
                onClose();
                storage.set('@isAbstinent', true);
                logEvent({
                  category: 'ABSTINENCE_SELECTION',
                  action: 'ABSTINENCE_SELECTION_YES',
                });
              }}>
              <Text className="text-xl color-white font-extrabold">Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="justify-center  items-center rounded-3xl h-12 w-24 bg-[#DE285E] ml-7"
              onPress={() => {
                onClose();
                storage.set('@isAbstinent', false);
                logEvent({
                  category: 'ABSTINENCE_SELECTION',
                  action: 'ABSTINENCE_SELECTION_NO',
                });
              }}>
              <Text className="text-xl color-white font-extrabold">Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AbstinenceSelection;
