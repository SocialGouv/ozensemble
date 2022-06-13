import React from 'react';
import styled from 'styled-components';
import TextStyled from './TextStyled';
import Stars from './illustrations/Stars';

const ElementDayDefi = ({ content, lineHeight = 20 }) => (
  <Paragraph>
    <ElemContainer>
      <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
      <TextStyled style={{ flex: 1, lineHeight }}>{content}</TextStyled>
    </ElemContainer>
  </Paragraph>
);

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;
export default ElementDayDefi;
