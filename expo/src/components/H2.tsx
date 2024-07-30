import React from "react";
import { Text, Dimensions, TextProps, TextStyle } from "react-native";
import { styled } from "nativewind";

const { height } = Dimensions.get("window");

function getResponsiveClasses(): string {
  if (height > 800) return "text-[20px] leading-[30px]";
  if (height > 700) return "text-[17.5px] leading-[23px]";
  return "text-[16px] leading-[20px]";
}

const responsiveClasses = getResponsiveClasses();

const StyledH2 = styled(Text, `${responsiveClasses} font-bold text-[#191919]`);

interface H2Props extends TextProps {
  style?: TextStyle;
}

export default function H2({ style, ...props }: H2Props): React.ReactElement {
  return <StyledH2 style={style} {...props} />;
}
