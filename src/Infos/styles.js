import styled, { css } from 'styled-components';
import H1 from '../components/H1';

export const ScreenBgStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: '#f9f9f9',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: '100%',
    minHeight: '100%',
  },
})``;

export const MenuItemStyled = styled.View`
  height: 70px;
  border-bottom-width: 1px;
  border-bottom-color: #4030a522;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 15px;
  ${(props) => props.notVisible && 'opacity: 0;'}
`;

export const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

export const Arrow = styled.Text`
  color: #4030a5;
  font-weight: bold;
`;

const paddingHorizontal = 30;
export const TopContainer = styled.View`
  padding: 20px ${paddingHorizontal}px ${(props) => (props.shortPaddingBottom ? 30 : 100)}px;
`;

export const TopTitle = styled(H1)`
  ${commonCss}
  padding-horizontal: 30px;
  padding-top: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;
