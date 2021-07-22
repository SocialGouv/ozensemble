/* eslint-disable quotes */
import React from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {
  BarCodeHint,
  ButtonsContainerSafe,
  ButtonsContainer,
  CameraButtonsContainerSafe,
  CameraButton,
} from './styles';
import ButtonPrimary from '../../components/ButtonPrimary';
import UnderlinedButton from '../../components/UnderlinedButton';
import TorchIcon from '../../components/TorchIcon';
import CONSTANTS from '../../reference/constants';
import { getOFFDataFromBarCode, extractAlcoholDataFromOFFData } from '../../services/off';
import matomo from '../../services/matomo';

class BarCodeReader extends React.Component {
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
    const dontShowScanAlert = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_DONT_SHOW_SCAN_ALERT);
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
                await AsyncStorage.setItem(CONSTANTS.STORE_KEY_DONT_SHOW_SCAN_ALERT, 'true');
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

  handleAddManually = () => {
    // this.handleBarCodeRead({ data: 3244081500005 });
    // this.handleDrinkData(heineken);
    this.props.onAddDrink();
    matomo.logConsoAddOwnManuallyOpen();
  };

  handleClose = () => {
    this.reset();
    this.props.onClose();
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
            onPress: this.props.onAddDrink,
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
            onPress: () => this.props.onAddDrink({ code: this.barCode, isNew: true }),
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
    this.props.onAddDrink({
      ...extractAlcoholDataFromOFFData(drinkData),
      isNew: false,
      code: this.barCode,
    });
  };

  render() {
    const { visible } = this.props;
    const { withTorch } = this.state;

    return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={this.handleClose}>
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
              <UnderlinedButton content="Retour" bold onPress={this.handleClose} />
            </ButtonsContainer>
          </ButtonsContainerSafe>
          <CameraButtonsContainerSafe>
            <ButtonsContainer flexStart>
              <TouchableWithoutFeedback
                onPress={this.toggleTorch}
                hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
                <CameraButton>
                  <TorchIcon size={20} showWithCrossLine={withTorch} />
                </CameraButton>
              </TouchableWithoutFeedback>
            </ButtonsContainer>
          </CameraButtonsContainerSafe>
        </CameraContainer>
      </Modal>
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
