import styled from 'styled-components';
import { defaultPaddingFontScale } from '../styles/theme';

export const TopContainer = styled.View`
  padding: 5px ${defaultPaddingFontScale()}px;
`;

export const P = styled.Text`
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 24px;
`;

export const Bold = styled.Text`
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : '#000')};
`;

export const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export const Underlined = styled.Text`
  color: ${(props) => (props.color ? props.color : '#000')};
  text-decoration: underline;
`;
