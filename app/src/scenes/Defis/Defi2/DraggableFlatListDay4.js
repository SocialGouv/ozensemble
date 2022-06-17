import React from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import DraggableClick from '../../../components/illustrations/DraggableClick';
import QButton from '../../../components/QButton';
import TextStyled from '../../../components/TextStyled';
import { riskSituationsAnswersKeysSelector, riskSituationsQuizzAnswersState } from '../../../recoil/quizzs';
import { screenWidth } from '../../../styles/theme';

export default function App() {
  const setAnswersRiskSituations = useSetRecoilState(riskSituationsQuizzAnswersState);
  const answers = useRecoilValue(riskSituationsAnswersKeysSelector);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <AnswerContainer onPress={drag} onLongPress={drag} disabled={isActive} isActive={isActive}>
        <AnswerText>
          <TextStyled>{item.content}</TextStyled>
        </AnswerText>
        <DraggableClickContainer>
          <DraggableClick size={20} color={isActive ? '#4030A5CC' : '#4030A5'} />
        </DraggableClickContainer>
      </AnswerContainer>
    );
  };

  return (
    <DraggableFlagListContainer>
      <QButtons>
        {answers.map((a, index) => (
          <QButtonContainer key={index}>
            <QButton
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
  align-items: center;
  flex-direction: row;
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
