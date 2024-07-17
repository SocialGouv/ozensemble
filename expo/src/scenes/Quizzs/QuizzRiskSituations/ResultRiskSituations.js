import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import TextStyled from "../../../components/TextStyled";
import { defaultPaddingFontScale } from "../../../styles/theme";
import QButton from "../../../components/QButton";
import { riskSituationsAnswersKeysSelector } from "../../../recoil/quizzs";
import HeaderQuizzsResult from "../../Defis/HeaderQuizzsResult";

const ResultRiskSituations = ({ navigation, route }) => {
  const answersKeys = useRecoilValue(riskSituationsAnswersKeysSelector);
  const inMyTests = route?.params?.rootRoute === "QUIZZ_MENU";

  return (
    <HeaderQuizzsResult
      inMyTests={inMyTests}
      title={"Identifier mes situations à risques"}
      buttonCTA="Je valide"
      onPressCTA={() => navigation.navigate(route?.params?.rootRoute)}
      description={
        "Merci d'avoir répondu, voici les situations sur lesquelles nous travaillerons dès demain : "
      }>
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
    </HeaderQuizzsResult>
  );
};

const ResultsContainer = styled.View`
  background-color: #efefef;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Result = styled.View`
  flex-direction: row;
  padding-horizontal: ${defaultPaddingFontScale()}px;
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
