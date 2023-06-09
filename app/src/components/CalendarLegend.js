import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, View, Text, Modal } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { logEvent } from '../services/logEventsWithMatomo';
import { isOnboardedSelector } from '../recoil/gains';
import { defaultPaddingFontScale } from '../styles/theme';
import TextStyled from './TextStyled';
import LegendStar from './illustrations/icons/LegendStar';
import ButtonPrimary from './ButtonPrimary';
import LegendInfos from './illustrations/icons/LegendInfos';
import CheckDefisValidated from './illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from './illustrations/icons/CrossDefisFailed';
import OnGoingGoal from './illustrations/icons/OnGoingGoal';
import BackButton from './BackButton';
import H3 from './H3';

const CalendarLegend = ({ navigateToFirstStep }) => {
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const isOnboarded = useRecoilValue(isOnboardedSelector);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setHelpModalVisible(true);
        }}
        disabled={!isOnboarded}
        className="flex flex-row justify-start mt-3 mb-3 bg-[#FAFAFA]"
        style={{ paddingHorizontal: defaultPaddingFontScale() }}>
        <View className="mt-2 mb-4">
          <View className="flex flex-row items-center space-x-1 mb-1">
            <TextStyled color={'#939EA6'} className="text-xs">
              Consommations jour
            </TextStyled>
            {isOnboarded && <LegendInfos />}
          </View>
          <View className="flex flex-row space-x-1 items-center">
            <LegendStar />
            <Text className="text-xs">Pas bu</Text>
          </View>
          {isOnboarded ? (
            <View>
              <View className="flex flex-row items-center">
                <View className="bg-[#34D39A] w-5 h-5 rounded-md mt-1 mr-1" />
                <Text className="text-xs mt-1">Dans l'objectif</Text>
              </View>
              <View className="flex flex-row items-center">
                <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1" />
                <Text className="text-xs mt-1">Au dessus de l'objectif</Text>
              </View>
            </View>
          ) : (
            <View>
              <View className="flex flex-row items-center">
                <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1" />
                <Text className="text-xs mt-1">Bu</Text>
              </View>
            </View>
          )}
        </View>
        <View className="mx-auto mt-2 mb-4">
          <View className="flex flex-row items-center space-x-1 mb-1 justify-center">
            <TextStyled color={'#939EA6'} className="text-xs">
              Objectif semaine
            </TextStyled>
            {isOnboarded && <LegendInfos />}
          </View>
          {isOnboarded ? (
            <View>
              <View className="flex flex-row items-center space-x-2 my-1 ">
                <CheckDefisValidated />
                <Text className="text-xs">Réussi</Text>
              </View>
              <View className="flex flex-row items-center space-x-2 mb-1">
                <CrossDefisFailed />
                <Text className="text-xs">Dépassé</Text>
              </View>
              <View className="flex flex-row items-center space-x-2">
                <OnGoingGoal />
                <Text className="text-xs">En cours</Text>
              </View>
            </View>
          ) : (
            <View className="mt-2">
              <ButtonPrimary content={'Me fixer un objectif'} small onPress={navigateToFirstStep} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <LegendHelpModal
        visible={helpModalVisible}
        hide={() => {
          setHelpModalVisible(false);
        }}
      />
    </>
  );
};

const LegendHelpModal = ({ visible, hide }) => {
  return (
    <Modal visible={visible} hide={hide} animationType="sheet" presentationStyle="formSheet">
      <View className="h-full w-full bg-white">
        <ScrollView>
          <View className="my-5" style={{ padding: defaultPaddingFontScale() }}>
            <BackButton content="Retour" bold onPress={hide} />
            <H3 bold color="#4030a5" className="mt-5 mb-4">
              Consommations{' '}
              <TextStyled color={'#4030a5'} underline>
                jour
              </TextStyled>
            </H3>
            <View className="flex flex-row space-x-2 mt-2">
              <LegendStar />
              <View>
                <Text className="font-bold">Pas bu</Text>
                <Text>Vous avez indiqué ne pas avoir bu ce jour.</Text>
              </View>
            </View>
            <View className="flex flex-row mt-6">
              <View className="bg-[#34D39A] w-5 h-5 rounded-md mr-2"></View>
              <View>
                <Text className="font-bold">Dans l'objectif</Text>
                <View className="flex flex-row flex-wrap" style={{ paddingRight: defaultPaddingFontScale() }}>
                  <Text>
                    Vos consommations de ce jour sont
                    <Text className="font-semibold"> inférieures </Text>ou
                    <Text className="font-semibold"> égales </Text>à l'objectif fixé par jour.
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
              <View className="bg-[#FF7878] w-5 h-5 rounded-md mr-2"></View>
              <View>
                <Text className="font-bold">Au dessus de l'objectif</Text>
                <View className="flex flex-row flex-wrap">
                  <Text>
                    Vos consommations de ce jour sont<Text className="font-semibold"> supérieures </Text>à l'objectif
                    fixé par jour.
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
              <View className="w-5 h-5 rounded-md mr-2 border border-dashed border-[#4030A5]"></View>
              <View>
                <Text className="font-bold">Jour à compléter</Text>
                <View className="flex flex-row flex-wrap">
                  <Text>Complétez les consommations de ce jour même si vous n'avez rien bu.</Text>
                </View>
              </View>
            </View>
            <View className="mt-7 pb-60">
              <H3 bold color="#4030a5" className="mb-2">
                Objectif{' '}
                <TextStyled color={'#4030a5'} underline>
                  semaine
                </TextStyled>
              </H3>
              <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
                <CheckDefisValidated size={23} />
                <View className="ml-2">
                  <Text className="font-bold">Objectif réussi</Text>
                  <Text className="flex flex-row flex-wrap">
                    Vos consommations de cette semaine sont
                    <Text className="font-bold"> dans </Text>
                    <Text>votre objectif fixé et vous avez </Text>
                    <Text className="font-bold"> respecté </Text>
                    le nombre de jours où vous vous autorisiez à boire.
                  </Text>
                </View>
              </View>
              <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
                <CrossDefisFailed size={23} />
                <View className="ml-2">
                  <Text className="font-bold">Objectif dépassé</Text>
                  <Text className="flex flex-row flex-wrap">
                    Vos consommations de cette semaine sont
                    <Text className="font-bold"> supérieures </Text>
                    <Text>à votre objectif fixé</Text>
                    <Text className="font-bold"> et/ou </Text>
                    <Text>vous avez</Text>
                    <Text className="font-bold"> dépassé </Text>
                    le nombre de jours où vous vous autorisiez à boire.
                  </Text>
                </View>
              </View>
              <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
                <OnGoingGoal size={23} />
                <View className="ml-2">
                  <Text className="font-bold">Objectif en cours</Text>
                  <Text className="flex flex-row flex-wrap">
                    Ajoutez vos consommations tous les jours de cette semaine pour accéder à son analyse.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CalendarLegend;
