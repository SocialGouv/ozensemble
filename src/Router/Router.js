import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import matomo from '../matomo';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import Quizz from '../Quizz/Quizz';
import Contact from '../Contact/Contact';
import ConsoFollowUp from '../ConsoFollowUp/ConsoFollowUp';
import Menu from './Menu';
import AsyncStorage from '@react-native-community/async-storage';
import CONSTANTS from '../reference/constants';
import questions from '../Quizz/questions';
import Background from '../components/Background';
import HeaderBackground from '../components/HeaderBackground';
import Reminder from '../Reminder/Reminder';
import { EmptyView } from '../Quizz/Results/styles';
import { checkIfThereIsDrinks } from '../ConsoFollowUp/consoDuck';
import useAppState from '../helpers/customHooks';

const showMenu = view => {
  switch (view) {
    case CONSTANTS.VIEW_CONTACT:
    case CONSTANTS.VIEW_CONSO:
    case CONSTANTS.VIEW_REMINDER:
    case CONSTANTS.VIEW_QUIZZ:
      return true;
    default:
      return false;
  }
};

const mapViewToScreen = view => {
  switch (view) {
    default:
    case CONSTANTS.VIEW_QUIZZ:
      return 0;
    case CONSTANTS.VIEW_CONTACT:
      return 1;
    case CONSTANTS.VIEW_CONSO:
      return 2;
    case CONSTANTS.VIEW_REMINDER:
      return 3;
  }
};

const Router = ({ theme, thereIsDrinks }) => {
  const [view, setView] = React.useState(null);
  const [screen, setScreen] = React.useState(null);
  const [initScreen, setInitScreen] = React.useState(null);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [iosNotifPermissionAsked, setIosNotifPermissionAsked] = React.useState(Platform.OS !== 'ios');
  const swiperRef = React.useRef(null);

  const goToScreen = nextScreen => {
    if (!swiperRef || !swiperRef.current) return;
    swiperRef.current.scrollTo(nextScreen, true);
    setScreen(nextScreen);
  };

  React.useEffect(() => {
    const setInitView = async () => {
      // setView(CONSTANTS.VIEW_REMINDER);
      // setInitScreen(mapViewToScreen(CONSTANTS.VIEW_REMINDER));
      // return;
      if (Platform.OS === 'ios') {
        const alreadyAskedIosNotifPermission = await AsyncStorage.getItem(
          CONSTANTS.STORE_KEY_ASKED_FOR_NOTIFICATIONS_IOS
        );
        if (alreadyAskedIosNotifPermission) setIosNotifPermissionAsked(true);
      }
      if (view) return true;
      await matomo.initMatomo();
      await matomo.logAppVisit();
      // await AsyncStorage.removeItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
      // await AsyncStorage.removeItem(CONSTANTS.STORE_KEY_QUIZZ_RESULT);
      // setView(CONSTANTS.VIEW_WELCOME);
      // return true;
      const answersStringified = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
      if (!answersStringified) {
        if (thereIsDrinks) {
          setView(CONSTANTS.VIEW_QUIZZ);
          setInitScreen(mapViewToScreen(CONSTANTS.VIEW_QUIZZ));
          matomo.logOpenPage(CONSTANTS.VIEW_QUIZZ, CONSTANTS.FROM_INIT_ROUTE);
        } else {
          setView(CONSTANTS.VIEW_WELCOME);
          setInitScreen(mapViewToScreen(CONSTANTS.VIEW_WELCOME));
        }
        return true;
      }
      const answers = JSON.parse(answersStringified);
      const numberOfQuestionsAnswered = Object.keys(answers).filter(questionKey => answers[questionKey] !== null)
        .length;
      switch (numberOfQuestionsAnswered) {
        case questions.length: {
          setView(CONSTANTS.VIEW_CONSO);
          setInitScreen(mapViewToScreen(CONSTANTS.VIEW_CONSO));
          matomo.logOpenPage(CONSTANTS.VIEW_CONSO, CONSTANTS.FROM_INIT_ROUTE);
          return true;
        }
        case 0: {
          if (thereIsDrinks) {
            setView(CONSTANTS.VIEW_QUIZZ);
            setInitScreen(mapViewToScreen(CONSTANTS.VIEW_QUIZZ));
            matomo.logOpenPage(CONSTANTS.VIEW_QUIZZ, CONSTANTS.FROM_INIT_ROUTE);
            return true;
          } else {
            setView(CONSTANTS.VIEW_WELCOME);
            setInitScreen(mapViewToScreen(CONSTANTS.VIEW_WELCOME));
            return true;
          }
        }
        default: {
          setView(CONSTANTS.VIEW_QUIZZ);
          setInitScreen(mapViewToScreen(CONSTANTS.VIEW_QUIZZ));
          matomo.logOpenPage(CONSTANTS.VIEW_QUIZZ, CONSTANTS.FROM_INIT_ROUTE);
          return true;
        }
      }
    };
    if (!view) {
      setInitView().finally(() => {
        RNBootSplash.hide({ duration: 0 });
      });
    }
  });

  React.useEffect(() => {
    if (view === CONSTANTS.VIEW_WELCOME && screen !== mapViewToScreen(CONSTANTS.VIEW_WELCOME)) {
      goToScreen(mapViewToScreen(CONSTANTS.VIEW_WELCOME));
    }
    if (view === CONSTANTS.VIEW_QUIZZ && screen !== mapViewToScreen(CONSTANTS.VIEW_QUIZZ)) {
      goToScreen(mapViewToScreen(CONSTANTS.VIEW_QUIZZ));
    }
    if (view === CONSTANTS.VIEW_CONTACT && screen !== mapViewToScreen(CONSTANTS.VIEW_CONTACT)) {
      goToScreen(mapViewToScreen(CONSTANTS.VIEW_CONTACT));
    }
    if (view === CONSTANTS.VIEW_CONSO && screen !== mapViewToScreen(CONSTANTS.VIEW_CONSO)) {
      goToScreen(mapViewToScreen(CONSTANTS.VIEW_CONSO));
    }
    if (view === CONSTANTS.VIEW_REMINDER && screen !== mapViewToScreen(CONSTANTS.VIEW_REMINDER)) {
      goToScreen(mapViewToScreen(CONSTANTS.VIEW_REMINDER));
    }
  }, [view, screen]);

  useAppState({
    onForeground: () => matomo.logAppVisit(),
    onBackground: () => matomo.logAppClose(),
  });

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={theme.colors.headerBackground} barStyle="light-content" />
      {view === CONSTANTS.VIEW_WELCOME && <WelcomeScreen view={view} setView={setView} />}
      {showMenu(view) && (
        <Background color="headerBackground" withSwiperContainer neverBottom>
          <EmptyView />
          <HeaderBackground />
          <Swiper loop={false} index={initScreen} showsPagination={false} scrollEnabled={false} ref={swiperRef}>
            <Quizz view={view} setView={setView} />
            <Contact
              onTextFocusInput={() => setInputFocused(true)}
              onTextFocusBlur={() => setInputFocused(false)}
              setView={setView}
            />
            <ConsoFollowUp view={view} setView={setView} />
            <Reminder view={view} setView={setView} iosNotifPermissionAsked={iosNotifPermissionAsked} />
          </Swiper>
        </Background>
      )}
      {!inputFocused && showMenu(view) && <Menu view={view} setView={setView} />}
    </SafeAreaProvider>
  );
};

const makeStateToProps = () => state => ({
  thereIsDrinks: checkIfThereIsDrinks(state),
});

export default connect(makeStateToProps)(withTheme(Router));
