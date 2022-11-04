import React from 'react';
import styled from 'styled-components';
import Stars from './illustrations/Stars';
import { P, Spacer } from './Articles';

const ElementDayDefi = ({ content, contentView, lineHeight = 20, noMarginBottom, Illustration }) => (
  <Paragraph noMarginBottom={noMarginBottom}>
    <ElemContainer>
      {Illustration ? Illustration : <Stars color="#4030a5" size={20} />}
      <Spacer size={10} />
      {content ? (
        <TextContent lineHeight={lineHeight} noMarginBottom>
          {content}
        </TextContent>
      ) : (
        contentView && (
          <ViewContent lineHeight={lineHeight} noMarginBottom>
            {contentView}
          </ViewContent>
        )
      )}
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

const TextContent = styled(P)`
  flex: 1;
`;

const ViewContent = styled.View`
  flex: 1;
`;

export default ElementDayDefi;
