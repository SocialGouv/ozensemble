/* eslint-disable quotes */
import React from 'react';
import styled from 'styled-components';
import { Modal, Platform, Keyboard, TouchableOpacity } from 'react-native';
import { SafeAreaViewStyled, ModalContent, ButtonsContainer } from './styles';
import ButtonPrimary from '../../components/ButtonPrimary';
import UnderlinedButton from '../../components/UnderlinedButton';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import { HARD_SHOT, WINE_GLASS, BEER_HALF, BEER_PINT, WINE_BOTTLE, HARD_BOTTLE } from '../ConsoFollowUp/drinksCatalog';
import { uploadAlcoholProductToOFF } from '../../services/off';
import { QuantitySetter } from './DrinkQuantitySetter';
import matomo from '../../services/matomo';

const formatDecimalNumber = (numberOrString) => {
  if (!numberOrString) return undefined;
  if (!isNaN(numberOrString)) {
    return numberOrString.toString();
  }
  return numberOrString.replace(/[^.\d]/g, '');
};

const offAuth = {
  user_id: 'openfoodfact@selego.co',
  password: 'verrib-sufseV-6cangy',
};

const computeDrinkKey = (volume, degrees) => {
  if (degrees > 15) {
    if (volume < 15) return HARD_SHOT;
    return HARD_BOTTLE;
  }
  if (volume < 15) return WINE_GLASS;
  if (volume < 35) return BEER_HALF;
  if (volume < 51) return BEER_PINT;
  return WINE_BOTTLE;
};

const NewDrinkForm = ({ isNew, code, visible, onClose, onValidate, ...init }) => {
  const [name, setName] = React.useState(init.name);
  const [degrees, setDegrees] = React.useState(init.degrees);
  const [volume, setVolume] = React.useState(init.volume <= 50 ? init.volume : null);
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState(null);
  const [showHelp, onShowHelp] = React.useState(false);

  const handleValidate = () => {
    if (!name) {
      setError('Renseignez un nom');
      Keyboard.dismiss();
      return;
    }
    if (!degrees) {
      setError("Renseignez un degré d'alcool");
      Keyboard.dismiss();
      return;
    }
    if (!volume) {
      setError('Renseignez une quantité servie en centilitres');
      Keyboard.dismiss();
      return;
    }
    const newDrinkKey = computeDrinkKey(volume, degrees);
    onValidate(name, formatDecimalNumber(volume), formatDecimalNumber(degrees), newDrinkKey, quantity);
    if (code) {
      matomo.logConsoScanOwn();
    } else {
      matomo.logConsoAddOwnManually();
    }
    uploadAlcoholProductToOFF({
      fields: {
        name,
        // quantity: bottle quantity,
        serving_quantity: volume,
        degrees: degrees,
      },
      isNew,
      code,
      test: false,
      auth: offAuth,
    });
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <SafeAreaViewStyled>
          <KeyboardAvoidingViewStyled
            behavior={Platform.select({ ios: 'padding', android: null })}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 250 })}>
            <ModalContent>
              <Title>Ajoutez une boisson</Title>
              <FormContainer>
                <Label>Nom ou marque</Label>
                <LineContainer>
                  <TextInputStyled value={name} placeholder="Nom ou marque" onChangeText={setName} />
                </LineContainer>
                <Label>Degré d'alcool</Label>
                <LineContainer marginBottom={5}>
                  <TextInputStyled
                    value={degrees}
                    placeholder="Pastis: 40˚, bière: 5˚..."
                    onChangeText={(deg) => setDegrees(formatDecimalNumber(deg))}
                    keyboardType="decimal-pad"
                  />
                  <Unit>degrés</Unit>
                </LineContainer>
                <LineContainer marginBottom={-7}>
                  <Label>Quantité servie par contenant</Label>
                  <Help onPress={() => onShowHelp(true)}>
                    <HelpText>?</HelpText>
                  </Help>
                </LineContainer>
                <LineContainer marginBottom={22}>
                  <TextInputStyled
                    value={volume}
                    placeholder="Verre de vin: 12cl, spiritueux: 4cl..."
                    onChangeText={(vol) => setVolume(formatDecimalNumber(vol))}
                    keyboardType="numeric"
                  />
                  <Unit>centilitres</Unit>
                </LineContainer>
                <LineContainer>
                  <Label>Quantité bue</Label>
                  <QuantitySetter quantity={quantity} onSetQuantity={setQuantity} />
                </LineContainer>
                <ButtonsContainer>
                  <ButtonPrimary content="Ajoutez" onPress={handleValidate} />
                  <UnderlinedButton content="Retour" bold onPress={onClose} />
                </ButtonsContainer>
                {error && <Error>{error}</Error>}
              </FormContainer>
            </ModalContent>
          </KeyboardAvoidingViewStyled>
        </SafeAreaViewStyled>
        <DrinksQuantityExample visible={showHelp} onClose={() => onShowHelp(false)} onPress={setVolume} />
      </Modal>
    </>
  );
};

const examples = {
  'Bouteille de bière': '30',
  'Petite canette': '33',
  'Grande canette': '50',
  'Verre de vin': '12',
  'Bouteille de vin': '75',
  Spiritueux: '4',
  'Bouteille de spiritueux': '75',
};

const DrinksQuantityExample = ({ visible, onPress, onClose }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <SafeAreaViewStyled>
      <CloseHelp>
        <UnderlinedButton content="Fermer" bold onPress={onClose} />
      </CloseHelp>
      <ModalContent>
        <Title>Exemples de quantités servies par contenant</Title>
        <Explanation last>Cliquez sur un contenant pour remplir automatiquement le champ</Explanation>
        <FormContainer>
          {Object.keys(examples).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                onPress(examples[key]);
                onClose();
              }}>
              <LineContainer marginBottom={0}>
                <Label>{key}: </Label>
                <QuantityText>{examples[key]}cl</QuantityText>
              </LineContainer>
            </TouchableOpacity>
          ))}
        </FormContainer>
      </ModalContent>
    </SafeAreaViewStyled>
  </Modal>
);

const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
  flex: 1;
`;

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

const TextInputStyled = styled.TextInput.attrs((props) => ({
  clearButtonMode: 'always',
}))`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  padding-left: 15px;
  background-color: #f3f3f6;
  border: 1px solid #dbdbe9;
  color: #4030a5;
  border-radius: 7px;
  justify-content: center;
`;

export const Label = styled(H2)`
  color: #191919;
  margin: 0 10px 5px;
  height: 30px;
  line-height: 30px;
`;

const Unit = styled.Text`
  height: 100%;
  flex-shrink: 0;
  color: #4030a5;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
  margin-left: 15px;
  line-height: 50px;
`;

const Error = styled.Text`
  height: 25px;
  line-height: 25px;
  text-align: center;
  text-align-vertical: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #c0184a;
`;

const QuantityText = styled.Text`
  margin-right: auto;
`;

const Explanation = styled(H3)`
  color: #191919;
  margin: 0px 30px 15px;
  font-style: italic;
`;

export const Help = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #39cec0;
  background-color: white;
  margin-right: auto;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;

export const HelpText = styled.Text`
  color: #39cec0;
  font-weight: bold;
  font-size: 15px;
`;

export const CloseHelp = styled.View`
  margin-left: auto;
`;

export default NewDrinkForm;
