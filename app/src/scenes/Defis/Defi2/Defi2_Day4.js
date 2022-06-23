import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale, screenHeight } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import BackButton from '../../../components/BackButton';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import DraggableHand from '../../../components/illustrations/DraggableHand';
import { Bold, P } from '../../../components/Articles';
import DraggableClick from '../../../components/illustrations/DraggableClick';
import QButton from '../../../components/QButton';
import { riskSituationsAnswersKeysSelector, riskSituationsQuizzAnswersState } from '../../../recoil/quizzs';

const Defi2_Day4 = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const setAnswersRiskSituations = useSetRecoilState(riskSituationsQuizzAnswersState);
  const answers = useRecoilValue(riskSituationsAnswersKeysSelector);

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <DraggableContainer onLongPress={drag} disabled={isActive}>
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

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <ScreenBgStyled>
      <DraggableFlatListStyled
        data={answers}
        ListHeaderComponent={() => (
          <TopContainer>
            <BackButton onPress={navigation.goBack} />
            <TopTitle>
              <H1 color="#4030a5">Hiérachiser mes situations</H1>
            </TopTitle>
            <P>
              Toutes les situations à risque ne sont pas égales :{' '}
              <Bold>classez-les par ordre de motivation à réduire votre consommation.</Bold>
              {'\n'}
              <Bold>Placez les plus motivantes au début</Bold> et les plus difficiles à la fin de la liste.
            </P>
            <HelpContainer>
              <DraggableHand size={40} />
              <DraggableTextContainer>
                <TextStyled bold>
                  Vous pouvez faire glisser les situations pour changer leur ordre en appuyant longtemps sur chacune
                </TextStyled>
              </DraggableTextContainer>
            </HelpContainer>
            <P bold color="#4030a5">
              Je suis plus motivé(e) à réduire l'alcool :{' '}
            </P>
          </TopContainer>
        )}
        onDragEnd={({ data }) => setAnswersRiskSituations(data?.map((answer) => answer.answerKey))}
        keyExtractor={(item) => item.answerKey}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <ButtonContainer>
            <ButtonPrimary
              content="J'ai fini de classer"
              widthSmall
              onPress={() => navigation.navigate(route?.params?.rootRoute)}
            />
          </ButtonContainer>
        )}
      />
    </ScreenBgStyled>
  );
};

const FlatListStyled = styled.FlatList`
  flex-grow: 1;
  flex-shrink: 0;
`;

const TopContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const ButtonContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 150px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const DraggableContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  min-height: 60px;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const DraggableTextContainer = styled.View`
  margin-left: 15px;
  width: 80%;
`;

export default Defi2_Day4;

const HelpContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  min-height: 60px;
`;

const AnswerContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding-vertical: 10px;
  padding-left: 10px;
  flex: 1;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  margin-vertical: 5px;
  margin-left: 20px;
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

const DraggableFlatListStyled = styled(DraggableFlatList).attrs((props) => ({
  ...props,
  contentContainerStyle: {
    paddingBottom: 100,
  },
}))`
  max-height: ${screenHeight}px;
`;
