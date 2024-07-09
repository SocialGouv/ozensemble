import styled from "styled-components/native";
import { Platform } from "react-native";

const TextInputStyled = styled.TextInput`
  ${Platform.OS === "android" && "font-family: Raleway;"}
`;

export default TextInputStyled;
