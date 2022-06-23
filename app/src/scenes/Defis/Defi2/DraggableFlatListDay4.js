import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { P } from '../../../components/Articles';
import DraggableClick from '../../../components/illustrations/DraggableClick';
import QButton from '../../../components/QButton';
import { riskSituationsAnswersKeysSelector, riskSituationsQuizzAnswersState } from '../../../recoil/quizzs';
import { screenWidth } from '../../../styles/theme';

export default function App() {
  const setAnswersRiskSituations = useSetRecoilState(riskSituationsQuizzAnswersState);
  const answers = useRecoilValue(riskSituationsAnswersKeysSelector);

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <DraggableContainer onPress={drag} onLongPress={drag} disabled={isActive}>
        <QButton content={index + 1} disabled colorText="#ffffff" colorBorder="#4030A5" colorBackground=" #4030A5" />
        <AnswerContainer isActive={isActive}>
          <AnswerText>
            <P noMarginBottom>{item.content}</P>
          </AnswerText>
          <DraggableClickContainer>
            <DraggableClick size={20} color={isActive ? '#4030A5CC' : '#4030A5'} />
          </DraggableClickContainer>
        </AnswerContainer>
      </DraggableContainer>
    );
  };

  return (
    <DraggableFlagListContainer>
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
  align-items: stretch;
`;

const DraggableContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  min-height: 60px;
`;

const AnswerContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding-vertical: 10px;
  padding-left: 10px;
  width: ${screenWidth * 0.78 - 20}px;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  margin-vertical: 5px;
  margin-horizontal: 20px;
  ${({ isActive }) =>
    isActive &&
    `
    elevation: 5;
    shadow-offset: 0px 0px;
    shadow-color: #CCC;
    shadow-opacity: 1;
    shadow-radius: 3.84px;
  `};
  background-color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#FFFFFF')};
`;

const AnswerText = styled.View`
  flex: 1;
  padding-right: 5px;
`;

const DraggableClickContainer = styled.View`
  margin-right: 10px;
`;
