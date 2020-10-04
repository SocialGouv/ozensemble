import React from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import CONSTANTS from '../reference/constants';
import QuizzIcon from '../components/Illustrations/QuizzIcon';
import GuidanceIcon from '../components/Illustrations/GuidanceIcon';
import FollowUpIcon from '../components/Illustrations/FollowUpIcon';
import ReminderIcon from '../components/Illustrations/ReminderIcon';
import matomo from '../services/matomo';
import { mediaHeight } from '../styles/mediaQueries';
import TestsIcon from '../components/Illustrations/Tests';
import InfosIcon from '../components/Illustrations/Infos';
import { menuHeight } from '../styles/theme';

const iconSize = 30;

const Menu = ({ view, setView }) => (
  <MenuContainer forceInset={{ bottom: 'always' }}>
    <GuidanceButton view={view} setView={setView} />
    <FollowUpButton view={view} setView={setView} moveLeft />
    <TestsButton view={view} setView={setView} moveRight />
    <InfosButton view={view} setView={setView} />
  </MenuContainer>
);

const Button = ({ setView, view, selfView, Icon, caption, moveLeft, moveRight }) => {
  const selected = view === selfView;
  return (
    <TouchableWithoutFeedback
      onPress={async () => {
        setView(selfView);
        await matomo.logOpenPage(selfView, CONSTANTS.FROM_MENU);
      }}>
      <ButtonContainer moveLeft={moveLeft} moveRight={moveRight}>
        <Icon size={iconSize} color={selected ? '#39cec0' : '#5352a3'} selected={selected} />
        <ButtonText allowFontScaling={false} selected={selected}>
          {caption}
        </ButtonText>
      </ButtonContainer>
    </TouchableWithoutFeedback>
  );
};

const QuizzButton = (props) => (
  <Button selfView={CONSTANTS.VIEW_QUIZZ} Icon={QuizzIcon} caption="Quizz" {...props} />
);
const TestsButton = (props) => (
  <Button selfView={CONSTANTS.VIEW_QUIZZ} Icon={TestsIcon} caption="Tests" {...props} />
);
const GuidanceButton = (props) => (
  <Button selfView={CONSTANTS.VIEW_CONTACT} Icon={GuidanceIcon} caption="En parler" {...props} />
);
const FollowUpButton = (props) => (
  <Button selfView={CONSTANTS.VIEW_CONSO} Icon={FollowUpIcon} caption="Suivi" {...props} />
);
const ReminderButton = (props) => (
  <Button selfView={CONSTANTS.VIEW_REMINDER} Icon={ReminderIcon} caption="Rappel" {...props} />
);
const InfosButton = (props) => (
  <Button selfView={CONSTANTS.VIEW_INFOS} Icon={InfosIcon} caption="Infos" {...props} />
);

const MenuContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;

  flex-direction: row;
  padding-vertical: 15px;
  justify-content: space-around;
  height: ${menuHeight}px;

  border-top-width: 1px;
  border-top-color: #4030a533;

  background-color: white;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  flex-basis: 75px;
  ${(props) => props.moveLeft && 'margin-right: 15px;'}
  ${(props) => props.moveRight && 'margin-left: 15px;'}
`;

const ButtonText = styled.Text`
  margin-top: 4px;
  font-family: Raleway-SemiBold;
  font-size: 15px;
  ${mediaHeight.small`font-size: 13px;`}
  color: #4030a5;
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  flex-wrap: nowrap;
`;

export default Menu;
