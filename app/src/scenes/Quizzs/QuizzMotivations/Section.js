import React, { useMemo } from 'react';
import styled from 'styled-components';
import CheckboxLabelled from '../../../components/CheckboxLabelled';
import TextStyled from '../../../components/TextStyled';

const Section = ({ section, onToggle, answers, ...props }) => {
  const disabled = useMemo(() => answers.length >= 2, [answers]);

  return (
    <Paragraph>
      <SectionTitle>{section.sectionTitle[0].toUpperCase() + section.sectionTitle.slice(1)} </SectionTitle>
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
`;

const SectionTitle = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;

export default Section;
