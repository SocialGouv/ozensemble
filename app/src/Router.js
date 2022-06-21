import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import RNBootSplash from 'react-native-bootsplash';
import DefisIcon from './components/illustrations/Defis';
import FollowUpIcon from './components/illustrations/FollowUpIcon';
import GuidanceIcon from './components/illustrations/GuidanceIcon';
import InfosIcon from './components/illustrations/Infos';
import AddDrinkCTAButton from './scenes/AddDrink/AddDrinkCTAButton';
import AddDrinkNavigator from './scenes/AddDrink/AddDrinkNavigator';
import ConsoFollowUp from './scenes/ConsoFollowUp/ConsoFollowUp';
import HealthNavigator from './scenes/Health/HealthNavigator';
import GainsNavigator from './scenes/Gains/GainsNavigator';
import Infos from './scenes/Infos/Infos';
import NPS from './scenes/NPS/NPS';
import WelcomeScreen from './scenes/WelcomeScreen/WelcomeScreen';
import useAppState from './services/useAppState';
import matomo from './services/matomo';
import NotificationService from './services/notifications';
import { storage } from './services/storage';
import TextStyled from './components/TextStyled';
import CustomBootsplash from './components/CustomBootsplash';
import StarsTabIcon from './components/illustrations/StarsTabIcon';
import API from './services/api';
import DefisNavigator from './scenes/Defis/DefisNavigator';
import NewFeaturePopupDisplay from './services/NewFeaturePopup';

const Label = ({ children, focused, color }) => (
  <LabelStyled focused={focused} color={color}>
    {children}
  </LabelStyled>
);

const LabelStyled = styled(TextStyled)`
  ${(props) => `color: ${props.color};`}
  ${(props) => props.focused && 'text-decoration-line: underline;'}
  font-size: 12px;
  margin-top: -3px;
  margin-bottom: 3px;
`;

const Tabs = createBottomTabNavigator();
const TabsNavigator = ({ navigation }) => {
  const resetOnTapListener = ({ navigation, rootName }) => {
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
        initialRouteName={'GAINS_MAIN_VIEW'}
        lazy={false}
        tabBarOptions={{
          activeTintColor: '#4030A5',
          inactiveTintColor: '#767676',
          keyboardHidesTabBar: true,
        }}>
        <Tabs.Screen
          name="GAINS_MAIN_VIEW"
          options={{
            tabBarLabel: (props) => <Label {...props}>Gains</Label>,
            tabBarIcon: ({ size, color }) => <StarsTabIcon size={size} color={color} fillOpacity={1} />,
          }}
          component={GainsNavigator}
        />
        <Tabs.Screen
          name="DEFI"
          options={{
            tabBarLabel: (props) => <Label {...props}>Défis</Label>,
            tabBarIcon: ({ size, color }) => <DefisIcon size={size} color={color} />,
          }}
          component={DefisNavigator}
        />
        <Tabs.Screen
          name="CONSO_FOLLOW_UP"
          options={{
            tabBarLabel: (props) => <Label {...props}>Suivi</Label>,
            tabBarIcon: ({ size, color }) => <FollowUpIcon size={size} color={color} />,
          }}
          component={ConsoFollowUp}
        />
        <Tabs.Screen
          name="HEALTH"
          options={{
            tabBarLabel: (props) => <Label {...props}>Santé</Label>,
            tabBarIcon: ({ size, color }) => <GuidanceIcon size={size} color={color} />,
          }}
          component={HealthNavigator}
        />
        <Tabs.Screen
          name="INFOS"
          options={{
            tabBarLabel: (props) => <Label {...props}>Infos</Label>,
            tabBarIcon: ({ size, color }) => <InfosIcon size={size} color={color} />,
          }}
          component={Infos}
          listeners={(props) => resetOnTapListener({ ...props, rootName: 'INFOS_MENU' })}
        />
      </Tabs.Navigator>
      <AddDrinkCTAButton onCTAPress={() => navigation.push('ADD_DRINK', { timestamp: Date.now() })} />
      <NewFeaturePopupDisplay />
    </>
  );
};

const Root = createStackNavigator();
const Router = () => {
  const [initialRouteName, setInitialRouteName] = useState(null);
  useAppState({ isActive: matomo.logAppVisit, isInactive: matomo.logAppClose });

  const initApp = async () => {
    NotificationService.init();
    await matomo.initMatomo();
    await matomo.logAppVisit('initApp');
    const onBoardingDone = storage.getBoolean('@OnboardingDoneWithCGU');
    if (!onBoardingDone) {
      setInitialRouteName('WELCOME');
    } else {
      setInitialRouteName('TABS');
    }
    // storage.clearAll();
    // BUG FIX: on Android, Swiper is jumping the index
    // -> we prefer to make the splash a bit longer to hide the jump
    await new Promise((resolve) => setTimeout(resolve, 500));
    RNBootSplash.hide({ fade: true });
  };

  const navigationRef = useRef(null);
  const prevCurrentRouteName = useRef(null);
  const onNavigationStateChange = async () => {
    if (!navigationRef.current) return;
    const route = navigationRef.current.getCurrentRoute();
    if (route.name === prevCurrentRouteName.current) return;
    prevCurrentRouteName.current = route.name;
    matomo.logOpenPage(route.name);
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          API.navigation = navigationRef.current;
        }}
        onStateChange={onNavigationStateChange}>
        <StatusBar backgroundColor="#39cec0" barStyle="light-content" />
        {!!initialRouteName && (
          <Root.Navigator mode="modal" headerMode="none" initialRouteName={initialRouteName}>
            <Root.Screen name="WELCOME" component={WelcomeScreen} />
            <Root.Screen name="ADD_DRINK" component={AddDrinkNavigator} />
            <Root.Screen name="TABS" component={TabsNavigator} />
          </Root.Navigator>
        )}
        <NPS />
      </NavigationContainer>
      <CustomBootsplash />
    </>
  );
};

export default Router;
