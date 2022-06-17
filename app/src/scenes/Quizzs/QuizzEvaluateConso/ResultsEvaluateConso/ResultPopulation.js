/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled, { css } from 'styled-components';
import H2 from '../../../../components/H2';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import UnderlinedButton from '../../../../components/UnderlinedButton';
import ArrowUsage from './ArrowUsage';

const ResultPopulation = ({ value, hideButtons }) => {
  const navigation = useNavigation();
  const renderFooter = () =>
    ['RESULT_ARROW_ADDICTED', 'RESULT_ARROW_HARMFUL_USAGE'].includes(value) ? (
      <ButtonsContainer>
        <ButtonPrimary
          content="Échanger avec un conseiller"
          onPress={() => navigation.navigate('CONTACT')}
          style={{ marginVertical: 30 }}
        />
        <UnderlinedButton
          content="Conseils de réduction"
          onPress={() => navigation.navigate('ADVISE')}
          color="#4030a5"
        />
      </ButtonsContainer>
    ) : (
      <ButtonContainer>
        <ButtonPrimary
          content="Retour au suivi"
          shadowColor="#201569"
          color="#4030A5"
          onPress={() => navigation.navigate('CONSO_FOLLOW_UP')}
          style={{ marginVertical: 30, flexGrow: 0 }}
        />
      </ButtonContainer>
    );
  /*  const renderDescription = () => {
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
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d'alcool par jour.
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
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d'alcool par jour.
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
              La majorité des Français consomme moins de <TextStyled bold>2 à 3 verres</TextStyled> d'alcool par jour.
            </ResultParagraph>
            {!hideButtons && renderFooter()}
          </View>
        );
    }
  };
 */
  return (
    <ContainerSection>
      <ResultTitle>Mon niveau de risque</ResultTitle>
      <ArrowUsage score={value} />
      {!hideButtons && renderFooter()}
      {/* {renderDescription()} */}
    </ContainerSection>
  );
};

export default ResultPopulation;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const ButtonsContainer = styled.View`
  align-items: center;
`;

const ContainerSection = styled.View`
  margin: 5px 0 20px 0;
`;

const ResultTitle = styled(H2)`
  width: 85%;
  flex-shrink: 0;
  font-weight: bold;
  color: #4030a5;
`;
