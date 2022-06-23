import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Section from '../QuizzMotivations/Section';
import { P } from '../../../components/Articles';
import WrapperContainer from '../../../components/WrapperContainer';

const Situation = ({ section, toggleAnswer, answers, navigation, description1, description2, onPress }) => {
  const currentSituationAnswers = section.answers.map((a) => a.answerKey).filter((key) => answers.includes(key));
  const numberChecked = currentSituationAnswers.length;
  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Identifier mes situations à risques">
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
    </WrapperContainer>
  );
};

const DescriptionContainer = styled.View`
  margin-vertical: 10px;
`;

export default Situation;
