import React from 'react';
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
import Contact from './scenes/Contact/Contact';
import ConsoFollowUp from './scenes/ConsoFollowUp/ConsoFollowUp';
import Infos from './scenes/Infos/Infos';
import NPS from './scenes/NPS/NPS';
import AppStateHandler from './services/AppStateHandler';
import GuidanceIcon from './components/Illustrations/GuidanceIcon';
import FollowUpIcon from './components/Illustrations/FollowUpIcon';
import InfosIcon from './components/Illustrations/Infos';
import DefisIcon from './components/Illustrations/Defis';
import AddDrinkNavigator from './scenes/AddDrink/AddDrinkNavigator';
import AddDrinkCTAButton from './scenes/AddDrink/AddDrinkCTAButton';
import Defi7DaysNavigator from './scenes/Defis/Defi7Days/Defi7Days';
import Gains from './scenes/Gains/Gains'

import QuizzOnboarding from './scenes/Quizzs/QuizzOnboarding';

const Tabs = createBottomTabNavigator();
const TabsNavigator = ({ navigation }) => {
  const tabPressListener = ({ navigation, rootName }) => {
    return {
      blur: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: rootName }],
        });
      },
    };
  };

  return (
    <>
      <Tabs.Navigator
        initialRouteName={'DEFI'}
        lazy={false}
        tabBarOptions={{
          activeTintColor: '#4030A5',
          inactiveTintColor: '#5150A225',
          keyboardHidesTabBar: true,
        }}>
        <Tabs.Screen
          name="GAINS"
          options={{
            tabBarLabel: 'Gains',
            tabBarIcon: ({ size, color }) => <InfosIcon size={size} color={color} />,
          }}
          component={Gains}
        />
        <Tabs.Screen
          name="DEFI"
          options={{
            tabBarLabel: 'Défis',
            tabBarIcon: ({ size, color }) => <DefisIcon size={size} color={color} />,
          }}
          component={Defi7DaysNavigator}
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
          name="CONTACT"
          options={{
            tabBarLabel: 'Santé',
            tabBarIcon: ({ size, color }) => <GuidanceIcon size={size} color={color} />,
          }}
          component={Contact}
        />
        <Tabs.Screen
          name="INFOS"
          options={{
            tabBarLabel: 'Infos',
            tabBarIcon: ({ size, color }) => <InfosIcon size={size} color={color} />,
          }}
          component={Infos}
          listeners={(props) => tabPressListener({ ...props, rootName: 'INFOS_TAB' })}
        />
      </Tabs.Navigator>
      <AddDrinkCTAButton onCTAPress={() => navigation.push('ADD_DRINK', { timestamp: Date.now() })} />
    </>
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
    // await AsyncStorage.clear();
    const onBoardingDone = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_ONBOARDING_DONE);
    if (!onBoardingDone) return this.setState({ initialRouteName: 'WELCOME' });
    const onBoardingAnswersExist = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ONBOARDING_ANSWERS);
    if (!onBoardingAnswersExist) return this.setState({ initialRouteName: 'ONBOARDING_QUIZZ' });
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
            <Root.Screen
              name="ONBOARDING_QUIZZ"
              component={QuizzOnboarding}
              initialParams={{
                onboarding: true,
              }}
            />
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
