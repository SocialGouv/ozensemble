import styled, { css } from 'styled-components';
import H3 from '../../../../components/H3';
import H2 from '../../../../components/H2';
import H1 from '../../../../components/H1';
import UnderlinedButton from '../../../../components/UnderlinedButton';
import ResultsIllustration from '../../../../components/Illustrations/ResultsIllustration';
import { screenWidth } from '../../../../styles/theme';

export const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
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

export const TopSubTitle = styled(H3)`
  ${commonCss}
`;

export const TopButtonContainer = styled.View`
  margin: 20px 0 30px 0;
  align-items: flex-start;
  flex-grow: 0;
  width: auto;
`;

export const BottomContainer = styled.View`
  padding: 20px;
  ${(props) => props.longPaddingBottom && 'padding-bottom: 100px;'}
  background-color: #efefef;
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
