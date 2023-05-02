import React from 'react';

import { ScrollView, View, Text, Modal } from 'react-native';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';
import H3 from '../../components/H3';
import LegendStar from '../../components/illustrations/icons/LegendStar';
import Svg, { Path } from 'react-native-svg';

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
            <View className="flex flex-row space-x-2">
              <LegendStar />
              <View>
                <Text className="font-bold">Pas bu</Text>
                <Text>Vous avez indiqué ne pas avoir bu ce jour.</Text>
              </View>
            </View>
            <View className="flex flex-row mt-4">
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
            <View className="flex flex-row mt-4" style={{ paddingRight: defaultPaddingFontScale() }}>
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
            <View className="flex flex-row mt-4" style={{ paddingRight: defaultPaddingFontScale() }}>
              <View className="w-5 h-5 rounded-md mr-2 border border-dotted border-[#4030A5]"></View>
              <View>
                <Text className="font-bold">Jour à compléter</Text>
                <View className="flex flex-row flex-wrap">
                  <Text>Complétez les consommations de ce jour même si vous n'avez rien bu.</Text>
                </View>
              </View>
            </View>
            <View className="mt-7 pb-60">
              <H3 bold color="#4030a5">
                Objectif{' '}
                <TextStyled color={'#4030a5'} underline>
                  semaine
                </TextStyled>
              </H3>
              <View className="flex flex-row mt-4" style={{ paddingRight: defaultPaddingFontScale() }}>
                <Svg width="18" height="14" viewBox="0 0 20 16" fill="none">
                  <Path
                    d="M17.9884 0.869063C17.5782 0.99797 17.5626 1.00969 12.3438 6.22844L7.20711 11.3613L4.88289 9.03703C2.72273 6.88469 2.53914 6.70891 2.29695 6.59563C1.67586 6.30656 1.0157 6.39641 0.523513 6.84172C0.132888 7.19328 -0.0585181 7.75578 0.0352318 8.26359C0.132888 8.78703 0.0703881 8.72063 3.31258 11.9511C6.14851 14.7792 6.32429 14.9472 6.56258 15.0527C6.86726 15.1855 7.28523 15.2245 7.56648 15.1503C8.04305 15.0214 7.83992 15.2128 13.9298 9.12297C20.2345 2.81047 19.8751 3.19719 19.9727 2.63859C20.1055 1.86125 19.6173 1.10734 18.8321 0.869063C18.6134 0.802657 18.1993 0.802657 17.9884 0.869063Z"
                    fill="#4030A5"
                  />
                </Svg>
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
              <View className="flex flex-row mt-4" style={{ paddingRight: defaultPaddingFontScale() }}>
                <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <Path
                    d="M1.15713 0.126122C0.659083 0.246239 0.231349 0.676903 0.117091 1.16909C0.0350595 1.52065 0.0965829 1.93374 0.275294 2.2355C0.316309 2.30288 1.50283 3.50991 2.91201 4.91909L5.47842 7.48257L2.87686 10.09C0.0760751 12.8966 0.152247 12.8117 0.0438485 13.2248C-0.0411124 13.5617 0.00576261 13.9103 0.181544 14.2414C0.456934 14.7599 1.1044 15.0119 1.78994 14.8683C2.2001 14.7804 2.0917 14.8771 4.87783 12.0939C6.2958 10.6789 7.47061 9.5187 7.48525 9.5187C7.4999 9.5187 8.67471 10.6759 10.0927 12.0939C12.4833 14.4816 12.6854 14.6749 12.8612 14.757C13.4677 15.0382 14.2001 14.924 14.619 14.4816C15.0146 14.0656 15.1054 13.4269 14.8476 12.8908C14.7626 12.7121 14.5575 12.5011 12.1317 10.0841L9.50674 7.47378L12.0585 4.91323C13.6493 3.31948 14.6396 2.30581 14.6864 2.22378C14.8153 1.99526 14.8622 1.77847 14.8476 1.46499C14.83 1.12807 14.7597 0.922997 14.5751 0.676903C14.2147 0.199364 13.5614 -0.00278473 12.9931 0.190575C12.6679 0.298973 12.5214 0.436668 9.97842 2.98257L7.48818 5.4728L4.92471 2.91811C2.16787 0.175926 2.23525 0.23452 1.83096 0.129051C1.62881 0.0763168 1.36221 0.0763168 1.15713 0.126122Z"
                    fill="#4030A5"
                  />
                </Svg>
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
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default LegendHelpModal;
