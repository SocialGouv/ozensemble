import React from "react";
import { TouchableOpacity, Platform, Dimensions } from "react-native";
import TextStyled from "./TextStyled";
import { defaultPaddingFontScale } from "../styles/theme";

const { height } = Dimensions.get("window");

export default function BackButton({ onPress, marginBottom, marginLeft, marginTop, small = false }) {
  return (
    <TouchableOpacity
      style={[
        { marginRight: "auto" },
        marginBottom && { marginBottom: 20 },
        marginLeft && { marginLeft: defaultPaddingFontScale() },
        marginTop && { marginTop: 20 },
      ]}
      onPress={onPress}
    >
      <TextStyled
        className={[
          "text-[#191919] flex-shrink-0 justify-center items-center",
          Platform.OS === "android" ? "font-bold" : "font-extrabold",
          height > 800
            ? small
              ? "text-[15px]"
              : "text-[20px]"
            : height > 700
            ? small
              ? "text-[13px]"
              : "text-[18px]"
            : small
            ? "text-[13px]"
            : "text-[15px]",
        ].join(" ")}
        style={{ textAlignVertical: "center" }}
      >
        {"< Retour"}
      </TextStyled>
    </TouchableOpacity>
  );
}
