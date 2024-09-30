import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

export default function TextStyled({
  color = "#191919",
  semibold,
  bold,
  italic,
  center,
  underline,
  size,
  lineHeight,
  style,
  textClassName = "",
  ...props
}) {
  return (
    <Text
      className={[
        "font-raleway",
        color !== "#191919" && `text-[${color}]`,
        semibold && "font-semibold",
        bold && "font-bold",
        italic && "italic",
        center && "text-center",
        underline && "underline",
        size && `text-[${size}px]`,
        lineHeight && `leading-[${lineHeight}px]`,
        textClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      style={[
        styles.text,
        underline && {
          textDecorationColor: color,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  text: Platform.select({
    android: { fontFamily: "Raleway" },
    ios: {},
  }),
});
