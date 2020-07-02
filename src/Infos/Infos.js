import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import { useBackHandler } from '../helpers/customHooks';
import { ScreenBgStyled, MenuItemStyled, Arrow, TopTitle } from './styles';
import Swiper from 'react-native-swiper';
import TextStyled from '../components/TextStyled';
import CONSTANTS from '../reference/constants';
import Reminder from '../Reminder/Reminder';

const Infos = ({ setView, notificationService }) => {
  const [screen, setScreen] = React.useState(0);
  const [subView, setSubView] = React.useState(null);

  const swiperRef = React.useRef(null);

  const onBackHandlerPressed = () => {
    if (screen === 1) {
      setScreen(0);
    }
    return true;
  };

  const showSubview = nextSubView => {
    setSubView(nextSubView);
    setScreen(1);
  };

  React.useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.scrollTo(screen, true);
  }, [screen]);

  useBackHandler(onBackHandlerPressed);

  return (
    <Swiper loop={false} index={0} showsPagination={false} scrollEnabled={false} ref={swiperRef}>
      <InfosMenu onShowSubview={showSubview} />
      <ScreenBgStyled>
        {subView === CONSTANTS.VIEW_REMINDER && (
          <Reminder notificationService={notificationService} onBackPress={onBackHandlerPressed} />
        )}
      </ScreenBgStyled>
    </Swiper>
  );
};

const InfosMenu = ({ onShowSubview }) => (
  <ScreenBgStyled>
    <TopTitle>
      <TextStyled type="title">Mes informations</TextStyled>
    </TopTitle>
    <MenuItem caption="Rappel" onPress={() => onShowSubview(CONSTANTS.VIEW_REMINDER)} />
    <MenuItem caption="Infos légales" link="https://www.ozensemble.fr/?open=terms-and-conditions" />
  </ScreenBgStyled>
);

const MenuItem = ({ caption, onPress, link }) => (
  <TouchableOpacity
    onPress={() => {
      if (link) {
        Linking.openURL(link);
        return;
      }
      onPress();
    }}>
    <MenuItemStyled>
      <Text>{caption}</Text>
      {!link && <Arrow>{'>'}</Arrow>}
    </MenuItemStyled>
  </TouchableOpacity>
);

export default Infos;
