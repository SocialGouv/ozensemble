import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { buttonHeight } from '../styles/theme';

const GoBackButtonText = ({ content, onPress, color, withoutPadding, bold, ...props }) => (
  <GoBackButtonTextStyled withoutPadding={withoutPadding} onPress={onPress} {...props}>
    <TextStyled bold={bold} color={color}>
      {content}
    </TextStyled>
  </GoBackButtonTextStyled>
);

const GoBackButtonTextStyled = styled.TouchableOpacity`
  ${({ withoutPadding }) => !withoutPadding && 'padding: 20px;'}
  height: ${buttonHeight}px;
  justify-content: center;
  align-items: flex-start;
`;

const TextStyled = styled.Text`
  color: ${({ color }) => color || '#191919'};
  font-weight: ${({ bold }) => (bold ? (Platform.OS === 'android' ? 'bold' : '800') : 'normal')};
  flex-shrink: 0;
  height: ${buttonHeight}px;
  font-size: 16px;
  line-height: 40px;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;

export default GoBackButtonText;
