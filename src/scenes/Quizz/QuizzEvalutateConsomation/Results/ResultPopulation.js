import React from 'react';
import { View } from 'react-native';
import { ResultTitle, ResultParagraph, ContainerSection } from './styles';
import TextStyled from '../../../../components/TextStyled';
import GraphPopulation from './GraphPopulation';
import ButtonPrimary from '../../../../components/ButtonPrimary';

export default ({ value, navigation }) => {
  const getDescription = () => {
    switch (value) {
      default:
      case null:
        return;
      case 0:
        return (
          <View>
            <ResultParagraph color="#191919">
              Vous avez une consommation <TextStyled bold>inférieure</TextStyled> à la plupart des Français.
            </ResultParagraph>
            <ResultParagraph color="#191919">
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d’alcool par
              semaine, ou un verre tous les <TextStyled bold>2 à 3 jours</TextStyled>.
            </ResultParagraph>
          </View>
        );
      case 7:
        return (
          <View>
            <ResultParagraph color="#191919">
              Vous avez une consommation <TextStyled bold>égale</TextStyled> à la plupart des Français.
            </ResultParagraph>
            <ResultParagraph color="#191919">
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d’alcool par
              semaine, ou un verre tous les <TextStyled bold>2 à 3 jours</TextStyled>.
            </ResultParagraph>
            <ButtonPrimary content="Échanger avec un conseiller" onPress={() => navigation.navigate('CONTACT')} />
          </View>
        );
      case 12:
      case 14:
        return (
          <View>
            <ResultParagraph color="#191919">
              Vous avez une consommation <TextStyled bold>supérieure</TextStyled> à la plupart des Français.
            </ResultParagraph>
            <ResultParagraph color="#191919">
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d’alcool par
              semaine, ou un verre tous les <TextStyled bold>2 à 3 jours</TextStyled>.
            </ResultParagraph>
            <ButtonPrimary content="Échanger avec un conseiller" onPress={() => navigation.navigate('CONTACT')} />
          </View>
        );
    }
  };

  return (
    <ContainerSection>
      <ResultTitle>L'alcool en France</ResultTitle>
      <GraphPopulation activeBarIndex={value} />
      {getDescription()}
    </ContainerSection>
  );
};
