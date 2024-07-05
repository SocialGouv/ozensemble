import styled from 'styled-components';
import { Animated, Platform } from 'react-native';

const AnimatedTextStyled = styled(Animated.Text)`
  ${Platform.OS === 'android' && 'font-family: Raleway;'}
  color: ${({ color }) => color || '#191919'};
  ${(props) => props.semibold && 'font-weight: 600;'}
  ${(props) => props.bold && 'font-weight: bold;'}
  ${(props) => props.italic && 'font-style: italic;'}
  ${(props) => props.center && 'text-align: center;'}
  textDecoration: ${({ underline }) => underline && 'underline'};
  ${({ size }) => size && `font-size: ${size}px;`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}px;`}

  text-decoration-color: ${({ color }) => color || '#191919'};
`;

export default AnimatedTextStyled;
