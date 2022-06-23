import React from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';

const TextStyled = styled.Text`
  color: ${({ color }) => color || '#191919'};
  ${(props) => props.bold && `font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};`}
  textDecoration: ${({ underline }) => underline && 'underline'};
  text-decoration-color: ${({ color }) => color || '#191919'};
  ${({ center }) => !!center && 'text-align: center;'}
`;

export default TextStyled;
