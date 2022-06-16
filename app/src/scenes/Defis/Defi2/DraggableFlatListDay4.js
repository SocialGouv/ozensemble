import React from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import QButton from '../../../components/QButton';
import TextStyled from '../../../components/TextStyled';
import { riskSituationsAnswersKeysSelector, riskSituationsQuizzAnswersState } from '../../../recoil/quizzs';
import { screenWidth } from '../../../styles/theme';

export default function App() {
  const setAnswersRiskSituations = useSetRecoilState(riskSituationsQuizzAnswersState);
  const answers = useRecoilValue(riskSituationsAnswersKeysSelector);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <>
        <ScaleDecorator key={item}>
          <AnswerContainer onLongPress={drag} disabled={isActive} isActive={isActive}>
            <TextStyled>{item.content}</TextStyled>
          </AnswerContainer>
        </ScaleDecorator>
      </>
    );
  };

  return (
    <DraggableFlagListContainer>
      <QButtons>
        {answers.map((a, index) => (
          <QButtonContainer>
            <QButton
              key={index}
              content={index + 1}
              disabled
              colorText="#ffffff"
              colorBorder="#4030A5"
              colorBackground=" #4030A5"
            />
          </QButtonContainer>
        ))}
      </QButtons>
      <DraggableFlatList
        data={answers}
        onDragEnd={({ data }) => {
          setAnswersRiskSituations(data?.map((answer) => answer.answerKey));
        }}
        keyExtractor={(item) => item.answerKey}
        renderItem={renderItem}
      />
    </DraggableFlagListContainer>
  );
}

const DraggableFlagListContainer = styled.View`
  flex-direction: row;
  margin-left: 20px;
  align-items: center;
`;

const QButtons = styled.View`
  margin-top: 20px;
`;

const QButtonContainer = styled.View`
  height: 80px;
`;

const AnswerContainer = styled(TouchableOpacity)`
  height: 70px;
  justify-content: center;
  padding: 5px;
  width: ${screenWidth * 0.7}px;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  margin-vertical: 5px;
  margin-horizontal: 20px;
  background-color: ${({ isActive }) => (isActive ? '#4030A540' : '#FFFFFF')};
`;
