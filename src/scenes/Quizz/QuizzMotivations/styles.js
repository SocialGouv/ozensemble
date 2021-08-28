import styled, { css } from 'styled-components';
import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';

export const commonCss = css`
  width: 100%;
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

export const TopTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const TopTitle = styled(H1)`
  padding: 0 10px;
`;

export const SectionTitle = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;
