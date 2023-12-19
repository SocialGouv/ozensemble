import React, { useEffect, useMemo, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Linking } from 'react-native';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import RNBootSplash from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Activities from './components/illustrations/Activities';
import FollowUpIcon from './components/illustrations/FollowUpIcon';
import GuidanceIcon from './components/illustrations/GuidanceIcon';
import InfosIcon from './components/illustrations/Infos';
import AddDrinkCTAButton from './scenes/AddDrink/AddDrinkCTAButton';
import AddDrinkNavigator from './scenes/AddDrink/AddDrinkNavigator';
import ConsoFollowupNavigator from './scenes/ConsoFollowUp/ConsoFollowUp';
import HealthNavigator from './scenes/Health/HealthNavigator';
import GainsNavigator from './scenes/Gains/GainsNavigator';
import Infos from './scenes/Infos/Infos';
import WelcomeScreen from './scenes/WelcomeScreen';
import useAppState from './services/useAppState';
import { initMatomo, logEvent } from './services/logEventsWithMatomo';
import { storage } from './services/storage';
import TextStyled from './components/TextStyled';
import CustomBootsplash, { showBootSplashState } from './components/CustomBootsplash';
import CalendarIcon from './components/illustrations/CalendarIcon';
import API from './services/api';
import DefisNavigator from './scenes/Defis/DefisNavigator';
import NewFeaturePopupDisplay from './services/NewFeaturePopup';
import { deepLinkingConfig } from './services/deepLink';
import EnvironmentIndicator from './components/EnvironmentIndicator';
import NPSScreen, { useCheckNeedNPS, useNPSNotif } from './scenes/NPS/NPSScreen';
import NotificationService from './services/notifications';
import BadgeModal from './scenes/Badges/BadgeModal';
import InAppModal from './components/InAppModal';
import Goal from './scenes/Gains/Goal';
import GainsReminder from './scenes/Gains/GainsReminder';
import GainsPreviousConsumption from './scenes/Gains/GainsPreviousConsumption';
import Sevrage from './scenes/Gains/Sevrage';
import UserSurvey from './scenes/Quizzs/UserSurvey';
import UserSurveyStart from './scenes/Quizzs/UserSurvey/UserSurveyStart';
import UserSurveyNotif from './scenes/Quizzs/UserSurvey/UserSurveyNotif';
import Official from './scenes/Infos/Official';

const Label = ({ children, focused, color }) => (
  <LabelStyled focused={focused} color={color}>
    {children}
  </LabelStyled>
);

const LabelStyled = styled(TextStyled)`
  ${(props) => `color: ${props.color};`}
  ${(props) => props.focused && 'font-weight: 700;'}
  font-size: 12px;
  margin-top: -3px;
  margin-bottom: 3px;
`;

const Tabs = createBottomTabNavigator();
const TabsNavigator = ({ navigation }) => {
  useNPSNotif();
  useCheckNeedNPS();
  const [showBootSplash, setShowBootsplash] = useRecoilState(showBootSplashState);

  return (
    <>
      <Tabs.Navigator
        initialRouteName={'CONSO_FOLLOW_UP_NAVIGATOR'}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4030A5',
          tabBarInactiveTintColor: '#767676',
          keyboardHidesTabBar: true,
          lazy: false,
        }}>
        <Tabs.Screen
          name="GAINS_NAVIGATOR"
          options={{
            tabBarLabel: (props) => <Label {...props}>Suivi</Label>,
            tabBarIcon: ({ size, color }) => <FollowUpIcon size={size} color={color} />,
          }}
          component={GainsNavigator}
        />
        <Tabs.Screen
          name="DEFI"
          options={{
            tabBarLabel: (props) => <Label {...props}>Activités</Label>,
            tabBarIcon: ({ size, color }) => <Activities size={size} color={color} />,
          }}
          component={DefisNavigator}
        />
        <Tabs.Screen
          name="CONSO_FOLLOW_UP_NAVIGATOR"
          options={{
            tabBarLabel: (props) => <Label {...props}>Calendrier</Label>,
            tabBarIcon: ({ size, color }) => <CalendarIcon size={size} color={color} />,
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
    </>
  );
};

const AppStack = createNativeStackNavigator();
const App = () => {
  const initialRouteName = useMemo(() => {
    const onBoardingDone = storage.getBoolean('@OnboardingDoneWithCGU');
    if (!onBoardingDone) return 'WELCOME';
    return 'TABS';
  }, []);

  return (
    <>
      <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
        <AppStack.Screen name="WELCOME" component={WelcomeScreen} />
        <AppStack.Screen name="USER_SURVEY_START" component={UserSurveyStart} />
        <AppStack.Screen name="USER_SURVEY_FROM_ONBOARDING" component={UserSurvey} />
        <AppStack.Screen name="TABS" component={TabsNavigator} />
      </AppStack.Navigator>
    </>
  );
};

const RootStack = createNativeStackNavigator();
const Root = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="APP">
      <RootStack.Screen name="APP" component={App} />
      <RootStack.Screen name="OFFICIAL">
        {({ navigation }) => <Official onClose={navigation.goBack} />}
      </RootStack.Screen>
      <RootStack.Screen name="USER_SURVEY_NOTIF" component={UserSurveyNotif} />
      <RootStack.Screen name="USER_SURVEY" component={UserSurvey} />
      <RootStack.Screen name="GAINS_ESTIMATE_PREVIOUS_CONSUMPTION" component={GainsPreviousConsumption} />
      <RootStack.Screen name="GAINS_MY_OBJECTIVE" component={Goal} />
      <RootStack.Screen name="GAINS_REMINDER" component={GainsReminder} />
      <RootStack.Screen
        name="GAINS_SEVRAGE"
        component={Sevrage}
        initialParams={{
          rootRoute: 'GAINS_MAIN_VIEW',
        }}
      />
    </RootStack.Navigator>
  );
};

enableScreens();
const ModalsStack = createNativeStackNavigator();
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

    // show new feature modal if any
    const matomoId = storage.getString('@UserIdv2');
    await API.post({
      path: '/appMilestone/init',
      body: {
        matomoId,
      },
    });
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
        <ModalsStack.Navigator
          initialRouteName="ROUTER"
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
          }}>
          <ModalsStack.Screen
            name="ROUTER"
            component={Root}
            options={{
              headerShown: false,
            }}
          />
          <ModalsStack.Screen
            name="ADD_DRINK"
            component={AddDrinkNavigator}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <ModalsStack.Screen
            name="MODAL_BADGE"
            component={BadgeModal}
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: 'rgba(0,0,0,0.3)' },
              animation: 'fade',
            }}
          />
          <ModalsStack.Screen
            name="IN_APP_MODAL"
            component={InAppModal}
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: 'rgba(0,0,0,0.3)' },
              animation: 'fade',
            }}
          />
          <ModalsStack.Screen
            name="NPS_SCREEN"
            component={NPSScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
        </ModalsStack.Navigator>
        <EnvironmentIndicator />
      </NavigationContainer>
    </>
  );
};

export default Router;
