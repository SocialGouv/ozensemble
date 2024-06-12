import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { logEvent } from '../../services/logEventsWithMatomo';
import { isInCravingKeyState, leavingCravingNextTabState } from '../../recoil/craving';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const LeaveCravingModal = ({ navigation }) => {
  const leavingCravingNextTab = useRecoilValue(leavingCravingNextTabState);
  const setIsInCraving = useSetRecoilState(isInCravingKeyState);

  return (
    <SafeAreaView className="flex flex-grow justify-center items-center">
      <View className="bg-white rounded-xl max-w-[90%]">
        <View className=" flex w-full px-2 space-y-8 my-8">
          <Text className="text-start  text-xl px-2 font-extrabold text-[#4030A5]">
            Vous quittez votre espace d'aide au craving
          </Text>

          <Text className=" text-center px-2 font-semibold">Vous allez être redirigé vers la page demandée.</Text>
          <Text className=" text-center text-lg px-2 font-extrabold mx-5">
            Est-ce que les activités et conseils proposés vous ont aidés à surmonter votre craving ?
          </Text>
          <View className="flex flex-row justify-evenly p-2">
            <TouchableOpacity
              className="justify-center items-center rounded-3xl px-8 py-2 bg-[#4030A5] "
              onPress={() => {
                logEvent({
                  category: 'CRAVING_VOTE',
                  action: 'CRAVING_VOTE_YES',
                });
                setIsInCraving(false);
                navigation.goBack();
                navigation.navigate('TABS', { screen: leavingCravingNextTab });
              }}>
              <Text className="text-xl text-white font-extrabold">Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="justify-center items-center rounded-3xl  px-8 py-2 bg-[#DE285E]"
              onPress={() => {
                logEvent({
                  category: 'CRAVING_VOTE',
                  action: 'CRAVING_VOTE_NO',
                });
                setIsInCraving(false);
                navigation.goBack();
                navigation.navigate('TABS', { screen: leavingCravingNextTab });
              }}>
              <Text className="text-xl text-white font-extrabold">Non</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-center">
            <TouchableOpacity
              className="justify-center items-center rounded-3xl"
              onPress={() => {
                logEvent({
                  category: 'CRAVING_VOTE',
                  action: 'CRAVING_CANCEL',
                });
                setIsInCraving(false);
                navigation.goBack();
                navigation.navigation.navigate('TABS', { screen: leavingCravingNextTab });
              }}>
              <Text className="text-[#4030A5] font-semibold underline">Ne pas répondre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LeaveCravingModal;
