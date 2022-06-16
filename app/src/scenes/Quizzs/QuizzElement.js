import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import ButtonPrimary from '../../components/ButtonPrimary';
import TickDone from '../../components/illustrations/TickDone';
import Form from '../../components/illustrations/Form';
import { screenWidth } from '../../styles/theme';
import matomo from '../../services/matomo';
import Lock from '../../components/illustrations/Lock';

const QuizzElement = ({
  topTitle,
  title,
  disabled,
  quizzRoute,
  recoilResultState,
  showEvenNotDone,
  fromHealth = false,
}) => {
  const result = useRecoilValue(recoilResultState);
  const done = result !== null;
  const navigation = useNavigation();

  const onStart = () => {
    matomo.logQuizzStart();
    navigation.navigate(quizzRoute, { initialRouteName: 'QUIZZ_QUESTIONS' });
  };
  const onShowResult = () => {
    navigation.navigate(quizzRoute, { initialRouteName: 'QUIZZ_RESULTS' });
  };

  if (!done && !showEvenNotDone) return null;

  return (
    <Container done={done} disabled={disabled} fromHealth={fromHealth}>
      <ContainerIcon>
        {fromHealth && !done ? <Form size={25} /> : done ? <TickDone size={25} color="#DE285E" /> : <Lock size={15} />}
      </ContainerIcon>
      <Content>
        <View>
          <TopTitle>{topTitle}</TopTitle>
          <Title>{title}</Title>
        </View>
        <ButtonsContainer>
          {!disabled &&
            (done ? (
              <>
                <ButtonRedoTest onPress={onShowResult}>Mes résultats</ButtonRedoTest>
                <ButtonPrimary onPress={onStart} content={'Refaire le test'} small />
              </>
            ) : (
              <Button small content="Je refais le test" onPress={onStart} disabled />
            ))}
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export default QuizzElement;

const getBackgroundColor = ({ done, disabled }) => {
  if (done) return '#81DBD326';
  if (disabled) return '#D3D3E825';
  return '#D3D3E825';
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) => getBackgroundColor(props)};
  border: 1px solid ${({ done }) => (done ? '#81DBD37F' : '#79747E')};
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
  width: 100%;
  justify-content: space-between;
  padding-right: 5px;
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
  flex-shrink: 1;
`;

const Button = styled(ButtonPrimary)`
  flex-grow: 0;
  margin-left: auto;
`;
