import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale } from '../../../styles/theme';
import Section from '../QuizzMotivations/Section';

const Situation = ({ section, toggleAnswer, answers, navigation, description1, description2, onPress }) => {
  const currentSituationAnswers = section.answers.map((a) => a.answerKey).filter((key) => answers.includes(key));
  const numberChecked = currentSituationAnswers.length;
  return (
    <ScreenBgStyled>
      <BackButton onPress={navigation.goBack} marginBottom marginLeft />
      <TopContainer>
        <H1>Identifier mes situations à risques</H1>
        <DescriptionContainer>
          <TextStyled>{description1}</TextStyled>
        </DescriptionContainer>
        <DescriptionContainer>
          <TextStyled>{description2}</TextStyled>
          <Section
            section={section}
            onToggle={toggleAnswer}
            answers={currentSituationAnswers}
            navigation={navigation}
          />
        </DescriptionContainer>
        <ButtonPrimary
          small
          content={numberChecked === 0 ? 'Je continue' : `J'ai identifié ${numberChecked} ${section.sectionTitle}`}
          disabled={numberChecked > 2}
          onPress={onPress}
        />
      </TopContainer>
    </ScreenBgStyled>
  );
};

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px ${(props) => (props.shortPaddingBottom ? 30 : 100)}px;
`;

const DescriptionContainer = styled.View`
  margin-vertical: 10px;
`;

export default Situation;
