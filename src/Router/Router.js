import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import RNBootSplash from 'react-native-bootsplash';
import Swiper from 'react-native-swiper';
import matomo from '../services/matomo';
import Background from '../components/Background';
import HeaderBackground from '../components/HeaderBackground';
import CONSTANTS from '../reference/constants';
import NotificationService from '../services/notifications';
import Menu from './Menu';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import Quizz from '../Quizz/Quizz';
import { EmptyView } from '../Quizz/Results/styles';
import Contact from '../Contact/Contact';
import ConsoFollowUp from '../ConsoFollowUp/ConsoFollowUp';
import Infos from '../Infos/Infos';
import DoctoLib from '../Contact/DoctoLib';
import NPS from '../NPS/NPS';
import AppStateHandler from '../services/AppStateHandler';
import DrinksModal from '../DrinksModal/DrinksModal';
import AddDrinkCTAButton from '../DrinksModal/AddDrinkCTAButton';

const showMenu = (view) => {
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

const mapViewToScreen = (view) => {
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
    showSetDrinksModal: false,
    initScreen: null,
    NPSKey: 0,
  };

  componentDidMount() {
    this.initApp();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  initApp = async () => {
    const { view } = this.props;
    NotificationService.init();
    if (!view) await this.initView();
    // BUG FIX: on Android, Swiper is jumping the index
    // -> we prefer to make the splash a bit longer to hide the jump
    await this.delay(500);
    RNBootSplash.hide({ duration: 250 });
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
    this.setInitScreen(CONSTANTS.VIEW_CONSO);
  };

  setView = (view) => {
    this.setState({ view }, () => {
      const nextScreen = mapViewToScreen(view);
      if (!this.swiperRef) return;
      this.swiperRef.scrollTo(nextScreen, true);
    });
  };

  setInitScreen = (view) => {
    this.setState({ view, initScreen: mapViewToScreen(view) });
    matomo.logOpenPage(view, CONSTANTS.FROM_INIT_ROUTE);
  };

  onCTAPress = () => {
    this.setState({ showSetDrinksModal: true }, () => {
      this.setView(CONSTANTS.VIEW_CONSO);
    });
  };

  handleCloseDoctolib = () => this.setState({ showDoctoLib: false });
  handleShowDoctolib = () => this.setState({ showDoctoLib: true });

  handleShowDrinksModal = () => this.setState({ showSetDrinksModal: true });
  handleCloseDrinksModal = () => this.setState({ showSetDrinksModal: false });

  forceShowNPS = () => this.setState(({ NPSKey }) => ({ NPSKey: NPSKey + 1 }));

  render() {
    const { view, showDoctoLib, initScreen, showSetDrinksModal, NPSKey } = this.state;
    console.log(view);
    return (
      <SafeAreaProvider>
        <StatusBar backgroundColor="#39cec0" barStyle="light-content" />
        {initScreen && (
          <>
            <Background color="#39cec0" withSwiperContainer neverBottom>
              <EmptyView />
              <HeaderBackground />
              <Swiper
                loop={false}
                index={initScreen}
                showsPagination={false}
                scrollEnabled={false}
                ref={(s) => (this.swiperRef = s)}>
                <Contact setView={this.setView} onRdvRequest={this.handleShowDoctolib} />
                <ConsoFollowUp
                  view={view}
                  setView={this.setView}
                  showSetDrinksModal={showSetDrinksModal}
                  onShowDrinksModal={this.handleShowDrinksModal}
                />
                <Quizz view={view} setView={this.setView} />
                <Infos view={view} setView={this.setView} forceShowNPS={this.forceShowNPS} />
              </Swiper>
            </Background>
            <Menu view={view} setView={this.setView} />
            <AddDrinkCTAButton onCTAPress={this.onCTAPress} />
            <NPS forceView={NPSKey} />
          </>
        )}
        <DoctoLib visible={showDoctoLib} onClose={this.handleCloseDoctolib} />
        <AppStateHandler isActive={matomo.logAppVisit} isInactive={matomo.logAppClose} />
        <DrinksModal visible={showSetDrinksModal} onClose={this.handleCloseDrinksModal} />
        <WelcomeScreen visible={view === CONSTANTS.VIEW_WELCOME} setView={this.setView} />
      </SafeAreaProvider>
    );
  }
}

export default Router;
