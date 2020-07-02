import styled, { css } from 'styled-components';
import H1 from '../components/H1';

export const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
`;

export const MenuItemStyled = styled.View`
  height: 70px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.title}22;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 15px;
`;

export const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

export const Arrow = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-weight: bold;
`;

const paddingHorizontal = 30;
export const TopContainer = styled.View`
  padding: 20px ${paddingHorizontal}px ${props => (props.shortPaddingBottom ? 30 : 100)}px;
`;

export const TopTitle = styled(H1)`
  ${commonCss}
  padding-horizontal: 30px;
  padding-top: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;
