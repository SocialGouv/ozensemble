import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import CONSTANTS from '../reference/constants';
import QuizzIcon from '../components/Illustrations/QuizzIcon';
import GuidanceIcon from '../components/Illustrations/GuidanceIcon';
import FollowUpIcon from '../components/Illustrations/FollowUpIcon';
import ReminderIcon from '../components/Illustrations/ReminderIcon';
import matomo from '../matomo';
import { mediaHeight } from '../styles/mediaQueries';
import TestsIcon from '../components/Illustrations/Tests';
import InfosIcon from '../components/Illustrations/Infos';

const iconSize = 30;
const computeColor = ({ theme, selected }) =>
  selected ? theme.colors.headerBackground : theme.colors.questionBgSelected;

const Menu = ({ view, setView, onCTAPress }) => (
  <>
    <MenuContainer forceInset={{ bottom: 'always' }}>
      <GuidanceButton view={view} setView={setView} />
      <FollowUpButton view={view} setView={setView} moveLeft />
      <TestsButton view={view} setView={setView} moveRight />
      <InfosButton view={view} setView={setView} />
    </MenuContainer>
    <CTAButton onCTAPress={onCTAPress} />
  </>
);

const Button = withTheme(
  ({ setView, view, selfView, theme, Icon, caption, moveLeft, moveRight }) => {
    const selected = view === selfView;
    return (
      <TouchableWithoutFeedback
        onPress={async () => {
          setView(selfView);
          await matomo.logOpenPage(selfView, CONSTANTS.FROM_MENU);
        }}>
        <ButtonContainer moveLeft={moveLeft} moveRight={moveRight}>
          <Icon size={iconSize} color={computeColor({ selected, theme })} selected={selected} />
          <ButtonText allowFontScaling={false} selected={selected}>
            {caption}
          </ButtonText>
        </ButtonContainer>
      </TouchableWithoutFeedback>
    );
  }
);

const QuizzButton = props => (
  <Button selfView={CONSTANTS.VIEW_QUIZZ} Icon={QuizzIcon} caption="Quizz" {...props} />
);
const TestsButton = props => (
  <Button selfView={CONSTANTS.VIEW_QUIZZ} Icon={TestsIcon} caption="Tests" {...props} />
);
const GuidanceButton = props => (
  <Button selfView={CONSTANTS.VIEW_CONTACT} Icon={GuidanceIcon} caption="En parler" {...props} />
);
const FollowUpButton = props => (
  <Button selfView={CONSTANTS.VIEW_CONSO} Icon={FollowUpIcon} caption="Suivi" {...props} />
);
const ReminderButton = props => (
  <Button selfView={CONSTANTS.VIEW_REMINDER} Icon={ReminderIcon} caption="Rappel" {...props} />
);
const InfosButton = props => (
  <Button selfView={CONSTANTS.VIEW_INFOS} Icon={InfosIcon} caption="Infos" {...props} />
);

const menuHeight = 80;
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
  border-top-color: ${({ theme }) => theme.colors.title}33;

  background-color: white;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  flex-basis: 75px;
  ${props => props.moveLeft && 'margin-right: 15px;'}
  ${props => props.moveRight && 'margin-left: 15px;'}
`;

const ButtonText = styled.Text`
  margin-top: 4px;
  font-family: Raleway-SemiBold;
  font-size: 15px;
  ${mediaHeight.small`font-size: 13px;`}
  color: ${({ theme }) => theme.colors.title};
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  flex-wrap: nowrap;
`;

const CTAButton = ({ onCTAPress }) => (
  <TouchableWithoutFeedback onPress={onCTAPress}>
    <CTAContainer>
      <CTASubContainer>
        <PlusHorizontal />
        <PlusVertical />
      </CTASubContainer>
    </CTAContainer>
  </TouchableWithoutFeedback>
);

const roundCss = size => css`
  height: ${size}px;
  width: ${size}px;
  border-radius: ${size}px;
`;

const CTASize = 2 * iconSize;
const CTAContainer = styled.View`
  position: absolute;
  bottom: ${menuHeight - CTASize / 2}px;
  left: ${({ theme }) => theme.dimensions.screen.width / 2 - CTASize / 2}px;
  ${roundCss(CTASize)}
  border: 1px solid ${({ theme }) => theme.colors.title}33;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const plusThickness = 4;
const CTAInner = CTASize - 2 * plusThickness;
const CTASubContainer = styled.View`
  ${roundCss(CTAInner)}
  background-color: ${({ theme }) => theme.colors.buttonPrimary};
  justify-content: center;
  align-items: center;
`;

const plusSize = CTAInner / 2;
const PlusHorizontal = styled.View`
  width: ${plusSize}px;
  height: ${plusThickness}px;
  border-radius: ${plusThickness}px;
  position: absolute;
  top: ${CTAInner / 2 - plusThickness / 2}px;
  left: ${(CTAInner - plusSize) / 2}px;
  background: white;
`;

const PlusVertical = styled.View`
  width: ${plusThickness}px;
  height: ${plusSize}px;
  border-radius: ${plusThickness}px;
  position: absolute;
  left: ${CTAInner / 2 - plusThickness / 2}px;
  top: ${(CTAInner - plusSize) / 2}px;
  background: white;
`;

export default Menu;
