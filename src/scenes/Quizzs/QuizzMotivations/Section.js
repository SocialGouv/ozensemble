import React from 'react';
import Item from './Item';
import { Paragraph, SectionTitle } from './styles';

const Section = ({ section, onToggle, answers, ...props }) => (
  <Paragraph>
    <SectionTitle>{section.sectionTitle} </SectionTitle>
    {section.answers.map((item) => (
      <Item
        key={item.answerKey}
        answerKey={item.answerKey}
        content={item.content}
        alertText={item.alertText}
        onPress={() => onToggle(item.answerKey, !answers[item.answerKey])}
        checked={!!answers[item.answerKey]}
        {...props}
      />
    ))}
  </Paragraph>
);

export default Section;
