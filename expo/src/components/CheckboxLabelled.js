import React from "react";
import ExpoCheckbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import styled from "styled-components";
import ButtonPrimary from "./ButtonPrimary";
import { P } from "./Articles";

const CheckboxLabelled = ({
  answerKey,
  content,
  alertText,
  onPress,
  checked = false,
  disabled = false,
  result = false,
}) => {
  const navigation = useNavigation();
  return (
    <Container
      onPress={() => onPress?.(answerKey)}
      showDisabled={disabled && !result}
      disabled={disabled}>
      <ItemContainer showDisabled={disabled && !result}>
        <CheckBoxContainer>
          {/* <CheckBoxStyled
            // ios style
            onCheckColor="#4030a5"
            onTintColor="#4030a5"
            onFillColor="#4030a511"
            animationDuration={0.2}
            boxType="square"
            lineWidth={1}
            //android style
            tintColors={{ true: "#4030a5", false: "#c4c4c4" }}
            //common props
            disabled={disabled}
            value={checked}
          /> */}
          <ExpoCheckbox
            color="#4030a5"
            className="h-5 w-5 rounded-md"
            value={checked}
            disabled={disabled}
            onValueChange={() => onPress?.(answerKey)}
          />
        </CheckBoxContainer>
        <P noMarginBottom>{content}</P>
      </ItemContainer>
      {!!checked && !!alertText && (
        <AlertContainer>
          <P color="#1a1a1a" noMarginBottom>
            {alertText}
          </P>
          <ButtonPrimaryStyled
            small
            widthSmall
            content="Échanger avec un conseiller"
            onPress={() => navigation.navigate("CONTACT")}
          />
        </AlertContainer>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  ${({ showDisabled }) => showDisabled && "opacity: 0.5;"}
`;

const CheckBoxContainer = styled.View`
  padding: 2px;
  flex-shrink: 0;
  margin-left: ${Platform.select({ ios: 0, android: -10 })}px;
  margin-right: ${Platform.select({ ios: 10, android: 20 })}px;
`;

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-vertical: 12px;
  margin-right: 10px;
  ${({ showDisabled }) => showDisabled && "opacity: 0.5;"};
`;

const AlertContainer = styled.View`
  padding: 15px;
  border-radius: 10px;
  margin: 5px;
  background-color: #de285e11;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 20px;
  align-self: center;
`;

export default CheckboxLabelled;
