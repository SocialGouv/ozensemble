import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import styled from 'styled-components';
import appJson from '../../../app.json';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale } from '../../styles/theme';
import CGUs from './CGUs';
import Export from './Export';
import PrivacyPolicy from './PrivacyPolicy';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import FakeData from '../../reference/mocks/FakeData';
import { capture } from '../../services/sentry';
import { shareApp } from '../../services/shareApp';
import ShareIcon from '../../components/illustrations/icons/ShareIcon';
import MentionsLegales from './MentionsLegales';
const InfosStack = createStackNavigator();

const Infos = () => {
  useToggleCTA({ navigator: 'Infos' });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <InfosStack.Navigator initialRouteName="INFOS_MENU" headerMode="none">
        <InfosStack.Screen name="INFOS_MENU" component={InfosMenu} />
        <InfosStack.Screen name="CGU">{({ navigation }) => <CGUs onClose={navigation.goBack} />}</InfosStack.Screen>
        <InfosStack.Screen name="MENTIONS_LEGALES">
          {({ navigation }) => <MentionsLegales onClose={navigation.goBack} />}
        </InfosStack.Screen>
        <InfosStack.Screen name="PRIVACY_POLICY">
          {({ navigation }) => <PrivacyPolicy onClose={navigation.goBack} />}
        </InfosStack.Screen>
        <InfosStack.Screen name="EXPORT" component={Export} />
        <InfosStack.Screen name="FAKE_DATA" component={FakeData} />
      </InfosStack.Navigator>
    </Background>
  );
};

const InfosMenu = ({ navigation }) => {
  const [debugPressed, setDebugPressed] = useState(0);
  useEffect(() => {
    if (debugPressed >= (__DEV__ ? 2 : 8)) navigation.navigate('FAKE_DATA');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugPressed]);

  return (
    <WrapperContainer title="Informations">
      <View style={styles.container}>
        <TouchableOpacity onPress={() => shareApp()} showArrow={false}>
          <View
            className="h-[70] border-b border-b-[#4030a522] flex flex-row justify-between items-center "
            style={styles.menuItem}>
            <Text>Partager l’application</Text>
            <View className="flex flex-row border items-center rounded-full py-1 px-2 border-[#4030A5] space-x-2 ">
              <ShareIcon />
              <Text className="text-[#4030A5] font-bold">Partager</Text>
            </View>
          </View>
        </TouchableOpacity>
        <MenuItem
          caption="Donner mon avis sur l’application"
          onPress={() => navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Infos' })}
        />
        <MenuItem caption="Exporter mes données" onPress={() => navigation.push('EXPORT')} />
        <MenuItem caption="Conditions Générales d'Utilisation" onPress={() => navigation.push('CGU')} />
        <MenuItem caption="Mentions Légales" onPress={() => navigation.push('MENTIONS_LEGALES')} />
        <MenuItem caption="Politique de Confidentialité" onPress={() => navigation.push('PRIVACY_POLICY')} />
        <View className="mt-7 flex items-center">
          <TouchableWithoutFeedback onPress={() => setDebugPressed((p) => p + 1)}>
            <VersionLabel>
              version {appJson.version.buildName} ({appJson.version.buildNumber})
            </VersionLabel>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </WrapperContainer>
  );
};

const MenuItem = ({ caption, onPress, showArrow = true }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      className="h-[70] border-b border-b-[#4030a522] flex flex-row justify-between items-center"
      style={styles.menuItem}>
      <Text>{caption}</Text>
      {showArrow && <Arrow>{'>'}</Arrow>}
    </View>
  </TouchableOpacity>
);

export default Infos;

const padding = defaultPaddingFontScale();

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: padding,
  },
  container: {
    marginHorizontal: -padding,
  },
});

const VersionLabel = styled(TextStyled)`
  color: #ddd;
`;

const Arrow = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;
