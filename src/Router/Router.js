import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash from 'react-native-bootsplash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import matomo from '../services/matomo';
import Background from '../components/Background';
import CONSTANTS from '../reference/constants';
import NotificationService from '../services/notifications';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import Quizz from '../Quizz/Quizz';
import Contact from '../Contact/Contact';
import ConsoFollowUp from '../ConsoFollowUp/ConsoFollowUp';
import Infos from '../Infos/Infos';
import DoctoLib from '../Contact/DoctoLib';
import NPS from '../NPS/NPS';
import AppStateHandler from '../services/AppStateHandler';
import DrinksModal from '../DrinksModal/DrinksModal';
import AddDrinkCTAButton from '../DrinksModal/AddDrinkCTAButton';
import { NavigationContainer } from '@react-navigation/native';
import GuidanceIcon from '../components/Illustrations/GuidanceIcon';
import FollowUpIcon from '../components/Illustrations/FollowUpIcon';
import TestsIcon from '../components/Illustrations/Tests';
import InfosIcon from '../components/Illustrations/Infos';

const Tabs = createBottomTabNavigator();
const TabsNavigator = ({ navigation, route }) => {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    (async () => {
      const answersExist = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
      if (!answersExist) return setInitialRouteName('Quizz');
      return setInitialRouteName('ConsoFollowUp');
    })();
  }, []);

  if (!initialRouteName) return null;

  return (
    <Background color="#39cec0" withSwiperContainer neverBottom>
      <Tabs.Navigator
        initialRouteName={initialRouteName}
        lazy={true}
        tabBarOptions={{
          activeTintColor: '#5352a3',
          inactiveTintColor: '#39cec066',
          keyboardHidesTabBar: true,
        }}>
        <Tabs.Screen
          name="Contact"
          options={{
            tabBarLabel: 'En parler',
            tabBarIcon: ({ size, color }) => <GuidanceIcon size={size} color={color} />,
          }}
          component={Contact}
        />
        <Tabs.Screen
          name="ConsoFollowUp"
          options={{
            tabBarLabel: 'Suivi',
            tabBarIcon: ({ size, color }) => <FollowUpIcon size={size} color={color} />,
          }}
          component={ConsoFollowUp}
        />
        <Tabs.Screen
          name="CTAPlaceHolder"
          options={{
            tabBarLabel: '',
            tabBarIcon: () => <AddDrinkCTAButton onCTAPress={() => navigation.push('DrinksModal')} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}>
          {() => null}
        </Tabs.Screen>
        <Tabs.Screen
          name="Quizz"
          options={{
            tabBarLabel: 'Tests',
            tabBarIcon: ({ size, color }) => <TestsIcon size={size} color={color} />,
          }}
          component={Quizz}
        />
        <Tabs.Screen
          name="Infos"
          options={{
            tabBarLabel: 'Infos',
            tabBarIcon: ({ size, color }) => <InfosIcon size={size} color={color} />,
          }}
          component={Infos}
        />
      </Tabs.Navigator>
    </Background>
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
    if (!onBoardingDone) return this.setState({ initialRouteName: 'WelcomeScreen' });
    return this.setState({ initialRouteName: 'Tabs' });
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
      <NavigationContainer
        ref={(r) => {
          this.navigationRef = r;
        }}
        onStateChange={this.onStateChange}>
        <StatusBar backgroundColor="#39cec0" barStyle="light-content" />
        {!!initialRouteName && (
          <Root.Navigator mode="modal" headerMode="none" initialRouteName={initialRouteName}>
            <Root.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Root.Screen name="DoctoLib" component={DoctoLib} />
            <Root.Screen name="NPS" component={NPS} />
            <Root.Screen name="DrinksModal" component={DrinksModal} />
            <Root.Screen name="Tabs" component={TabsNavigator} />
          </Root.Navigator>
        )}
        <AppStateHandler isActive={matomo.logAppVisit} isInactive={matomo.logAppClose} />
      </NavigationContainer>
    );
  }
}

export default Router;
