import React from "react";
import { Dimensions, View } from "react-native";
import BackButton from "../../components/BackButton";
import { defaultPaddingFontScale } from "../../styles/theme";
import styled from "styled-components";
import WebView from "react-native-webview";
import { CGUS_AND_PRIVACY_POLICY_TEXT } from "../../reference/urls";

const CGUs = ({ onClose }) => (
  <View className="flex-1 justify-start items-center mt-6">
    <View className="flex flex-row w-full mb-4" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
      <BackButton onPress={onClose} />
    </View>
    <WebViewContainer>
      <WebView
        originWhitelist={['*']}
        source={{
          html: CGUS_AND_PRIVACY_POLICY_TEXT,
        }}
        style={{ flex: 1, width: Dimensions.get("window").width }}
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
