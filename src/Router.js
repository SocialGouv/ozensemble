import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash from 'react-native-bootsplash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import matomo from './services/matomo';
import CONSTANTS from './reference/constants';
import NotificationService from './services/notifications';
import WelcomeScreen from './scenes/WelcomeScreen/WelcomeScreen';
import Defi from './scenes/Defi';
import Contact from './scenes/Contact/Contact';
import ConsoFollowUp from './scenes/ConsoFollowUp/ConsoFollowUp';
import Infos from './scenes/Infos/Infos';
import NPS from './scenes/NPS/NPS';
import AppStateHandler from './services/AppStateHandler';
import GuidanceIcon from './components/Illustrations/GuidanceIcon';
import FollowUpIcon from './components/Illustrations/FollowUpIcon';
import TestsIcon from './components/Illustrations/Tests';
import InfosIcon from './components/Illustrations/Infos';
import AddDrinkNavigator from './scenes/AddDrink/AddDrinkNavigator';
import AddDrinkCTAButton from './scenes/AddDrink/AddDrinkCTAButton';

const Tabs = createBottomTabNavigator();
const TabsNavigator = ({ navigation, route }) => {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem(CONSTANTS.STORE_KEY_CHALLENGE7DAYS_QUIZZ_J2_ANSWERS);
      return setInitialRouteName('DEFI');
      const answersExist = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
      if (!answersExist) return setInitialRouteName('TESTS');
    })();
  }, []);

  if (!initialRouteName) return null;

  return (
    <Tabs.Navigator
      initialRouteName={initialRouteName}
      lazy={false}
      tabBarOptions={{
        activeTintColor: '#5352a3',
        inactiveTintColor: '#39cec0cc',
        keyboardHidesTabBar: true,
      }}>
      <Tabs.Screen
        name="CONTACT"
        options={{
          tabBarLabel: 'En parler',
          tabBarIcon: ({ size, color }) => <GuidanceIcon size={size} color={color} />,
        }}
        component={Contact}
      />
      <Tabs.Screen
        name="CONSO_FOLLOW_UP"
        options={{
          tabBarLabel: 'Suivi',
          tabBarIcon: ({ size, color }) => <FollowUpIcon size={size} color={color} />,
        }}
        component={ConsoFollowUp}
      />
      <Tabs.Screen
        name="CTA_ADD_DRINK_PLACEHOLDER"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <AddDrinkCTAButton onCTAPress={() => navigation.push('ADD_DRINK', { timestamp: Date.now() })} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}>
        {() => null}
      </Tabs.Screen>
      <Tabs.Screen
        name="DEFI"
        options={{
          tabBarLabel: 'Défis',
          tabBarIcon: ({ size, color }) => <TestsIcon size={size} color={color} />,
        }}
        component={Defi}
      />
      <Tabs.Screen
        name="INFOS"
        options={{
          tabBarLabel: 'Infos',
          tabBarIcon: ({ size, color }) => <InfosIcon size={size} color={color} />,
        }}
        component={Infos}
      />
    </Tabs.Navigator>
  );
};
const Root = createStackNavigator();
class Router extends React.Component {
  state = {
    initialRouteName: null,
  };

  async componentDidMount() {
    NotificationService.init();
    this.initView();
    // BUG FIX: on Android, Swiper is jumping the index
    // -> we prefer to make the splash a bit longer to hide the jump
    await new Promise((resolve) => setTimeout(resolve, 500));
    RNBootSplash.hide({ duration: 250 });
  }

  initView = async () => {
    await matomo.initMatomo();
    await matomo.logAppVisit('initApp');
    const onBoardingDone = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_ONBOARDING_DONE);
    if (!onBoardingDone) return this.setState({ initialRouteName: 'WELCOME' });
    return this.setState({ initialRouteName: 'TABS' });
  };

  onStateChange = async () => {
    if (!this.navigationRef) return;
    const route = this.navigationRef.getCurrentRoute();
    if (route.name === this.prevCurrentRouteName) return;
    this.prevCurrentRouteName = route.name;
    matomo.logOpenPage(route.name);
  };

  render() {
    const { initialRouteName } = this.state;
    return (
      <NavigationContainer ref={(r) => (this.navigationRef = r)} onStateChange={this.onStateChange}>
        <StatusBar backgroundColor="#39cec0" barStyle="light-content" />
        {!!initialRouteName && (
          <Root.Navigator mode="modal" headerMode="none" initialRouteName={initialRouteName}>
            <Root.Screen name="WELCOME" component={WelcomeScreen} />
            <Root.Screen name="ADD_DRINK" component={AddDrinkNavigator} />
            <Root.Screen name="TABS" component={TabsNavigator} />
          </Root.Navigator>
        )}
        <AppStateHandler isActive={matomo.logAppVisit} isInactive={matomo.logAppClose} />
        <NPS />
      </NavigationContainer>
    );
  }
}

export default Router;
