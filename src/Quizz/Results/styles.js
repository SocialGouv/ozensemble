import styled, { css } from 'styled-components';
import H2 from '../../components/H2';
import H1 from '../../components/H1';
import UnderlinedButton from '../../components/UnderlinedButton';
import ResultsIllustration from '../../components/Illustrations/ResultsIllustration';

export const EmptyView = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBg};
  position: absolute;
  height: 100%;
  width: 100%;
  ${({ debug }) => debug && 'border: 3px solid #000;'}
`;

export const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${({ theme }) => theme.dimensions.screen.width}px;
  min-width: ${({ theme }) => theme.dimensions.screen.width}px;
`;

export const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

export const TopContainer = styled.View`
  padding: 20px 25px 40px;
`;

export const ResultTitle = styled(H2)`
  ${commonCss}
`;

export const TopTitle = styled(H1)`
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const TopSubTitle = styled(H2)`
  ${commonCss}
`;

export const TopButtonContainer = styled.View`
  margin-vertical: 50px;
  align-items: flex-start;
  flex-grow: 0;
  width: auto;
`;

export const BottomContainer = styled.View`
  padding: 20px;
  ${props => props.longPaddingBottom && 'padding-bottom: 100px;'}
  background-color: ${({ theme }) => theme.colors.greyBg};
  flex-direction: row;
  margin-top: auto;
`;

export const BottomSubContainer = styled.View`
  padding: ${({ shrink }) => (shrink ? 15 : 0)}px;
  flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
  align-items: flex-start;
`;

export const BottomTitle = styled(H2)`
  ${commonCss}
  margin-bottom: 20px;
`;

export const BottomSubTitle = styled(H2)`
  ${commonCss}
  font-weight: 500;
  margin-bottom: 20px;
`;

export const ResultsIllustrationStyled = styled(ResultsIllustration)`
  height: 40px;
  margin-top: 8px;
`;

export const UnderlinedButtonStyled = styled(UnderlinedButton)`
  align-items: flex-start;
`;
