import React from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';

const TextStyled = styled.Text`
  color: ${({ color }) => color || '#191919'};
  ${({ italic }) => italic && 'font-style: italic;'}
  ${(props) => props.bold && `font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};`}
`;

export default TextStyled;
