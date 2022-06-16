import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import TextStyled from '../../../components/TextStyled';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import { defaultPaddingFontScale } from '../../../styles/theme';
import QButton from '../../../components/QButton';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { riskSituationsAnswersKeysSelector } from '../../../recoil/quizzs';

const ResultRiskSituations = ({ navigation }) => {
  const answersKeys = useRecoilValue(riskSituationsAnswersKeysSelector);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} marginBottom />
        <H1>Identifier mes situations à risques</H1>
        <Spacer />
        <Spacer />
        <H2 color="#DE285E">C'est déjà terminé !</H2>
        <Spacer />
        <H2>Merci d'avoir répondu, voici les situations sur lesquelles nous travaillerons dès demain : </H2>
      </TopContainer>
      <ResultsContainer>
        {answersKeys.map((riskSituation, index) => (
          <Result>
            <QButton
              key={riskSituation.answerKey}
              content={index + 1}
              disabled
              colorText="#ffffff"
              colorBorder="#4030A5"
              colorBackground=" #4030A5"
            />
            <TextContainer>
              <TextStyled>{riskSituation?.content}</TextStyled>
            </TextContainer>
          </Result>
        ))}
      </ResultsContainer>
      <BottomContainer>
        <ButtonPrimary
          content={"J'ai finis d'identifier"}
          widthSmall
          onPress={() => navigation.navigate('DEFI2_MENU')}
        />
      </BottomContainer>
    </ScreenBgStyled>
  );
};

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px;
`;

const BottomContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px;
  margin-bottom: 100px;
  margin-top: 20px;
`;
const ResultsContainer = styled.View`
  background-color: #efefef;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const Result = styled.View`
  flex-direction: row;
  padding: 0px ${defaultPaddingFontScale()}px;
  margin-bottom: 10px;
  align-items: center;
`;

const Spacer = styled.View`
  height: 10px;
`;
const TextContainer = styled.View`
  background-color: #ffffff;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  width: 80%;
  margin-left: 10px;
  padding: 5px;
`;

export default ResultRiskSituations;
