import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import TextStyled from '../../../components/TextStyled';

const Section = ({ section, onToggle, answers, ...props }) => (
  <Paragraph>
    <SectionTitle>{section.sectionTitle} </SectionTitle>
    {section.answers.map((item) => (
      <Item
        key={item.answerKey}
        answerKey={item.answerKey}
        content={item.content}
        alertText={item.alertText}
        onPress={() => onToggle(item.answerKey, !answers?.[item.answerKey])}
        checked={!!answers?.[item.answerKey]}
        {...props}
      />
    ))}
  </Paragraph>
);

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const SectionTitle = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;

export default Section;
