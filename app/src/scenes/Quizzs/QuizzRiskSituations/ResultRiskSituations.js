import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import TextStyled from '../../../components/TextStyled';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import QButton from '../../../components/QButton';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { riskSituationsAnswersKeysSelector } from '../../../recoil/quizzs';
import Header from '../../Defis/Header';

const ResultRiskSituations = ({ navigation, route }) => {
  const answersKeys = useRecoilValue(riskSituationsAnswersKeysSelector);

  return (
    <ScreenBgStyled>
      <Header
        title={'Identifier mes situations à risques'}
        description={"Merci d'avoir répondu, voici les situations sur lesquelles nous travaillerons dès demain : "}
      />
      <ResultsContainer>
        {answersKeys.map((riskSituation, index) => (
          <Result key={index}>
            <QButton
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
          onPress={() => navigation.navigate(route?.params?.rootRoute)}
        />
      </BottomContainer>
    </ScreenBgStyled>
  );
};

const BottomContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px;
  margin-bottom: 100px;
  margin-top: 20px;
`;
const ResultsContainer = styled.View`
  background-color: #efefef;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const Result = styled.View`
  flex-direction: row;
  padding: 0px ${defaultPaddingFontScale()}px;
  margin-bottom: 10px;
  align-items: center;
`;

const TextContainer = styled.View`
  background-color: #ffffff;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  width: 80%;
  margin-left: 10px;
  padding: 10px;
`;

export default ResultRiskSituations;
