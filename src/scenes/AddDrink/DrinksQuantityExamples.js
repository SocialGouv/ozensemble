import React from 'react';
import styled from 'styled-components';
import { Platform, TouchableOpacity } from 'react-native';
import { Container, ModalContent } from './styles';
import UnderlinedButton from '../../components/UnderlinedButton';
import H2 from '../../components/H2';
import H3 from '../../components/H3';

const examples = {
  'Bouteille de bière': '30',
  'Petite canette': '33',
  'Grande canette': '50',
  'Verre de vin': '12',
  'Bouteille de vin': '75',
  Spiritueux: '4',
  'Bouteille de spiritueux': '75',
};

const DrinksQuantityExamples = ({ navigation }) => (
  <Container>
    <CloseHelp>
      <UnderlinedButton content="Fermer" bold onPress={navigation.goBack} />
    </CloseHelp>
    <ModalContent>
      <Title>Exemples de quantités servies par contenant</Title>
      <Explanation last>Cliquez sur un contenant pour remplir automatiquement le champ</Explanation>
      <FormContainer>
        {Object.keys(examples).map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => navigation.navigate('CONSO_NEW_DRINK', { newVolume: examples[key] })}>
            <LineContainer marginBottom={0}>
              <Label>{key}: </Label>
              <QuantityText>{examples[key]}cl</QuantityText>
            </LineContainer>
          </TouchableOpacity>
        ))}
      </FormContainer>
    </ModalContent>
  </Container>
);

const FormContainer = styled.View`
  padding-horizontal: 20px;
  margin-top: 20px;
`;

export const Title = styled(H2)`
  font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};
  color: #4030a5;
  margin: 20px 30px 15px;
`;

const LineContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  ${(props) => props.marginBottom !== undefined && `margin-bottom: ${props.marginBottom}px;`}
`;

const Label = styled(H2)`
  color: #191919;
  margin: 0 10px 5px;
  height: 30px;
  line-height: 30px;
`;

const QuantityText = styled.Text`
  margin-right: auto;
`;

const Explanation = styled(H3)`
  color: #191919;
  margin: 0px 30px 15px;
  font-style: italic;
`;

export const HelpText = styled.Text`
  color: #39cec0;
  font-weight: bold;
  font-size: 15px;
`;

const CloseHelp = styled.View`
  margin-left: auto;
`;

export default DrinksQuantityExamples;
