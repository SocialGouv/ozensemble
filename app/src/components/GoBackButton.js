import React from 'react';
import styled from 'styled-components';
import ArrowLeft from './ArrowLeft';

const GoBackButton = ({ onPress, color = '#4030a5', rotate = 0, size = 10 }) => (
  <Container color={color} rotate={rotate} onPress={onPress}>
    <ArrowLeft color={color} size={size} />
  </Container>
);

export const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  transform: rotate(${({ rotate }) => rotate}deg);
`;

export default GoBackButton;
