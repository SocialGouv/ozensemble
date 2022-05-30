import styled from 'styled-components';
import { Platform } from 'react-native';
import H2 from '../../components/H2';
import { buttonHeight, defaultPaddingFontScale } from '../../styles/theme';

export const Container = styled.View`
  background-color: #f9f9f9;
  flex: 1;
  padding-top: 45px;
`;

export const ModalContent = styled.ScrollView`
  width: 100%;
  background-color: #f9f9f9;
`;

export const Title = styled(H2)`
  font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};
  color: #4030a5;
  margin: 50px ${defaultPaddingFontScale()}px 15px;
`;

export const DateAndTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const buttonsPadding = 10;

export const ButtonsContainerSafe = styled.SafeAreaView`
  position: absolute;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  border-top-color: #eee;
  border-top-width: 1px;
`;

export const CameraButtonsContainerSafe = styled.SafeAreaView`
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: black;
`;

export const CameraButton = styled.View`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => (props.flexStart ? 'flex-start' : 'space-around')};
  margin: 0;
  width: 100%;
  padding: ${buttonsPadding}px;
  align-items: center;
`;

export const BarCodeHint = styled.Text`
  position: absolute;
  top: -25px;
  height: 25px;
  line-height: 25px;
  color: black;
  text-align: center;
  text-align-vertical: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
  background-color: #f9f9f9;
`;

export const MarginBottom = styled.View`
  height: ${({ small }) => buttonHeight * (small ? 0 : 2) + 2 * buttonsPadding}px;
  flex-shrink: 0;
`;

export const SmallMarginBottom = styled.View`
  height: ${3 * buttonsPadding}px;
`;
