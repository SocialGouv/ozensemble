import styled, { css } from 'styled-components';
import H2 from '../components/H2';
import UnderlinedButton from '../components/UnderlinedButton';
import ButtonPrimary from '../components/ButtonPrimary';
/*
QUIZZ
*/

export const QuizzAndResultContainer = styled.View`
  flex-direction: row;
  margin-left: ${({ showQuizz, theme }) => (showQuizz ? 0 : -theme.dimensions.screen.width)}px;
`;

export const QuizzContainer = styled.View`
  flex-shrink: 0;
  flex-grow: 1;
  width: ${({ theme }) => theme.dimensions.screen.width}px;
  padding-bottom: 80px;
`;

export const QuestionsContainer = styled.View`
  flex-shrink: 1;
  /* flex-grow: 1; */ /* DONT PUT "flex-grow: 1" or the ScrollView will disappear #fuckingbug */
  flex-basis: 100%;
  flex-direction: row;
  margin-left: ${({ questionIndex, theme }) => -questionIndex * theme.dimensions.screen.width}px;
  overflow: hidden;
`;

export const QuizzBackButton = styled(UnderlinedButton)`
  margin-top: auto;
  margin-right: auto;
  margin-left: 10px;
`;

export const AnswersContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex-shrink: 1;
  flex-grow: 0;
  padding-right: 10px;
  border: 1px solid transparent;
`;

export const AnswerButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${({ selected, theme: { colors } }) =>
    selected ? colors.questionBgSelected : colors.questionBgUnselected};
  border-color: ${({ selected, theme: { colors } }) =>
    selected ? colors.questionBorderSelected : colors.questionBorderUnselected};
  border-width: 1px;
  border-radius: 7px;
  padding-left: 15px;
  justify-content: center;
  margin-bottom: ${({ last }) => (last ? 50 : 10)}px;
`;

export const AnswerContent = styled(H2)`
  font-weight: 500;
  color: ${({ selected, theme: { colors } }) => (selected ? colors.whiteBg : colors.basicText)};
`;

/*
QUESTION
*/

export const ScreenBgStyled = styled.View`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  padding-horizontal: ${({ theme }) => theme.dimensions.quizzPadding}px;
  padding-top: ${({ theme }) => theme.dimensions.quizzPadding / 2}px;
  flex-shrink: 0;
  flex-grow: 0;
  width: ${({ theme }) => theme.dimensions.screen.width}px;
  max-width: ${({ theme }) => theme.dimensions.screen.width}px;
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;

const commonCss = css`
  margin-bottom: 15px;
  flex-shrink: 0;
`;

export const QuestionNumber = styled(H2)`
  ${commonCss}
`;

export const QuestionTitle = styled(H2)`
  color: ${({ theme }) => theme.colors.title};
  ${commonCss}
  margin-bottom: ${({ theme }) => Math.min(30, theme.dimensions.screen.width * 0.05)}px;
`;

export const SubTitle = styled(H2)`
  font-weight: normal;
  margin-bottom: 50px;
  flex-shrink: 0;
`;

export const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-bottom: 80px;
  margin-right: auto;
`;
