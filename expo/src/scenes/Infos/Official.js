import React from "react";
import { Image, View, Text } from "react-native";
import * as Linking from "expo-linking";
import styled from "styled-components";
import WrapperContainer from "../../components/WrapperContainer";
import TextStyled from "../../components/TextStyled";
import H1 from "../../components/H1";
import Background from "../../components/Background";

const Official = ({ onClose }) => (
  <Background color="#39cec0" withSwiperContainer neverBottom>
    <WrapperContainer onPressBackButton={onClose}>
      <View className="items-center">
        <Image
          className="rounded-full w-[100px] h-[100px]"
          source={require("../../assets/images/Icon.png")}
        />
      </View>
      <Spacer size={30} />
      <H1>Oz Ensemble, l’application des Ministères Sociaux</H1>
      <Spacer size={30} />

      <P>
        Oz est un service publique numérique anonyme et gratuit développé par la Fabrique Numérique,
        incubateur des Ministères Sociaux et financé par l’Agence Régionale de Santé d’Ile de France
        et de la MILDECA (Mission Interministérielle de Lutte Contre les Drogues et les Conduites
        Addictives)
      </P>
      <View className="flex flex-row basis-11/12">
        <P noMarginBottom>
          Le créateur du service est le{" "}
          <Text
            className="text-indigo-700"
            onPress={() => {
              Linking.openURL("https://www.linkedin.com/in/geraldine-talbot-13989b263");
            }}>
            Docteur Géraldine Talbot
          </Text>
          , médecin addictologue de l’association CaPASSCité.
        </P>
      </View>

      {/*  */}
      <View className="flex-row items-center justify-between">
        <Image
          className="w-[45%]"
          source={require("../../assets/images/MIN_SOCIAUX.png")}
          resizeMode="contain"
        />
        <Image
          className="w-[45%]"
          resizeMode="contain"
          source={require("../../assets/images/Logo_ARS.png")}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Image
          className="w-[45%]"
          resizeMode="contain"
          source={require("../../assets/images/logo_MILDECA.png")}
        />
        <Image
          className="w-[45%]"
          resizeMode="contain"
          source={require("../../assets/images/CaPASSCite.png")}
        />
      </View>
    </WrapperContainer>
  </Background>
);

const P = styled(TextStyled)`
  font-size: 16px;
  margin-bottom: 15px;
`;

const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default Official;
