import ExpoCheckbox from "expo-checkbox";

import React, { useState } from "react";
import { Modal, Platform, TouchableWithoutFeedback, View, Text } from "react-native";
import CGUs from "../Infos/CGUs";
import PrivacyPolicy from "../Infos/PrivacyPolicy";
import { screenWidth } from "../../styles/theme";

const hitSlop = { top: 40, left: 40, right: 40, bottom: 40 };

const Agreement = ({ onAgree, agreed }) => {
  const [showCGUs, setShowCGUs] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const Wrapper = Platform.select({
    ios: TouchableWithoutFeedback,
    android: View,
  });

  const wrapperProps = Platform.select({
    ios: { onPress: onAgree, hitSlop },
    android: {},
  });

  return (
    <>
      <View
        style={{
          bottom: (Math.ceil((212 / 375) * screenWidth) / 3) * 2.15,
        }}
        className="w-3/4 mt-[5%] mb-5 flex-row justify-center items-center absolute">
        {/* <CheckBox
          onCheckColor="#fff"
          onTintColor="#fff"
          animationDuration={0.2}
          boxType="square"
          lineWidth={2}
          tintColors={{ true: "#fff", false: "#AAAAAA" }}
          value={agreed}
          onChange={Platform.select({ android: onAgree, ios: null })}
          className="h-full w-full"
          onValueChange={console.log}
        /> */}
        <Wrapper {...wrapperProps}>
          <View className="flex-shrink-0 mr-2.5 border-white border-2 rounded-md justify-center items-center">
            <ExpoCheckbox
              color="#4030a5"
              className="h-6 w-6 rounded-md"
              value={agreed}
              onValueChange={onAgree}
            />
          </View>
        </Wrapper>
        <View className="ml-3.5 flex-shrink-1">
          <Text className="text-xs text-white leading-[19.2px]">
            En cochant cette case vous acceptez nos{" "}
            <Text className="underline" onPress={() => setShowCGUs(true)}>
              Conditions Générales d'Utilisation
            </Text>{" "}
            et notre{" "}
            <Text className="underline" onPress={() => setShowPrivacyPolicy(true)}>
              Politique de Confidentialité.
            </Text>
          </Text>
        </View>
      </View>
      <Modal
        visible={showCGUs}
        animationType="slide"
        presentationStyle="formSheet"
        onDismiss={() => setShowCGUs(false)}>
        <CGUs onClose={() => setShowCGUs(false)} />
      </Modal>
      <Modal
        visible={showPrivacyPolicy}
        animationType="slide"
        presentationStyle="formSheet"
        onDismiss={() => setShowPrivacyPolicy(false)}>
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      </Modal>
    </>
  );
};

export default Agreement;
