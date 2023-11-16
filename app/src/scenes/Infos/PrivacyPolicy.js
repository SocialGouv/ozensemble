import React from 'react';
import { Dimensions, View } from 'react-native';
// import Pdf from 'react-native-pdf';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';

const htmlUrl = 'https://ozensemble.fabique.social.gouv.fr/files/privacy_policy_app.html';

const PrivacyPolicy = ({ onClose }) => (
  <View className="flex-1 justify-start items-center mt-6">
    <View className="flex flex-row w-full mb-4" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
      <BackButton onPress={onClose} />
    </View>
    {/* <Pdf
      trustAllCerts={false}
      source={{
        uri: pdfUrl,
        // cache: true,
      }}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      onPageChanged={(page, numberOfPages) => {
        console.log(`Current page: ${page}`);
      }}
      onError={(error) => {
        console.log(error);
      }}
      className="flex-1 w-screen h-screen"
    /> */}

    <WebViewContainer>
      <WebView
        source={{
          uri: htmlUrl,
        }}
      />
    </WebViewContainer>
  </View>
);

export default PrivacyPolicy;

const WebViewContainer = styled.View`
  flex-grow: 1;
  flex-shrink: 2;
  height: 100%;
  width: ${Dimensions.get('window').width}px;
`;
