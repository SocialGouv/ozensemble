import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import styled from 'styled-components';

import ButtonPrimary from '../../components/ButtonPrimary';
import TickDone from '../../components/Illustrations/TickDone';
import { fetchStoredAnswers } from '../../components/Quizz/utils';
import Form from '../../components/Illustrations/Form';
import { screenWidth } from '../../styles/theme';
import matomo from '../../services/matomo';

const QuizzElement = ({
  topTitle,
  title,
  disabled,
  quizzRoute,
  questions,
  memoryKeyAnswers,
  memoryKeyResult,
  showEvenNotDone,
  fromHealth = false,
}) => {
  const [quizzInitialState, setQuizzInitialState] = useState({ answers: null, result: null });
  const navigation = useNavigation();

  const onStart = () => {
    matomo.logQuizzOpen(quizzRoute);
    navigation.navigate(quizzRoute, { initialState: quizzInitialState, initialRouteName: 'QUIZZ_QUESTIONS' });
  };
  const onShowResult = () => {
    navigation.navigate(quizzRoute, { initialState: quizzInitialState, initialRouteName: 'QUIZZ_RESULTS' });
  };

  const isFocused = useIsFocused();

  const getQuizzInitialState = () => {
    const nextState = fetchStoredAnswers({ questions, memoryKeyAnswers, memoryKeyResult });
    setQuizzInitialState(nextState);
  };

  useEffect(() => {
    if (isFocused) getQuizzInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const done = quizzInitialState.result !== null;

  if (!done && !showEvenNotDone) return null;

  return (
    <Container done={done} disabled={disabled} fromHealth={fromHealth}>
      <ContainerIcon>
        {fromHealth && !done ? <Form size={25} /> : <TickDone size={25} color={done ? '#DE285E' : '#5150A226'} />}
      </ContainerIcon>
      <Content>
        <View>
          <TopTitle>{topTitle}</TopTitle>
          <Title>{title}</Title>
        </View>
        {!disabled &&
          (done ? (
            <ButtonsContainer>
              <ResultsButton
                small
                content="Mes résultats"
                color="#4030A5"
                shadowColor="#201569"
                onPress={onShowResult}
              />
              <ButtonRedoTest onPress={onStart}>Refaire le test</ButtonRedoTest>
            </ButtonsContainer>
          ) : (
            <Button small content="Je fais le test" onPress={onStart} />
          ))}
      </Content>
    </Container>
  );
};

export default QuizzElement;

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
  overflow: hidden;
  background-color: ${(props) => getBackgroundColor(props)};
  border: 1px solid ${({ done, fromHealth }) => (fromHealth ? '#4030A5' : done ? '#81DBD37F' : '#5150A226')};
  padding-vertical: 15px;
  padding-horizontal: ${Math.min(15, screenWidth * 0.02)}px;
  height: ${({ disabled }) => (disabled ? '70' : '120')}px;
  margin-bottom: 20px;
`;

const ContainerIcon = styled.View`
  margin-right: ${Math.min(15, screenWidth * 0.02)}px;
`;
const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  flex-shrink: 1;
  width: 100%;
`;

const Content = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

const TopTitle = styled.Text`
  font-size: 12px;
  color: #1a1a1a;
  margin-bottom: 5px;
`;
const Title = styled.Text`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 5px;
`;
const ButtonRedoTest = styled.Text`
  font-size: 14px;
  color: #4030a5;
  text-decoration: underline;
  margin-left: auto;
  flex-shrink: 1;
`;

const ResultsButton = styled(ButtonPrimary)`
  flex-grow: 0;
  margin-bottom: 0;
`;

const Button = styled(ButtonPrimary)`
  flex-grow: 0;
  margin-left: auto;
`;
