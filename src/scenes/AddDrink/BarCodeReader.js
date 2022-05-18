import React, { Component } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import TorchIcon from '../../components/TorchIcon';
import GoBackButtonText from '../../components/GoBackButtonText';
import matomo from '../../services/matomo';
import { extractAlcoholDataFromOFFData, getOFFDataFromBarCode } from '../../services/off';
import {
  BarCodeHint,
  ButtonsContainer,
  ButtonsContainerSafe,
  CameraButton,
  CameraButtonsContainerSafe,
} from './styles';
import { storage } from '../../services/storage';

class BarCodeReader extends Component {
  state = {
    withTorch: false,
  };
  barCodeRead = false;
  barCode = null;

  reset = async (showScanAlert = false) => {
    this.barCodeRead = false;
    this.barCode = null;
    if (showScanAlert) this.showScanAlert();
  };

  showScanAlert = async () => {
    const dontShowScanAlert = storage.getString('@ScanAlert');
    if (dontShowScanAlert) return;
    setTimeout(() => {
      if (this.props.visible) {
        Alert.alert(
          'Scannez bien le code-barres de la boisson, pas son étiquette !',
          null,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
            {
              text: 'Ne plus afficher',
              onPress: async () => {
                storage.set('@ScanAlert', 'true');
              },
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
      }
    }, 500);
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) this.reset(true);
  }

  toggleTorch = () => this.setState(({ withTorch }) => ({ withTorch: !withTorch }));

  handleAddDrink = (drink = {}) => {
    this.props.navigation.navigate('CONSOS_LIST', {
      addBarCodeDrink: {
        ...drink,
        timestamp: Date.now(),
      },
    });
  };

  handleAddManually = () => {
    this.handleAddDrink();
    matomo.logConsoAddOwnManuallyOpen();
  };

  handleClose = () => {
    this.reset();
    this.props.navigation.goBack();
  };

  handleBarCodeRead = async (e) => {
    if (this.barCodeRead) return;
    this.barCodeRead = true;
    this.barCode = e.data;
    if (!this.barCode) {
      Alert.alert(
        "Nous n'arrivons pas à lire le code-barres",
        null,
        [
          {
            text: 'Ajoutez la boisson manuellement',
            onPress: this.handleAddDrink,
          },
          {
            text: 'Réessayer',
            style: 'cancel',
            onPress: this.reset,
          },
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: this.handleClose,
          },
        ],
        { cancelable: true }
      );
      return;
    }
    const drinkData = await getOFFDataFromBarCode(this.barCode);
    if (!drinkData) {
      Alert.alert(
        'Nous ne trouvons pas la boisson dans la base de données',
        null,
        [
          {
            text: 'Ajoutez la boisson manuellement',
            onPress: () => this.handleAddDrink({ code: this.barCode, isNew: true }),
          },
          {
            text: 'Essayer un autre code-barres',
            style: 'cancel',
            onPress: this.reset,
          },
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: this.handleClose,
          },
        ],
        { cancelable: true }
      );
      return;
    }
    this.handleAddDrink({
      ...extractAlcoholDataFromOFFData(drinkData),
      isNew: false,
      code: this.barCode,
    });
  };

  render() {
    const { withTorch } = this.state;

    return (
      <CameraContainer>
        <Preview
          type={RNCamera.Constants.Type.back}
          flashMode={withTorch ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: "Permission pour utiliser l'appareil photo",
            message:
              'Oz Ensemble souhaite accéder à votre appareil photo afin de lire les codes barres des produits que vous scannez',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={this.handleBarCodeRead}
        />
        <ButtonsContainerSafe>
          <BarCodeHint>Scannez le code-barres d'une boisson ou</BarCodeHint>
          <ButtonsContainer>
            <ButtonPrimary content="Ajoutez manuellement" onPress={this.handleAddManually} />
            <GoBackButtonText content="Retour" bold onPress={this.handleClose} />
          </ButtonsContainer>
        </ButtonsContainerSafe>
        <CameraButtonsContainerSafe>
          <ButtonsContainer flexStart>
            <TouchableWithoutFeedback onPress={this.toggleTorch} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
              <CameraButton>
                <TorchIcon size={20} showWithCrossLine={withTorch} />
              </CameraButton>
            </TouchableWithoutFeedback>
          </ButtonsContainer>
        </CameraButtonsContainerSafe>
      </CameraContainer>
    );
  }
}

const CameraContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex: 1;
  flex-direction: column;
  background-color: #191919;
`;

const Preview = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export default BarCodeReader;
