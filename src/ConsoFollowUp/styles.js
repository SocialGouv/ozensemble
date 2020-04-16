import styled, { css } from 'styled-components';
import UnderlinedButton from '../components/UnderlinedButton';
import ButtonPrimary from '../components/ButtonPrimary';
import H1 from '../components/H1';
import H2 from '../components/H2';
import H3 from '../components/H3';

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

/*
  Top part
*/

export const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

export const TopContainer = styled.View`
  padding: 20px 20px 40px;
`;

export const Title = styled(H1)`
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const SubTitle = styled(H2)`
  ${commonCss}
  font-weight: 500;
  ${props => props.last && 'margin-bottom: 40px;'}
`;

/*
  Feed
*/
export const FeedContainer = styled.View`
  background-color: ${({ theme, hideFeed }) => (hideFeed ? theme.colors.whiteBg : theme.colors.greyBg)};
  padding: 20px;
  padding-right: 0px;
  padding-bottom: 100px;
`;

export const FeedDay = styled.View`
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 0;
`;

export const FeedDayContent = styled.View`
  flex-grow: 1;
  padding-horizontal: 15px;
  padding-vertical: 10px;
`;

export const FeedBottomButton = styled(UnderlinedButton)`
  align-items: center;
  margin-bottom: 15px;
`;

export const FeedAddConsoTodayContainer = styled.View`
  margin-top: -45px;
  margin-bottom: -20px;
  align-items: center;
`;

export const FeedAddConsoTodayButton = styled(ButtonPrimary)`
  flex-grow: 0;
`;

export const FeedButtonStyled = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.colors.whiteBg};
  border-width: 1px;
  border-color: ${({ theme, borderColor }) => borderColor || theme.colors.questionBorderUnselected};
  border-radius: 7px;
  padding-left: 5px;
  justify-content: center;
  margin-bottom: 10px;
  opacity: ${({ showAsSelected }) => (showAsSelected ? 1 : 0.3)};
`;

/*
Diagram styles
*/

export const Legend = styled.Text`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.buttonPrimary};
  margin-top: -35px;
  margin-bottom: 35px;
`;

export const Help = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.colors.headerBackground};
  background-color: white;
  margin-left: auto;
  justify-content: center;
  align-items: center;
`;
export const HelpText = styled.Text`
  color: ${({ theme }) => theme.colors.headerBackground};
  font-weight: bold;
  font-size: 20px;
`;
export const CloseHelpContainer = styled.View`
  margin-left: auto;
`;

export const BarsContainer = styled.View`
  max-width: 100%;
  flex-direction: row;
  margin-bottom: 40px;
  height: ${({ height }) => height}px;
  align-items: flex-end;
`;

export const Bar = styled.View`
  border-color: ${({ theme }) => theme.colors.title};
  border-style: ${({ empty }) => (empty ? 'dashed' : 'solid')};
  border-width: ${({ empty }) => (empty ? 1 : 0)}px;
  border-radius: ${({ theme }) => theme.dimensions.screen.height * 0.005}px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 30px;
  margin-horizontal: 3px;
  overflow: hidden;
`;

const topRadius = css`
  border-top-left-radius: ${({ theme }) => theme.dimensions.screen.height * 0.005}px;
  border-top-right-radius: ${({ theme }) => theme.dimensions.screen.height * 0.005}px;
`;

export const UpperBar = styled.View`
  position: absolute;
  bottom: ${({ bottom }) => bottom}px;
  height: ${({ height }) => height}px;
  width: 100%;
  ${topRadius}
  background: ${({ theme }) => theme.colors.buttonPrimary};
`;

export const LowerBar = styled.View`
  position: absolute;
  bottom: 0px;
  height: ${({ height }) => height}px;
  width: 100%;
  background: ${({ theme }) => theme.colors.title};
  ${({ withTopRadius }) => withTopRadius && topRadius}
`;

export const doseTextHeight = 25;
export const Dose = styled(H3)`
  height: ${doseTextHeight}px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme, overLine }) => (overLine ? theme.colors.buttonPrimary : theme.colors.title)};
`;

export const Line = styled.View`
  position: absolute;
  bottom: ${({ bottom }) => bottom - 1}px;
  width: 100%;
  height: 0px;
  border-style: dashed;
  border-width: 1px;
  border-radius: 1px;
  border-color: ${({ theme }) => theme.colors.headerBackground};
`;
