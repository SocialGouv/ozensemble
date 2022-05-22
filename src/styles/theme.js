import { Dimensions } from 'react-native';
import deviceInfoModule from 'react-native-device-info';

export const buttonHeight = 43;
export const buttonSmallHeight = 30;
export const defaultPaddingFontScale = () => {
  return Math.min(30, Dimensions.get('window').width * 0.07) / deviceInfoModule.getFontScaleSync();
};

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const menuHeight = 80;
