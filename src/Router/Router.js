import React from 'react';
import { Platform, StatusBar, AppState, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import RNBootSplash from 'react-native-bootsplash';
import Swiper from 'react-native-swiper';
import { withTheme } from 'styled-components';
import matomo from '../matomo';
import Background from '../components/Background';
import HeaderBackground from '../components/HeaderBackground';
import CONSTANTS from '../reference/constants';
import NotificationService from '../services/notifications';
import Menu from './Menu';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import Quizz from '../Quizz/Quizz';
import questions from '../Quizz/questions';
import { EmptyView } from '../Quizz/Results/styles';
import Contact from '../Contact/Contact';
import ConsoFollowUp from '../ConsoFollowUp/ConsoFollowUp';
import Infos from '../Infos/Infos';
import DoctoLib from '../Contact/DoctoLib';
import NPS from '../NPS/NPS';

const showMenu = view => {
  switch (view) {
    case CONSTANTS.VIEW_CONTACT:
    case CONSTANTS.VIEW_CONSO:
    case CONSTANTS.VIEW_INFOS:
    case CONSTANTS.VIEW_QUIZZ:
      return true;
    case CONSTANTS.VIEW_WELCOME:
    default:
      return false;
  }
};

const mapViewToScreen = view => {
  switch (view) {
    case CONSTANTS.VIEW_CONTACT:
      return 0;
    case CONSTANTS.VIEW_CONSO:
      return 1;
    case CONSTANTS.VIEW_QUIZZ:
    default:
      return 2;
    case CONSTANTS.VIEW_INFOS:
      return 3;
  }
};

class Router extends React.PureComponent {
  state = {
    view: null,
    showDoctoLib: false,
    NPSKey: 0,
    initScreen: null,
    forceOpenDrinksModal: false,
  };

  componentDidMount() {
    this.initApp();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  initApp = async () => {
    const { view } = this.props;
    this.notificationService = new NotificationService(this.handleNotification);
    if (!view) await this.initView();
    RNBootSplash.hide({ duration: 0 });
    if (!this.state.NPSKey) this.setState({ NPSKey: 1 });
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  initView = async () => {
    await matomo.initMatomo();
    await matomo.logAppVisit('initApp');
    const onBoardingDone = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_ONBOARDING_DONE);
    if (!onBoardingDone) {
      this.setInitScreen(CONSTANTS.VIEW_WELCOME);
      return;
    }
    const answersStringified = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
    if (!answersStringified) {
      this.setInitScreen(CONSTANTS.VIEW_QUIZZ);
      return;
    }
    const answers = JSON.parse(answersStringified);
    const numberOfQuestionsAnswered = Object.keys(answers).filter(key => answers[key] !== null)
      .length;
    if (numberOfQuestionsAnswered === questions.length) {
      this.setInitScreen(CONSTANTS.VIEW_CONSO);
    } else {
      this.setInitScreen(CONSTANTS.VIEW_QUIZZ);
    }
  };

  setView = view => {
    this.setState({ view }, () => {
      const nextScreen = mapViewToScreen(view);
      if (!this.swiperRef) return;
      this.swiperRef.scrollTo(nextScreen, true);
    });
  };

  setInitScreen = view => {
    this.setState({ view, initScreen: mapViewToScreen(view) });
    matomo.logOpenPage(view, CONSTANTS.FROM_INIT_ROUTE);
  };

  onCTAPress = () => {
    this.setState({ view: CONSTANTS.VIEW_CONSO, forceOpenDrinksModal: true }, () => {
      this.setState({ forceOpenDrinksModal: false });
    });
  };

  handleAppStateChange = newState => {
    const { NPSKey } = this.state;
    if (newState === 'active' && !NPSKey) {
      matomo.logAppVisit('handleAppStateChange');
      this.setState({ NPSKey: 1 });
    }
    if (newState.match(/inactive|background/) && Boolean(NPSKey)) {
      matomo.logAppClose();
      this.setState({ NPSKey: 0 });
    }
  };

  handleNotification = notification => {
    if (Platform.OS === 'android') {
      if (notification.title === CONSTANTS.NOTIF_NPS_TITLE) {
        /* ANDROID
        can make the opening of NPS it more precise if needed
        now the app is buggy on Android : the notifcation.foreground is always === false
        but when a user clicks on a notification while the app is on foreground,
        the app swirtches in background and go back in foreground in a millisecond,
        so that NPS is launched independantly from the notification.
        */
      }
      if (notification.title === CONSTANTS.NOTIF_REMINDER_TITLE) {
        this.setView(CONSTANTS.VIEW_CONSO);
        matomo.logConsoOpen(CONSTANTS.FROM_BACKGROUND_NOTIFICATION);
      }
    }
    if (Platform.OS === 'ios') {
      if (notification.foreground && !this.notifHandled) {
        this.notifHandled = true;
        if (notification.message === CONSTANTS.NOTIF_NPS_MESSAGE) {
          Alert.alert(
            CONSTANTS.NOTIF_NPS_TITLE,
            CONSTANTS.NOTIF_NPS_MESSAGE,
            [
              {
                text: 'Donner mon avis',
                onPress: () => {
                  this.setState(({ NPSKey }) => ({ NPSKey: NPSKey + 1 }));
                },
              },
              {
                text: 'Annuler',
                style: 'cancel',
                onPress: () => {
                  this.notifHandled = false;
                  AsyncStorage.setItem(CONSTANTS.STORE_KEY_NPS_DONE, 'true');
                },
              },
            ],
            { cancelable: true }
          );
        }
        if (notification.message === CONSTANTS.NOTIF_REMINDER_MESSAGE) {
          Alert.alert(
            CONSTANTS.NOTIF_REMINDER_TITLE,
            CONSTANTS.NOTIF_REMINDER_MESSAGE,
            [
              {
                text: 'Suivi',
                onPress: () => {
                  this.setView(CONSTANTS.VIEW_CONSO);
                  matomo.logConsoOpen(CONSTANTS.FROM_LOCAL_NOTIFICATION);
                  this.notifHandled = false;
                },
              },
              {
                text: 'Annuler',
                style: 'cancel',
                onPress: () => {
                  this.notifHandled = false;
                },
              },
            ],
            { cancelable: true }
          );
        }
      } else {
        if (notification.message === CONSTANTS.NOTIF_NPS_MESSAGE) {
          // nothing to do, the NPS launches by itself
        }
        if (notification.message === CONSTANTS.NOTIF_REMINDER_MESSAGE) {
          this.setView(CONSTANTS.VIEW_CONSO);
          matomo.logConsoOpen(CONSTANTS.FROM_BACKGROUND_NOTIFICATION);
        }
      }
    }
    notification.finish();
  };

  handleCloseDoctolib = () => this.setState({ showDoctoLib: false });
  handleShowDoctolib = () => this.setState({ showDoctoLib: true });

  render() {
    const { theme } = this.props;
    const { view, showDoctoLib, NPSKey, initScreen, forceOpenDrinksModal } = this.state;
    return (
      <SafeAreaProvider>
        <StatusBar backgroundColor={theme.colors.headerBackground} barStyle="light-content" />
        {view === CONSTANTS.VIEW_WELCOME && <WelcomeScreen view={view} setView={this.setView} />}
        {showMenu(view) && (
          <>
            <Background color="headerBackground" withSwiperContainer neverBottom>
              <EmptyView />
              <HeaderBackground />
              <Swiper
                loop={false}
                index={initScreen}
                showsPagination={false}
                scrollEnabled={false}
                ref={s => (this.swiperRef = s)}>
                <Contact setView={this.setView} onRdvRequest={this.handleShowDoctolib} />
                <ConsoFollowUp
                  view={view}
                  setView={this.setView}
                  forceOpenDrinksModal={forceOpenDrinksModal}
                />
                <Quizz view={view} setView={this.setView} />
                <Infos notificationService={this.notificationService} view={view} />
              </Swiper>
            </Background>
            <Menu view={view} setView={this.setView} onCTAPress={this.onCTAPress} />
          </>
        )}
        <DoctoLib visible={showDoctoLib} onClose={this.handleCloseDoctolib} />
        {Boolean(NPSKey) && <NPS key={NPSKey} notificationService={this.notificationService} />}
      </SafeAreaProvider>
    );
  }
}

export default withTheme(Router);
