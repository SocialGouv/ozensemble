import React from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components';
import H3 from '../../../../components/H3';
import TextStyled from '../../../../components/TextStyled';

const ResultAddiction = ({ value }) => {
  const getResultScore = () => {
    switch (value) {
      default:
      case null:
        return;
      case 'good':
        return (
          <View>
            <ResultParagraph color="#191919">
              Votre consommation d'alcool ne devrait pas provoquer de risque pour votre santé.
            </ResultParagraph>
          </View>
        );
      case 'risk':
        return (
          <View>
            <ResultParagraph color="#191919">
              <TextStyled bold>
                Votre consommation d'alcool comporte vraisemblablement des risques pour votre santé
              </TextStyled>
              , même si actuellement vous ne souffrez de rien.
            </ResultParagraph>
            <ResultParagraph color="#191919">
              N'hésitez pas à demander conseil de manière{' '}
              <TextStyled bold color="#de285e">
                anonyme et gratuite
              </TextStyled>{' '}
              à l'équipe Oz Ensemble.
            </ResultParagraph>
          </View>
        );
      case 'addicted':
        return (
          <View>
            <ResultParagraph color="#191919">
              <TextStyled bold>Il est possible que vous soyez dépendant de l'alcool.</TextStyled>
            </ResultParagraph>
            <ResultParagraph color="#191919">
              Cette dépendance peut être psychologique si vous ressentez un besoin de consommer malgré les inconvénients
              de cette consommation et/ou physique si la dimunution ou l'arrêt de votre consommation entraîne des signes
              de “manque”.
            </ResultParagraph>
            <ResultParagraph color="#191919">
              Nous vous conseillons de{' '}
              <TextStyled bold color="#de285e">
                faire appel gratuitement
              </TextStyled>{' '}
              et de manière{' '}
              <TextStyled bold color="#de285e">
                anonyme
              </TextStyled>{' '}
              à un{' '}
              <TextStyled bold color="#de285e">
                professionnel Oz Ensemble
              </TextStyled>
              .
            </ResultParagraph>
          </View>
        );
    }
  };

  return (
    <ContainerSection>
      <ResultTitle>Mes résultats</ResultTitle>
      {getResultScore()}
    </ContainerSection>
  );
};

export const ContainerSection = styled.View`
  margin: 5px 0 20px 0;
`;
export const ResultParagraph = styled(TextStyled)`
  margin: 8px 0;
`;

export const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

export const TopContainer = styled.View`
  padding: 20px 25px 40px;
`;

export const ResultTitle = styled(H3)`
  ${commonCss}
  font-weight: bold;
  color: #4030a5;
  font-size: 15px;
`;

export default ResultAddiction;
