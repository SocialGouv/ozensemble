import styled from 'styled-components';
import { Platform } from 'react-native';

const TextInputStyled = styled.TextInput`
  ${Platform.OS === 'android' && 'font-family: Raleway;'}
`;

export default TextInputStyled;
