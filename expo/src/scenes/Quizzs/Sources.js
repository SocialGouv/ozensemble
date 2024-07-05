import React from 'react';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';

const Sources = ({ children }) => {
  return (
    <SourceContainer>
      <Title>Sources :</Title>
      <TextParagraph>{children}</TextParagraph>
    </SourceContainer>
  );
};
export default Sources;

const TextParagraph = styled.View``;

const Title = styled(TextStyled)`
  margin-bottom: 8px;
  font-style: italic;
`;

const SourceContainer = styled.View`
  margin-top: 20px;
  flex: 1;
`;
