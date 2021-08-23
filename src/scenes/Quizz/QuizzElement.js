import React from 'react';
import styled from 'styled-components';

import { View } from 'react-native';
import ButtonPrimary from '../../components/ButtonPrimary';
import TickDone from '../../components/Illustrations/TickDone';

export default ({ topTitle, title, onShowResult, onStart, done = false, disabled = true }) => (
  <Container done={done} disabled={disabled}>
    <ContainerIcon>
      <TickDone size={25} color={done ? '#DE285E' : '#5150A226'} />
    </ContainerIcon>
    <Content>
      <View>
        <TopTitle>{topTitle}</TopTitle>
        <Title>{title}</Title>
      </View>
      {!disabled ? (
        done ? (
          <ButtonContainer>
            <Button
              small
              content="Mes resultats"
              color="#4030A5"
              shadowColor="#201569"
              onPress={() => {
                console.log('Mes resultats');
                onShowResult();
              }}
            />
            <ButtonRedoTest
              onPress={() => {
                console.log('Refaire le test');
                onStart();
              }}>
              Refaire le test
            </ButtonRedoTest>
          </ButtonContainer>
        ) : (
          <Button
            small
            content="Passer le test"
            onPress={() => {
              console.log('faire le test');
              onStart();
            }}
          />
        )
      ) : null}
    </Content>
  </Container>
);

const getBackgroundColor = ({ done, disabled }) => {
  if (done) return '#81DBD326';
  if (disabled) return '#d5d5d5';
  return '#F9F9F9';
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${(props) => getBackgroundColor(props)};
  border: 1px solid ${({ done }) => (done ? '#81DBD37F' : '#5150A226')};
  padding: 15px;
  height: ${({ disabled }) => (disabled ? '70' : '120')}px;
  margin-bottom: 20px;
`;

const ContainerIcon = styled.View`
  margin-right: 15px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Content = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

const TopTitle = styled.Text`
  font-size: 12;
  color: #1a1a1a;
  margin-bottom: 5px;
`;
const Title = styled.Text`
  font-size: 14;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 5px;
`;
const ButtonRedoTest = styled.Text`
  font-size: 14;
  color: #4030a5;
  text-decoration: underline;
  margin-left: 10px;
`;

const Button = styled(ButtonPrimary)`
  flex-grow: 0;
`;
