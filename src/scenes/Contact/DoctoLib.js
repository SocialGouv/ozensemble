import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Modal, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { BackButton } from './styles';
import Background from '../../components/Background';
import matomo from '../../services/matomo';

const DoctoLib = ({ navigation }) => {
  const [visible, setVisible] = useState(true);

  const hide = () => {
    navigation.goBack();
    setVisible(false);
  };

  const rdvHasBeenTaken = useRef(false);

  const handleWebViewNavigationStateChange = (newNavState) => {
    /*

    Below are all the steps for making an appointment with Doctolib

    */

    // "https://www.doctolib.fr/addictologue/montreuil/ensemble-oz/booking/new-patient?amp%3Butm_content=option-1&amp%3Butm_medium=referral&amp%3Butm_source=ensemble-oz-website-button&amp%3Butm_term=ensemble-oz&utm_campaign=website-button"

    // "https://www.doctolib.fr/addictologue/montreuil/ensemble-oz/booking/telehealth-suggestion?amp%3Butm_content=option-1&amp%3Butm_medium=referral&amp%3Butm_source=ensemble-oz-website-button&amp%3Butm_term=ensemble-oz&isNewPatient=true&isNewPatientBlocked=false&utm_campaign=website-button"

    // "https://www.doctolib.fr/addictologue/montreuil/ensemble-oz/booking/availabilities?amp%3Butm_content=option-1&amp%3Butm_medium=referral&amp%3Butm_source=ensemble-oz-website-button&amp%3Butm_term=ensemble-oz&isNewPatient=true&isNewPatientBlocked=false&motiveKey=Consultation%20vid%C3%A9o%20-%20nouveau%20patient-396&specialityId=396&telehealth=true&utm_campaign=website-button"

    // "https://www.doctolib.fr/addictologue/montreuil/ensemble-oz/booking/availabilities?amp%3Butm_content=option-1&amp%3Butm_medium=referral&amp%3Butm_source=ensemble-oz-website-button&amp%3Butm_term=ensemble-oz&isNewPatient=true&isNewPatientBlocked=false&motiveKey=Consultation%20vid%C3%A9o%20-%20nouveau%20patient-396&specialityId=396&telehealth=true&utm_campaign=website-button"

    // "https://www.doctolib.fr/account/new"

    // "https://www.doctolib.fr/account/two-factor"

    // "https://www.doctolib.fr/appointments/big-hash/edit"

    // "https://www.doctolib.fr/appointments/big-hash/edit"

    // "https://www.doctolib.fr/appointments/big-hash/charges/new"

    // "https://www.doctolib.fr/confirmed-appointment/big-hash"

    const { url } = newNavState;
    if (url.includes('confirmed-appointment') && !rdvHasBeenTaken.current) {
      rdvHasBeenTaken.current = true;
      matomo.logContactConfirmRDV();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="formSheet" onRequestClose={hide}>
      <SafeAreaProvider>
        <Background color="#f9f9f9">
          <Container>
            <TopBar>
              <BackButton withoutPadding content="< Retour" onPress={hide} bold />
            </TopBar>
            <WebViewContainer>
              <WebView
                source={{
                  uri: 'https://www.doctolib.fr/addictologue/montreuil/ensemble-oz?utm_campaign=website-button&amp;utm_source=ensemble-oz-website-button&amp;utm_medium=referral&amp;utm_content=option-1&amp;utm_term=ensemble-oz',
                }}
                renderLoading={Loading}
                startInLoadingState
                onNavigationStateChange={handleWebViewNavigationStateChange}
              />
            </WebViewContainer>
          </Container>
        </Background>
      </SafeAreaProvider>
    </Modal>
  );
};

const Loading = () => (
  <LoadingContainer>
    <ActivityIndicator color="#4030a5" />
  </LoadingContainer>
);

const Container = styled.View`
  height: 100%;
`;

const TopBar = styled.View`
  height: 50px;
  padding-left: 20px;
  justify-content: flex-start;
  flex-grow: 0;
`;

const LoadingContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 100%;
  justify-content: center;
  flex-grow: 1;
`;

const WebViewContainer = styled.View`
  flex-grow: 1;
  flex-shrink: 2;
  height: 100%;
  width: ${Dimensions.get('window').width}px;
`;

export default DoctoLib;
