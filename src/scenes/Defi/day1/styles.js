import styled, { css } from 'styled-components';
import H1 from '../../../components/H1';

export const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

export const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

export const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const paddingHorizontal = 30;

export const TopContainer = styled.View`
  padding: 20px ${paddingHorizontal}px ${(props) => (props.shortPaddingBottom ? 30 : 100)}px;
`;

export const TopTitle = styled(H1)`
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;
