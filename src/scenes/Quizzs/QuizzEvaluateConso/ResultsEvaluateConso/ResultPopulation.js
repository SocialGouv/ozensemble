import React from 'react';
import { View } from 'react-native';
import { ResultTitle, ResultParagraph, ContainerSection } from './styles';
import TextStyled from '../../../../components/TextStyled';
import GraphPopulation from './GraphPopulation';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import UnderlinedButton from '../../../../components/UnderlinedButton';

const ResultPopulation = ({ value, hideButtons }) => {
  const navigation = useNavigation();
  const renderFooter = () => (
    <>
      <ButtonPrimary
        content="Échanger avec un conseiller"
        onPress={() => navigation.navigate('CONTACT')}
        style={{ marginVertical: 30 }}
      />
      <UnderlinedButton content="Conseils de réduction" onPress={() => navigation.navigate('ADVISE')} color="#4030a5" />
    </>
  );
  const renderDescription = () => {
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
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d’alcool par jour.
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
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d’alcool par jour.
            </ResultParagraph>
            {!hideButtons && renderFooter()}
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
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d’alcool par jour.
            </ResultParagraph>
            {!hideButtons && renderFooter()}
          </View>
        );
    }
  };

  return (
    <ContainerSection>
      <ResultTitle>L'alcool en France</ResultTitle>
      <GraphPopulation activeBarIndex={value} />
      {renderDescription()}
    </ContainerSection>
  );
};

export default ResultPopulation;
