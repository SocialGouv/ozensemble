import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Dimensions } from 'react-native';

const titleColor = '#4030a5';
const theme = {
  colors: {
    headerBackground: '#39cec0',
    buttonPrimary: '#de285e',
    buttonPrimaryShadow: '#c0184a',
    title: titleColor,
    titleShadow: '#171586',
    swiperButtonDisabled: '#d7d7d7',
    swiperButtonDisabledShadow: '#b8b8b8',
    basicText: '#191919',
    whiteBg: '#f9f9f9',
    greyBg: '#efefef',
    questionBgUnselected: '#f3f3f6',
    questionBgSelected: '#5352a3',
    questionBorderUnselected: '#dbdbe9',
    questionBorderSelected: titleColor,
    placeholder: '#c3c3de',
    modalMask: '#45447fEE',
    transparent: 'transparent',
  },
  dimensions: {
    screen: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    buttonHeight: 43,
    buttonSmallHeight: 30,
    progressBar: 10,
    quizzPadding: 30,
  },
};

export default ({ children }) =>
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
