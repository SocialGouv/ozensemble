import React from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';

const TextStyled = styled.Text`
  ${Platform.OS === 'android' && 'font-family: Raleway;'}
  color: ${({ color }) => color || '#191919'};
  ${(props) => props.bold && `font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};`}
  ${(props) => props.italic && 'font-style: italic;'}
  ${(props) => props.center && 'text-align: center;'}
  textDecoration: ${({ underline }) => underline && 'underline'};
  ${({ size }) => size && `font-size: ${size}px;`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}px;`}

  text-decoration-color: ${({ color }) => color || '#191919'};
`;

export default TextStyled;
