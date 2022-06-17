import styled from 'styled-components';
import { defaultPaddingFontScale } from '../styles/theme';

export const TopContainer = styled.View`
  padding: 5px ${defaultPaddingFontScale()}px;
`;

export const P = styled.Text`
  color: ${({ color }) => color || '#000'};
  ${({ noMarginBottom }) => !noMarginBottom && 'margin-bottom: 15px'};
  ${({ bold }) => bold && 'font-weight: bold'};
  font-size: 16px;
  line-height: 24px;
  ${({ underlined, color }) =>
    underlined &&
    `text-decoration: underline;
    text-decoration-color: ${color || '#000'}`};
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
  text-decoration-color: ${(props) => (props.color ? props.color : '#000')};
`;
