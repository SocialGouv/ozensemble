import React, { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import { QuantitySetter } from '../../components/DrinkQuantitySetter';
import H2 from '../../components/H2';
import GoBackButtonText from '../../components/GoBackButtonText';
import { OPEN_FOOD_FACT_PASSWORD, OPEN_FOOD_FACT_USER_ID } from '../../config';
import matomo from '../../services/matomo';
import { uploadAlcoholProductToOFF } from '../../services/off';
import { BEER_HALF, BEER_PINT, HARD_BOTTLE, HARD_SHOT, WINE_BOTTLE, WINE_GLASS } from '../ConsoFollowUp/drinksCatalog';
import { ButtonsContainer, Container, ModalContent } from './styles';

const formatDecimalNumber = (numberOrString) => {
  if (!numberOrString) return undefined;
  if (!isNaN(numberOrString)) {
    return numberOrString.toString();
  }
  return numberOrString.replace(/[^.\d]/g, '');
};

const openFoodFactAuth = {
  user_id: OPEN_FOOD_FACT_USER_ID,
  password: OPEN_FOOD_FACT_PASSWORD,
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

const NewDrinkForm = ({ route, navigation }) => {
  const { init } = route.params;
  const { isNew, code } = init;
  const [name, setName] = useState(init.name);
  const [degrees, setDegrees] = useState(init.degrees);
  const [volume, setVolume] = useState(init.volume <= 50 ? init.volume : null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (route?.params?.newVolume) setVolume(route.params.newVolume);
  }, [route?.params?.newVolume]);

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
    navigation.navigate('CONSOS_LIST', {
      addNewDrinkFromForm: {
        name,
        volume: formatDecimalNumber(volume),
        degrees: formatDecimalNumber(degrees),
        drinkKey: computeDrinkKey(volume, degrees),
        quantity,
        timestamp: Date.now(),
      },
    });
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
      auth: openFoodFactAuth,
    });
  };

  const handleCancel = () => {
    navigation.setParams({ addNewDrinkFromForm: null });
    navigation.goBack();
  };

  return (
    <Container>
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
              <Help onPress={() => navigation.navigate('CONSO_DRINKS_QUANTITY_EXAMPLES')}>
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
              <GoBackButtonText content="Retour" bold onPress={handleCancel} />
            </ButtonsContainer>
            {error && <Error>{error}</Error>}
          </FormContainer>
        </ModalContent>
      </KeyboardAvoidingViewStyled>
    </Container>
  );
};

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

const TextInputStyled = styled.TextInput.attrs({
  clearButtonMode: 'always',
})`
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

const Label = styled(H2)`
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

const Help = styled.TouchableOpacity`
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

const HelpText = styled.Text`
  color: #39cec0;
  font-weight: bold;
  font-size: 15px;
`;

export default NewDrinkForm;
