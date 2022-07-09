import styled from 'styled-components';

export const TopContainer = styled.View`
  margin-top: 20px;
`;

export const P = styled.Text`
  color: ${({ color }) => color || '#000'};
  ${({ noMarginBottom }) => !noMarginBottom && 'margin-bottom: 15px'};
  ${({ bold }) => bold && 'font-weight: bold'};
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  ${({ underlined, color }) =>
    underlined &&
    `text-decoration: underline;
    text-decoration-color: ${color || '#000'}`};
  ${({ textCenter }) => textCenter && 'text-align:center'}
`;

export const Bold = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.color ? props.color : '#000')};
`;

export const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  flex-shrink: 0;
`;

export const Underlined = styled.Text`
  color: ${(props) => (props.color ? props.color : '#000')};
  font-size: 16px;
  line-height: 24px;
  text-decoration: underline;
  flex: 1;
  max-width: 100%;
  text-decoration-color: ${(props) => (props.color ? props.color : '#000')};
`;
