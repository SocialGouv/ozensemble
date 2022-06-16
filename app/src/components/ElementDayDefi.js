import React from 'react';
import styled from 'styled-components';
import TextStyled from './TextStyled';
import Stars from './illustrations/Stars';
import { P } from './Articles';

const ElementDayDefi = ({ content, lineHeight = 20 }) => (
  <Paragraph>
    <ElemContainer>
      <StarsStyled color="#4030a5" size={20} />
      <TextContent lineHeight={lineHeight}>{content}</TextContent>
    </ElemContainer>
  </Paragraph>
);

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-vertical: 10px;
`;

const StarsStyled = styled(Stars)`
  margin-right: 10px;
`;

const TextContent = styled(P)`
  flex: 1;
  line-height: ${(props) => props.lineHeight}px;
`;

export default ElementDayDefi;
