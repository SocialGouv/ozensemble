import React from "react";
import { Text, Dimensions, TextProps, TextStyle } from "react-native";
import { styled } from "nativewind";

const { height } = Dimensions.get("window");

function getResponsiveClasses(): string {
  if (height > 800) return "leading-4.5";
  if (height > 700) return "leading-5";
  return "leading-4";
}

const responsiveClasses = getResponsiveClasses();

const StyledH3 = styled(Text, `text-base ${responsiveClasses} text-[#191919]`);

interface H3Props extends TextProps {
  style?: TextStyle;
}

export default function H3({ style, ...props }: H3Props): React.ReactElement {
  return <StyledH3 style={style} {...props} />;
}
