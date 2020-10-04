import React from 'react';
import styled from 'styled-components';
import ArrowDown from '../components/ArrowDown';

const Timeline = ({ first, last }) => (
  <TimelineContainer>
    <Line first={first} />
    <Dot />
    <Line grow shrink />
    {last && <ArrowDownStyled size={10} />}
  </TimelineContainer>
);

const TimelineContainer = styled.View`
  width: 10px;
  /* height: 100%; */
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

const Line = styled.View`
  width: 2px;
  margin-left: -0.5px;
  background: ${({ first }) => (first ? 'transparent' : '#39cec0')};
  flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
  flex-grow: ${({ grow }) => (grow ? 1 : 0)};
  height: 20px;
`;

const dotSize = 10;

const Dot = styled.View`
  width: ${dotSize}px;
  height: ${dotSize}px;
  margin-vertical: 3px;
  border-radius: ${dotSize}px;
  background: #39cec0;
`;

const ArrowDownStyled = styled(ArrowDown)`
  margin-top: 1px;
`;

export default Timeline;
