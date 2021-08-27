import React from 'react';
import styled from 'styled-components';

import TextStyled from '../../../../components/TextStyled';
import { TopContainer, TopTitle } from './styles';

export default () => (
  <TopContainer>
    <TopTitle>
      <TextStyled color="#4030a5">Évaluation de votre consommation</TextStyled>
    </TopTitle>
    <SectionTitle color="#de285e">C'est déjà terminé !</SectionTitle>
    <TextParagraph>Merci d'avoir répondu au questionnaire !</TextParagraph>
    <TextParagraph>
      Vos réponses seront intégrées à votre <TextStyled bold>bilan de fin de semaine.</TextStyled>
    </TextParagraph>
    <TextParagraph>
      Vous pourrez retrouver ce questionnaire dans l’onglet <TextStyled bold>Tests</TextStyled> de l’application.
    </TextParagraph>
  </TopContainer>
);

const SectionTitle = styled(TextStyled)`
  font-weight: bold;
  font-size: 12;
  margin-bottom: 5px;
`;

const TextParagraph = styled(TextStyled)`
  margin-bottom: 8px;
`;
