import styled, { css } from 'styled-components';
import { Dimensions } from 'react-native';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';

export const Container = styled.View`
  height: 100%;
  width: ${Dimensions.get('window').width}px;
`;

export const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  padding: 20px ${defaultPaddingFontScale()}px ${(props) => (props.shortPaddingBottom ? 30 : 100)}px;
`;

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
  flex: 1;
  min-height: 100%;
`;

const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

export const TopTitle = styled(H2)`
  ${commonCss}
  margin-top: 10px;
`;

export const TopSubTitle = styled(H3)`
  ${commonCss}
  margin-top: 35px;
`;

export const FeedBackStyled = styled.TextInput`
  width: 100%;
  height: 100px;
  border-radius: 3px;
  border: 1px solid #dbdbe9;
  background-color: #f3f3f6;
  border-radius: 7px;
  padding: 15px;
  margin-top: 15px;
  justify-content: flex-start;
  align-items: flex-start;
  color: #4030a5;
`;

export const ButtonContainer = styled.View`
  margin-vertical: 20px;
  align-items: flex-start;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-around;
  margin-left: -${defaultPaddingFontScale()}px;
  width: ${screenWidth}px;
  margin-bottom: 150px;
`;

export const CloseNPS = styled.View`
  margin-left: auto;
`;

export const MarkContainer = styled.View`
  ${commonCss}
  margin-top: 15px;
  flex-direction: row;
  width: 100%;
`;

export const MarkStyled = styled.View`
  height: 40px;
  ${(props) => props.withMargin && 'margin-right: 3px;'}
  border: 1px solid #b8b8b8;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  ${(props) => props.selected && 'background-color: #4030a5;'}
`;

export const MarkText = styled(H2)`
  font-weight: bold;
  color: ${({ selected }) => (selected ? '#f9f9f9' : '#191919')};
`;

export const MarkButton = styled.TouchableOpacity`
  flex-basis: 20px;
  flex-grow: 1;
`;

export const MarkHint = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
`;

export const MarkHintText = styled.Text`
  color: #999999;
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
  margin-top: 15px;
`;
