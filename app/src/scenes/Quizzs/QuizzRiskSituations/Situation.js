import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale } from '../../../styles/theme';
import Section from '../QuizzMotivations/Section';
import { P } from '../../../components/Articles';

const Situation = ({ section, toggleAnswer, answers, navigation, description1, description2, onPress }) => {
  const currentSituationAnswers = section.answers.map((a) => a.answerKey).filter((key) => answers.includes(key));
  const numberChecked = currentSituationAnswers.length;
  return (
    <ScreenBgStyled>
      <BackButton onPress={navigation.goBack} marginBottom marginLeft />
      <TopContainer>
        <H1>Identifier mes situations à risques</H1>
        <DescriptionContainer>
          <P>{description1}</P>
        </DescriptionContainer>
        <DescriptionContainer>
          <P>{description2}</P>
          <Section
            section={section}
            onToggle={toggleAnswer}
            answers={currentSituationAnswers}
            navigation={navigation}
            maxNumberOfCheckedBoxes={2}
          />
        </DescriptionContainer>
        <ButtonPrimary
          small
          content={
            numberChecked === 0
              ? 'Je continue'
              : `J'ai identifié ${numberChecked} ${
                  numberChecked === 1 ? 'situation ' + section.sectionTitle : 'situations ' + section.sectionTitle + 's'
                }`
          }
          disabled={numberChecked === 0 || numberChecked > 2}
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
