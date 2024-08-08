import React from "react";
import { Animated, Platform, StyleSheet } from "react-native";

const AnimatedText = ({
  color = "#191919",
  semibold,
  bold,
  italic,
  center,
  underline,
  size,
  lineHeight,
  style,
  ...props
}) => {
  const classNames = [
    "font-raleway",
    color !== "#191919" && `text-[${color}]`,
    semibold && "font-semibold",
    bold && "font-bold",
    italic && "italic",
    center && "text-center",
    underline && "underline",
    size && `text-[${size}px]`,
    lineHeight && `leading-[${lineHeight}px]`,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyle = {
    ...(Platform.OS === "android" && styles.androidFont),
    ...(underline && { textDecorationColor: color }),
  };

  return <Animated.Text {...props} className={classNames} style={[inlineStyle, style]} />;
};

const styles = StyleSheet.create({
  androidFont: {
    fontFamily: "Raleway",
  },
});

export default AnimatedText;
