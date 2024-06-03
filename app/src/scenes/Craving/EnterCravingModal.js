import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from '../../components/Modal';
import { logEvent } from '../../services/logEventsWithMatomo';
import CravingIcon from '../../components/illustrations/CravingIcon';
import { useRecoilState } from 'recoil';
import { isInCravingKeyState } from '../../recoil/craving';

const EnterCravingModal = ({ enterCraving, setEnterCraving, onNo }) => {
  const [isInCraving, setIsInCraving] = useRecoilState(isInCravingKeyState);
  return (
    <Modal visible={enterCraving} animationType="fade" withBackground hideOnTouch>
      <View className="bg-white rounded-xl max-w-[90%]">
        <View className=" flex w-full px-2 space-y-8 my-8">
          <View className="items-center">
            <CravingIcon size={70} className="-mt-10" />
          </View>
          <Text className="text-start  text-xl px-2 font-extrabold text-[#4030A5]">
            Vous entrez dans votre espace d'aide au craving
          </Text>

          <Text className=" text-center px-2 font-semibold">Vous allez être redirigé vers la page demandée.</Text>
          <Text className=" text-center text-lg px-2 font-extrabold mx-5">Souhaitez-vous continuer ?</Text>
          <View className="flex flex-row justify-evenly p-2">
            <TouchableOpacity
              className="justify-center items-center rounded-3xl px-8 py-2 bg-[#4030A5] "
              onPress={() => {
                logEvent({
                  category: 'CRAVING_VOTE',
                  action: 'CRAVING_ENTER_YES',
                });
                setEnterCraving(false);
              }}>
              <Text className="text-xl text-white font-extrabold">Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="justify-center items-center rounded-3xl  px-8 py-2 bg-[#DE285E]"
              onPress={() => {
                logEvent({
                  category: 'CRAVING_VOTE',
                  action: 'CRAVING_ENTER_NO',
                });
                setEnterCraving(false);
                setIsInCraving(false);
                onNo();
              }}>
              <Text className="text-xl text-white font-extrabold">Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EnterCravingModal;
