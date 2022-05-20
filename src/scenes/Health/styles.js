import styled, { css } from 'styled-components';
import H2 from '../../components/H2';
import H1 from '../../components/H1';
import { screenWidth } from '../../styles/theme';
import GoBackButtonText from '../../components/GoBackButtonText';
import { defaultPadding } from '../../styles/theme';

export const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
`;

export const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

const paddingHorizontal = 30;
export const TopContainer = styled.View`
  padding: 5px ${paddingHorizontal}px;
`;

export const TopTitle = styled(H1)`
  ${commonCss}
  margin-top: 0px;
  margin-bottom: 10px;
`;

export const TopSubTitle = styled(H2)`
  ${commonCss};
  margin-bottom: 10px;
`;

export const Extra = styled(H2)`
  ${commonCss}
  font-style: italic;
  font-weight: normal;
  margin-bottom: 10px;
  color: #191919;
`;

export const Link = styled.Text`
  ${commonCss}
  font-style: italic;
  font-weight: normal;
  margin-bottom: 10px;
  color: #4030a5;
  text-decoration-line: underline;
`;

export const TopButtonContainer = styled.View`
  margin-vertical: 20px;
  align-items: flex-start;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-around;
  margin-left: ${-paddingHorizontal}px;
  width: ${screenWidth}px;
`;

export const FormContainer = styled.View`
  margin-top: 30px;
  align-items: flex-start;
`;

export const LabelStyled = styled.Text`
  color: #4030a5;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const TextInputStyled = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #f3f3f6;
  border: 1px solid #dbdbe9;
  color: #4030a5;
  border-radius: 7px;
  padding-left: 15px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const ErrorStyled = styled.Text`
  font-size: 12px;
  color: #de285e;
`;

export const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
  ${(props) => !props.withoutPadding && 'padding-horizontal: 15px;'}
  ${(props) => !props.withoutPadding && 'margin-bottom: 15px;'}
`;

export const P = styled.Text`
  margin-bottom: 15px;
`;

export const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export const Bold = styled.Text`
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : '#000')};
`;

export const Underline = styled.Text`
  text-decoration: underline;
`;
