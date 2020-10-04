import React from 'react';
import styled from 'styled-components';
import { Modal, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { BackButton } from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../components/Background';

const DoctoLib = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onDismiss={onClose}>
      <SafeAreaProvider>
        <Background color="#f9f9f9">
          <Container>
            <TopBar>
              <BackButton withoutPadding content="< Retour" onPress={onClose} bold />
            </TopBar>
            <WebViewContainer>
              <WebView
                source={{
                  uri:
                    'https://www.doctolib.fr/addictologue/montreuil/ensemble-oz?utm_campaign=website-button&amp;utm_source=ensemble-oz-website-button&amp;utm_medium=referral&amp;utm_content=option-1&amp;utm_term=ensemble-oz',
                }}
                renderLoading={Loading}
                startInLoadingState
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
