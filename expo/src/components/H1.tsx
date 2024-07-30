import React from "react";
import { Text, Dimensions, Platform, TextStyle, TextProps } from "react-native";
import { styled } from "nativewind";

const { height } = Dimensions.get("window");

function getResponsiveClasses(): string {
  if (height > 800) return "text-[23px] leading-[30px]";
  if (height > 700) return "text-[20px] leading-[30px]";
  return "text-[17px] leading-[25px]";
}

const responsiveClasses = getResponsiveClasses();
const fontWeight = Platform.OS === "android" ? "font-bold" : "font-extrabold";

const StyledH1 = styled(Text, `${responsiveClasses} ${fontWeight} text-[#4030a5]`);

interface H1Props extends TextProps {
  style?: TextStyle;
}

export default function H1({ style, ...props }: H1Props): React.ReactElement {
  return <StyledH1 style={style} {...props} />;
}
