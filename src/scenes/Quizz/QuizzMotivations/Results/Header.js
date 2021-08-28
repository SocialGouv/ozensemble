import React from 'react';
import styled from 'styled-components';

import TextStyled from '../../../../components/TextStyled';
import { TopContainer, TopTitle, TopTitleContainer } from './styles';
import GoBackButton from '../../../../components/GoBackButton';

export default ({ navigation }) => (
  <TopContainer>
    <TopTitleContainer>
      <GoBackButton onPress={navigation.goBack} />
      <TopTitle>
        <TextStyled color="#4030a5">Quelles raisons vous motivent à diminuer votre consommation ?</TextStyled>
      </TopTitle>
    </TopTitleContainer>
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
