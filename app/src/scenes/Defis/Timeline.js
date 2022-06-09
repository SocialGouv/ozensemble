import React from 'react';
import styled from 'styled-components';
import ArrowDown from '../../components/ArrowDown';
import Lock from '../../components/illustrations/Lock';
import StarButton from '../../components/illustrations/StarButton';

const Timeline = ({ first, last, done = false, locked = true, active = false }) => {
  const renderIcon = () => {
    if (done) {
      return <StarButton color="#4030a5" size="20px" />;
    }
    if (active) {
      return <Dot active={active} />;
    }
    if (locked) {
      return <Lock color="#C4C4C4" size="20px" />;
    }
    return <Dot />;
  };

  return (
    <TimelineContainer>
      <Line first={first} />
      {renderIcon()}
      <Line grow shrink />
      {last && <ArrowDownStyled size={10} color="#c4c4c4" />}
    </TimelineContainer>
  );
};

const TimelineContainer = styled.View`
  width: 10px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

const Line = styled.View`
  width: 2px;
  margin-left: -0.5px;
  background: ${({ first }) => (first ? 'transparent' : '#C4C4C4')};
  flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
  flex-grow: ${({ grow }) => (grow ? 1 : 0)};
  height: 20px;
`;

const dotSize = 10;

export const Dot = styled.View`
  width: ${dotSize}px;
  height: ${dotSize}px;
  margin-vertical: 3px;
  border-radius: ${dotSize}px;
  background: ${({ active }) => (active ? '#de285e' : '#C4C4C4')};
`;

const ArrowDownStyled = styled(ArrowDown)`
  margin-top: 1px;
`;

export default Timeline;
