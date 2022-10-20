import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components';
import { mediaHeight } from '../styles/mediaQueries';
import TextStyled from './TextStyled';

const GoBackButtonText = ({ content, onPress, color, withoutPadding, bold, ...props }) => (
  <GoBackButtonTextStyled withoutPadding={withoutPadding} onPress={onPress} {...props}>
    <TextContent bold={bold} color={color}>
      {content}
    </TextContent>
  </GoBackButtonTextStyled>
);

const GoBackButtonTextStyled = styled.TouchableOpacity`
  ${({ withoutPadding }) => !withoutPadding && 'padding: 10px 20px;'}
  justify-content: center;
  align-items: center;
  margin-right: auto;
`;

const bigContent = css`
  font-size: ${({ small }) => (small ? 15 : 20)}px;
`;

const mediumContent = css`
  font-size: ${({ small }) => (small ? 13 : 18)}px;
`;

const smallContent = css`
  font-size: ${({ small }) => (small ? 13 : 15)}px;
`;

const TextContent = styled(TextStyled)`
  color: ${({ color }) => color || '#191919'};
  font-weight: ${({ bold }) => (bold ? (Platform.OS === 'android' ? 'bold' : '800') : 'normal')};
  flex-shrink: 0;
  ${bigContent}
  ${mediaHeight.medium`${mediumContent}`}
  ${mediaHeight.small`${smallContent}`}
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;

export default GoBackButtonText;
