import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import ButtonPrimary from '../../components/ButtonPrimary';
import TickDone from '../../components/illustrations/TickDone';
import Form from '../../components/illustrations/Form';
import { screenWidth } from '../../styles/theme';
import Lock from '../../components/illustrations/Lock';
import TextStyled from '../../components/TextStyled';

const QuizzElement = ({ title, disabled, showOnlyIfDone, fromHealth = false, onStart, done, onShowResult }) => {
  if (!done && !showOnlyIfDone) return null;

  return (
    <Container done={done} disabled={disabled} fromHealth={fromHealth}>
      <ContainerIconTitle>
        {fromHealth && !done ? <Form size={20} /> : done ? <TickDone size={20} color="#DE285E" /> : <Lock size={20} />}
        <Title>
          <TextStyled>{title}</TextStyled>
        </Title>
      </ContainerIconTitle>
      <Content>
        <ButtonsContainer>
          {!disabled &&
            (done ? (
              <>
                {!!onShowResult && <ButtonRedoTest onPress={onShowResult}>Mes résultats</ButtonRedoTest>}
                <ButtonPrimary onPress={onStart} content={'Je refais le test'} small />
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
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) => getBackgroundColor(props)};
  border: 1px solid ${({ done }) => (done ? '#81DBD37F' : '#79747E')};
  padding-vertical: 15px;
  height: ${({ disabled }) => (disabled ? '70' : '120')}px;
  margin-bottom: 20px;
  padding-horizontal: ${Math.min(15, screenWidth * 0.03)}px;
`;

const ContainerIconTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  width: 100%;
  justify-content: flex-end;
  padding-right: 5px;
`;

const Content = styled.View`
  margin-left: 25px;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-left: 5px;
`;
const ButtonRedoTest = styled.Text`
  font-size: 14px;
  color: #4030a5;
  text-decoration: underline;
  flex-shrink: 1;
  margin-right: auto;
`;

const Button = styled(ButtonPrimary)`
  flex-grow: 0;
  margin-left: auto;
`;
