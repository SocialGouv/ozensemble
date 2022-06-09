import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components';
import { mediaHeight } from '../../styles/mediaQueries';

export const BackButton = ({ onPress, marginBottom, marginLeft }) => (
  <Container onPress={onPress} marginBottom={marginBottom} marginLeft={marginLeft}>
    <TextStyled bold> {'< Retour'} </TextStyled>
  </Container>
);

const Container = styled.TouchableOpacity`
  margin-right: auto;
  margin-top: 20px;
  ${({ marginLeft }) => marginLeft && 'margin-left: 20px'};
  ${({ marginBottom }) => marginBottom && 'margin-bottom: 20px'};
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

const TextStyled = styled.Text`
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

export default BackButton;
