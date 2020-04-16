import React from 'react';
import styled, { withTheme } from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import CONSTANTS from '../reference/constants';
import QuizzIcon from '../components/Illustrations/QuizzIcon';
import GuidanceIcon from '../components/Illustrations/GuidanceIcon';
import FollowUpIcon from '../components/Illustrations/FollowUpIcon';
import ReminderIcon from '../components/Illustrations/ReminderIcon';
import matomo from '../matomo';

const iconSize = 25;
const computeColor = ({ theme, selected }) =>
  selected ? theme.colors.headerBackground : theme.colors.questionBgSelected;

const Menu = props => {
  return (
    <MenuContainer forceInset={{ bottom: 'always' }}>
      <QuizzButton {...props} />
      <GuidanceButton {...props} />
      <FollowUpButton {...props} />
      <ReminderButton {...props} />
    </MenuContainer>
  );
};

const Button = withTheme(({ setView, view, selfView, theme, Icon, caption }) => {
  const selected = view === selfView;
  return (
    <TouchableWithoutFeedback
      onPress={async () => {
        setView(selfView);
        await matomo.logOpenPage(selfView, CONSTANTS.FROM_MENU);
      }}>
      <ButtonContainer>
        <Icon size={iconSize} color={computeColor({ selected, theme })} selected={selected} />
        <ButtonText allowFontScaling={false} selected={selected}>
          {caption}
        </ButtonText>
      </ButtonContainer>
    </TouchableWithoutFeedback>
  );
});

const QuizzButton = props => <Button selfView={CONSTANTS.VIEW_QUIZZ} Icon={QuizzIcon} caption="Quizz" {...props} />;
const GuidanceButton = props => (
  <Button selfView={CONSTANTS.VIEW_CONTACT} Icon={GuidanceIcon} caption="En parler" {...props} />
);
const FollowUpButton = props => (
  <Button selfView={CONSTANTS.VIEW_CONSO} Icon={FollowUpIcon} caption="Suivi" {...props} />
);
const ReminderButton = props => (
  <Button selfView={CONSTANTS.VIEW_REMINDER} Icon={ReminderIcon} caption="Rappel" {...props} />
);

const MenuContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;

  flex-direction: row;
  padding-vertical: 15px;
  padding-horizontal: ${({ theme }) => theme.dimensions.screen.width * 0.05}px;
  justify-content: space-between;
  height: 80px;

  background: white;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  flex-basis: 75px;
`;

const ButtonText = styled.Text`
  margin-top: 4px;
  font-family: Raleway-SemiBold;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.title};
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  flex-wrap: nowrap;
`;

export default Menu;
