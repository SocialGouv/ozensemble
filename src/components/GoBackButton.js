import React from 'react';
import TextStyled from '../components/TextStyled';
import styled from 'styled-components';

export default ({ onPress }) => (
  <Container onPress={onPress}>
    <TextStyled color="#39cec0">{'<'}</TextStyled>
  </Container>
);

export const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #39cec0;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
