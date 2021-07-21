import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import { useBackHandler } from '../helpers/customHooks';
import { ScreenBgStyled, MenuItemStyled, Arrow, TopTitle } from './styles';
import Swiper from 'react-native-swiper';
import TextStyled from '../components/TextStyled';
import CONSTANTS from '../reference/constants';
import Reminder from '../Reminder/Reminder';
import Export from '../Export/Export';
import CGUs from './CGUs';
import PrivacyPolicy from './PrivacyPolicy';

const Infos = ({ setView, forceShowNPS }) => {
  const [screen, setScreen] = React.useState(0);
  const [subView, setSubView] = React.useState(null);
  const [showNPS, setShowNPS] = React.useState(0);

  const swiperRef = React.useRef(null);
  const forceNPSTimeout = React.useRef(null);

  const onBackHandlerPressed = () => {
    if (screen === 1) {
      setScreen(0);
    }
    return true;
  };

  const showSubview = (nextSubView) => {
    setSubView(nextSubView);
    setTimeout(() => {
      setScreen(1);
    }, 250);
  };

  const onEmptyPress = () => {
    clearTimeout(forceNPSTimeout.current);
    if (showNPS < 4) {
      setShowNPS(showNPS + 1);
      forceNPSTimeout.current = setTimeout(() => {
        setShowNPS(0);
      }, 3000);
    } else {
      setShowNPS(0);
      forceShowNPS();
    }
  };

  React.useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.scrollTo(screen, true);
  }, [screen]);

  useBackHandler(onBackHandlerPressed);

  return (
    <Swiper loop={false} index={0} showsPagination={false} scrollEnabled={false} ref={swiperRef}>
      <InfosMenu onShowSubview={showSubview} onEmptyPress={onEmptyPress} />
      <ScreenBgStyled>
        {subView === CONSTANTS.VIEW_REMINDER && <Reminder setView={setView} onBackPress={onBackHandlerPressed} />}
        {subView === CONSTANTS.VIEW_EXPORT && <Export onBackPress={onBackHandlerPressed} />}
        {subView === CONSTANTS.VIEW_CGU && <CGUs onClose={onBackHandlerPressed} />}
        {subView === CONSTANTS.VIEW_PRIVACY_POLICY && <PrivacyPolicy onClose={onBackHandlerPressed} />}
      </ScreenBgStyled>
    </Swiper>
  );
};

const InfosMenu = ({ onShowSubview, onEmptyPress }) => (
  <ScreenBgStyled>
    <TopTitle>
      <TextStyled color="#4030a5">Mes informations</TextStyled>
    </TopTitle>
    <MenuItem caption="Rappel" onPress={() => onShowSubview(CONSTANTS.VIEW_REMINDER)} />
    <MenuItem caption="Conditions Générales d'Utilisation" onPress={() => onShowSubview(CONSTANTS.VIEW_CGU)} />
    <MenuItem caption="Privacy Policy" onPress={() => onShowSubview(CONSTANTS.VIEW_PRIVACY_POLICY)} />
    <MenuItem caption="Exporter mes données" onPress={() => onShowSubview(CONSTANTS.VIEW_EXPORT)} />
    <MenuItem notVisible onPress={() => onEmptyPress()} />
  </ScreenBgStyled>
);

const MenuItem = ({ caption, onPress, link, notVisible }) => (
  <TouchableOpacity
    onPress={() => {
      if (link) {
        Linking.openURL(link);
        return;
      }
      onPress();
    }}>
    <MenuItemStyled notVisible={notVisible}>
      <Text>{caption}</Text>
      {!link && <Arrow>{'>'}</Arrow>}
    </MenuItemStyled>
  </TouchableOpacity>
);

export default Infos;
