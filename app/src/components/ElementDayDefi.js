import React from 'react';
import styled from 'styled-components';
import Stars from './illustrations/Stars';
import { P } from './Articles';

const ElementDayDefi = ({ content, lineHeight = 20, noMarginBottom }) => (
  <Paragraph noMarginBottom={noMarginBottom}>
    <ElemContainer>
      <StarsStyled color="#4030a5" size={20} />
      <TextContent lineHeight={lineHeight} noMarginBottom>
        {content}
      </TextContent>
    </ElemContainer>
  </Paragraph>
);

const Paragraph = styled.View`
  ${({ noMarginBottom }) => !noMarginBottom && 'margin-bottom: 25px'};
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
`;

export default ElementDayDefi;
