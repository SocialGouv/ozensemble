import React, { useEffect, useMemo, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Linking, StatusBar } from 'react-native';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import RNBootSplash from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import DefisIcon from './components/illustrations/Defis';
import FollowUpIcon from './components/illustrations/FollowUpIcon';
import GuidanceIcon from './components/illustrations/GuidanceIcon';
import InfosIcon from './components/illustrations/Infos';
import AddDrinkCTAButton from './scenes/AddDrink/AddDrinkCTAButton';
import AddDrinkNavigator from './scenes/AddDrink/AddDrinkNavigator';
import ConsoFollowupNavigator from './scenes/ConsoFollowUp/ConsoFollowUp';
import HealthNavigator from './scenes/Health/HealthNavigator';
import GainsNavigator from './scenes/Gains/GainsNavigator';
import Infos from './scenes/Infos/Infos';
import WelcomeScreen from './scenes/WelcomeScreen/WelcomeScreen';
import useAppState from './services/useAppState';
import { initMatomo, logEvent } from './services/logEventsWithMatomo';
import { storage } from './services/storage';
import TextStyled from './components/TextStyled';
import CustomBootsplash, { showBootSplashState } from './components/CustomBootsplash';
import StarsTabIcon from './components/illustrations/StarsTabIcon';
import API from './services/api';
import DefisNavigator from './scenes/Defis/DefisNavigator';
import NewFeaturePopupDisplay from './services/NewFeaturePopup';
import { deepLinkingConfig } from './services/deepLink';
import EnvironmentIndicator from './components/EnvironmentIndicator';
import NPSScreen, { useCheckNeedNPS, useNPSNotif } from './scenes/NPS/NPSScreen';
import NotificationService from './services/notifications';
import BadgeAnnoucementModal from './scenes/Badges/BadgeAnnoucementModal';
import BadgeModal from './scenes/Badges/BadgeModal';

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
  useNPSNotif();
  useCheckNeedNPS();
  const showBootSplash = useRecoilValue(showBootSplashState);
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
        initialRouteName={'GAINS_NAVIGATOR'}
        lazy={false}
        tabBarOptions={{
          activeTintColor: '#4030A5',
          inactiveTintColor: '#767676',
          keyboardHidesTabBar: true,
        }}>
        <Tabs.Screen
          name="GAINS_NAVIGATOR"
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
          name="CONSO_FOLLOW_UP_NAVIGATOR"
          options={{
            tabBarLabel: (props) => <Label {...props}>Suivi</Label>,
            tabBarIcon: ({ size, color }) => <FollowUpIcon size={size} color={color} />,
          }}
          component={ConsoFollowupNavigator}
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
      <AddDrinkCTAButton
        onCTAPress={() => {
          navigation.push('ADD_DRINK', { timestamp: Date.now() });
          logEvent({
            category: 'CONSO',
            action: 'CONSO_OPEN_CONSO_ADDSCREEN',
            name: 'FROM_FLOATING_BUTTON',
          });
        }}
      />
      <NewFeaturePopupDisplay canShow={!showBootSplash} />
      <BadgeAnnoucementModal />
      <BadgeModal />
    </>
  );
};

const AppStack = createStackNavigator();
const App = () => {
  const initialRouteName = useMemo(() => {
    const onBoardingDone = storage.getBoolean('@OnboardingDoneWithCGU');
    if (!onBoardingDone) return 'WELCOME';
    return 'TABS';
  }, []);

  return (
    <AppStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}>
      <AppStack.Screen name="WELCOME" component={WelcomeScreen} />
      <AppStack.Screen
        name="ADD_DRINK"
        component={AddDrinkNavigator}
        options={{
          stackPresentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <AppStack.Screen name="TABS" component={TabsNavigator} />
    </AppStack.Navigator>
  );
};

enableScreens();
const RouterStack = createNativeStackNavigator();
const Router = () => {
  useAppState({
    isActive: () => logEvent({ category: 'APP', action: 'APP_OPEN' }),
    isInactive: () => logEvent({ category: 'APP', action: 'APP_CLOSE' }),
  });

  const initApp = async () => {
    await initMatomo();
    NotificationService.init();
    await logEvent({ category: 'APP', action: 'APP_OPEN' });
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
    logEvent({ category: 'NAVIGATION', action: route.name });
  };

  const handleInAppMessage = (inAppMessage) => {
    const [title, subTitle, actions = [], options = {}] = inAppMessage;
    if (!actions || !actions.length) return Alert.alert(title, subTitle);
    const actionsWithNavigation = actions.map((action) => {
      if (action.navigate) {
        action.onPress = () => {
          navigationRef.current.navigate(...action.navigate);
          if (action.event) logEvent(action.event);
        };
      }
      if (action.link) {
        action.onPress = () => {
          Linking.openURL(action.link);
          if (action.event) logEvent(action.event);
        };
      }
      return action;
    });
    Alert.alert(title, subTitle, actionsWithNavigation, options);
  };

  useEffect(() => {
    initApp();
    API.handleInAppMessage = handleInAppMessage;
  }, []);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          API.navigation = navigationRef.current;
        }}
        onStateChange={onNavigationStateChange}
        linking={deepLinkingConfig}>
        <StatusBar backgroundColor="#39cec0" barStyle="light-content" />
        <RouterStack.Navigator
          mode="modal"
          screenOptions={{
            headerShown: false,
          }}>
          <RouterStack.Screen name="APP" component={App} />
          <RouterStack.Screen
            name="NPS_SCREEN"
            component={NPSScreen}
            options={{
              stackPresentation: 'fullScreenModal',
              headerShown: false,
            }}
          />
        </RouterStack.Navigator>
        <EnvironmentIndicator />
      </NavigationContainer>
      <CustomBootsplash />
    </>
  );
};

export default Router;
