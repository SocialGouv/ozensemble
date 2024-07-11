import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components';
import { mediaHeight } from '../styles/mediaQueries';
import { defaultPaddingFontScale } from '../styles/theme';
import TextStyled from './TextStyled';

export default function BackButton({ onPress, marginBottom, marginLeft, marginTop }) {
  return (
    <Container onPress={onPress} marginBottom={marginBottom} marginLeft={marginLeft} marginTop={marginTop}>
      <ReturnButton bold>{'< Retour'}</ReturnButton>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  margin-right: auto;
  ${({ marginLeft }) => marginLeft && `margin-left: ${defaultPaddingFontScale()}px`};
  ${({ marginBottom }) => marginBottom && 'margin-bottom: 20px'};
  ${({ marginTop }) => !!marginTop && 'margin-top: 20px'};
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

const ReturnButton = styled(TextStyled)`
  color: #191919;
  font-weight: ${({ bold }) => (bold ? (Platform.OS === 'android' ? 'bold' : '800') : 'normal')};
  flex-shrink: 0;
  ${bigContent}
  ${mediaHeight.medium`${mediumContent}`}
  ${mediaHeight.small`${smallContent}`}
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;
