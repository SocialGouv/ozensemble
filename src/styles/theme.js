import { Dimensions } from 'react-native';
import deviceInfoModule from 'react-native-device-info';

export const buttonHeight = 43;
export const buttonSmallHeight = 30;
export const defaultPadding = Math.min(Dimensions.get('window').width * 0.08, 30);
export const defaultPaddingFontScale = () =>
  Math.min(16, Dimensions.get('window').width * 0.08) / deviceInfoModule.getFontScaleSync();

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const menuHeight = 80;
