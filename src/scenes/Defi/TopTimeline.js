import React from 'react';
import styled from 'styled-components';
import Lock from '../../components/Illustrations/Lock';
import StarButton from '../../components/Illustrations/StarButton';

export default ({ nbdays, validatedDays, unlockedDays, activeDay }) => {
  return (
    <Container>
      {[...Array(nbdays)].map((_, i) => {
        return <Day index={i} done={validatedDays > i} locked={unlockedDays < i} />;
      })}
    </Container>
  );
};

const Day = ({ locked, done, index }) => {
  const renderItem = () => {
    if (locked) {
      return <Lock color="#C4C4C4" size="20px" />;
    }
    if (done) {
      return <StarButton color="#4030a5" size="20px" />;
    }
    return <DayinProgress />;
  };
  const getTextColor = () => (locked ? '#C4C4C4' : '#4030a5');

  return (
    <DayContainer>
      {renderItem()}
      <DayNumber color={getTextColor()}>{index + 1}</DayNumber>
    </DayContainer>
  );
};

const Container = styled.View`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 45px;
`;
const DayinProgress = styled.View`
  height: 20px;
  width: 20px;
  border: 1px dotted #4030a5;
  border-radius: 5px;
`;
const DayContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DayNumber = styled.Text`
  margin-top: 4px;
  color: ${({ color }) => color || '#C4C4C4'};
`;
