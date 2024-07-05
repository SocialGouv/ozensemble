import React from 'react';
import { View, StyleSheet } from 'react-native';
import { APP_ENV } from '../config';
import TextStyled from './TextStyled';

const EnvironmentIndicator = () => {
  if (APP_ENV === 'production') return null;

  return (
    <View style={styles.container}>
      <TextStyled allowFontScaling={false} allow style={styles.text}>
        {APP_ENV}
      </TextStyled>
    </View>
  );
};

export default EnvironmentIndicator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    zIndex: 9999,
    color: 'red',
    fontSize: 16,
  },
  text: {
    color: 'red',
  },
});
