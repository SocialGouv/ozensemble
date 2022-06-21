import React, { useMemo } from 'react';
import styled from 'styled-components';
import { P } from '../../../components/Articles';
import CheckboxLabelled from '../../../components/CheckboxLabelled';

const Section = ({ section, onToggle, maxNumberOfCheckedBoxes = null, answers, ...props }) => {
  const disabled = useMemo(
    () => (maxNumberOfCheckedBoxes ? answers.length >= maxNumberOfCheckedBoxes : false),
    [answers, maxNumberOfCheckedBoxes]
  );

  return (
    <Paragraph>
      <SectionTitle noMarginBottom>{'Situations ' + section.sectionTitle + 's'} </SectionTitle>
      {section.answers.map((item) => {
        const checked = !!answers?.includes(item.answerKey);
        return (
          <CheckboxLabelled
            key={item.answerKey}
            answerKey={item.answerKey}
            content={item.content}
            alertText={item.alertText}
            onPress={() => onToggle(item.answerKey, !checked)}
            checked={checked}
            disabled={!checked && disabled}
            {...props}
          />
        );
      })}
    </Paragraph>
  );
};

const Paragraph = styled.View`
  margin-bottom: 25px;
  margin-top: 10px;
`;

const SectionTitle = styled(P)`
  color: #4030a5;
  font-weight: bold;
`;

export default Section;
