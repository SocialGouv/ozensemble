import { css } from 'styled-components';
import { Dimensions } from 'react-native';

const heights = {
  small: 600,
  medium: 700,
  hight: 800,
}

export const mediaHeight = Object.keys(heights).reduce((acc, label) => {
  acc[label] = (...args) =>
    Dimensions.get('window').height > heights[label]
      ? css``
      : css`${css(...args)};}`;
  return acc;
}, {});

