import React from "react";
import { Dimensions, View } from "react-native";
import BackButton from "../../components/BackButton";
import { defaultPaddingFontScale } from "../../styles/theme";
import styled from "styled-components";
import WebView from "react-native-webview";

const htmlUrl = "https://ozensemble.fabrique.social.gouv.fr/files/CGU_app.html";

const CGUs = ({ onClose }) => (
  <View className="flex-1 justify-start items-center mt-6">
    <View
      className="flex flex-row w-full mb-4"
      style={{ paddingHorizontal: defaultPaddingFontScale() }}>
      <BackButton onPress={onClose} />
    </View>
    <WebViewContainer>
      <WebView
        source={{
          uri: htmlUrl,
        }}
      />
    </WebViewContainer>
  </View>
);

export default CGUs;

const WebViewContainer = styled.View`
  flex-grow: 1;
  flex-shrink: 2;
  height: 100%;
  width: ${Dimensions.get("window").width}px;
`;
