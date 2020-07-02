import React from 'react';
import styled from 'styled-components';
import { Modal, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { BackButton } from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { titleColor } from '../styles/theme';
import Background from '../components/Background';

const DoctoLib = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" onDismiss={onClose}>
      <SafeAreaProvider>
        <Background color="whiteBg">
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
    <ActivityIndicator color={titleColor} />
  </LoadingContainer>
);

const Container = styled.View`
  height: 100%;
`;

const TopBar = styled.View`
  height: 50px;
  padding-left: 20px;
  justify-content: flex-start;
`;

const LoadingContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  justify-content: center;
`;

const WebViewContainer = styled.View`
  flex-grow: 1;
  flex-shrink: 2;
  height: 100%;
  width: ${Dimensions.get('window').width}px;
`;

export default DoctoLib;
