import styled from 'styled-components';
import { defaultPaddingFontScale } from '../../styles/theme';

export const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#f9f9f9')};
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  ${({ marginOffset }) => !!marginOffset && `margin-left: -${marginOffset}px;`}
  ${({ marginOffset }) => !!marginOffset && `margin-right: -${marginOffset}px;`}
  ${({ defaultPadding }) =>
    !!defaultPadding &&
    `padding-horizontal: ${defaultPaddingFontScale()}px;padding-top: ${defaultPaddingFontScale() / 2}px;`}
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;
