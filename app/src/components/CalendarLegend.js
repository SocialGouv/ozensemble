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
            <TextStyled className="text-xs">Pas bu</TextStyled>
          </View>
          {isOnboarded ? (
            <View>
              <View className="flex flex-row items-center">
                <View className="bg-[#34D39A] w-5 h-5 rounded-md mt-1 mr-1" />
                <TextStyled className="text-xs mt-1">Dans l'objectif</TextStyled>
              </View>
              <View className="flex flex-row items-center">
                <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1" />
                <TextStyled className="text-xs mt-1">Au dessus de l'objectif</TextStyled>
              </View>
            </View>
          ) : (
            <View>
              <View className="flex flex-row items-center">
                <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1" />
                <TextStyled className="text-xs mt-1">Bu</TextStyled>
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
                <TextStyled className="text-xs">Réussi</TextStyled>
              </View>
              <View className="flex flex-row items-center space-x-2 mb-1">
                <CrossDefisFailed />
                <TextStyled className="text-xs">Dépassé</TextStyled>
              </View>
              <View className="flex flex-row items-center space-x-2">
                <OnGoingGoal />
                <TextStyled className="text-xs">En cours</TextStyled>
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
                <TextStyled className="font-bold">Pas bu</TextStyled>
                <TextStyled>Vous avez indiqué ne pas avoir bu ce jour.</TextStyled>
              </View>
            </View>
            <View className="flex flex-row mt-6">
              <View className="bg-[#34D39A] w-5 h-5 rounded-md mr-2"></View>
              <View>
                <TextStyled className="font-bold">Dans l'objectif</TextStyled>
                <View className="flex flex-row flex-wrap" style={{ paddingRight: defaultPaddingFontScale() }}>
                  <TextStyled>
                    Vos consommations de ce jour sont
                    <TextStyled className="font-semibold"> inférieures </TextStyled>ou
                    <TextStyled className="font-semibold"> égales </TextStyled>à l'objectif fixé par jour.
                  </TextStyled>
                </View>
              </View>
            </View>
            <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
              <View className="bg-[#FF7878] w-5 h-5 rounded-md mr-2"></View>
              <View>
                <TextStyled className="font-bold">Au dessus de l'objectif</TextStyled>
                <View className="flex flex-row flex-wrap">
                  <TextStyled>
                    Vos consommations de ce jour sont<TextStyled className="font-semibold"> supérieures </TextStyled>à
                    l'objectif fixé par jour.
                  </TextStyled>
                </View>
              </View>
            </View>
            <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
              <View className="w-5 h-5 rounded-md mr-2 border border-dashed border-[#4030A5]"></View>
              <View>
                <TextStyled className="font-bold">Jour à compléter</TextStyled>
                <View className="flex flex-row flex-wrap">
                  <TextStyled>Complétez les consommations de ce jour même si vous n'avez rien bu.</TextStyled>
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
                  <TextStyled className="font-bold">Objectif réussi</TextStyled>
                  <TextStyled className="flex flex-row flex-wrap">
                    Vos consommations de cette semaine sont
                    <TextStyled className="font-bold"> dans </TextStyled>
                    <TextStyled>votre objectif fixé et vous avez </TextStyled>
                    <TextStyled className="font-bold"> respecté </TextStyled>
                    le nombre de jours où vous vous autorisiez à boire.
                  </TextStyled>
                </View>
              </View>
              <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
                <CrossDefisFailed size={23} />
                <View className="ml-2">
                  <TextStyled className="font-bold">Objectif dépassé</TextStyled>
                  <TextStyled className="flex flex-row flex-wrap">
                    Vos consommations de cette semaine sont
                    <TextStyled className="font-bold"> supérieures </TextStyled>
                    <TextStyled>à votre objectif fixé</TextStyled>
                    <TextStyled className="font-bold"> et/ou </TextStyled>
                    <TextStyled>vous avez</TextStyled>
                    <TextStyled className="font-bold"> dépassé </TextStyled>
                    le nombre de jours où vous vous autorisiez à boire.
                  </TextStyled>
                </View>
              </View>
              <View className="flex flex-row mt-6" style={{ paddingRight: defaultPaddingFontScale() }}>
                <OnGoingGoal size={23} />
                <View className="ml-2">
                  <TextStyled className="font-bold">Objectif en cours</TextStyled>
                  <TextStyled className="flex flex-row flex-wrap">
                    Ajoutez vos consommations tous les jours de cette semaine pour accéder à son analyse.
                  </TextStyled>
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
