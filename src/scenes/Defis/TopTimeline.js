import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import Lock from '../../components/Illustrations/Lock';
import StarButton from '../../components/Illustrations/StarButton';

const TopTimeline = ({ nbdays, validatedDays, activeDay, hackAndUnlockDay }) => {
  return (
    <Container>
      {[...Array(nbdays)].map((_, dayIndex) => {
        return (
          <Day
            key={dayIndex}
            index={dayIndex}
            done={validatedDays > dayIndex}
            locked={dayIndex !== 0 && activeDay < dayIndex}
            unLock={hackAndUnlockDay}
          />
        );
      })}
    </Container>
  );
};

const Day = ({ locked, done, index, unLock }) => {
  const [pressed, setPressed] = useState(0);

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

  const unLockLevel = async () => {
    setPressed(0);
    await unLock(index);
    await AsyncStorage.setItem('DEFI_7_JOURS_LAST_UPDATE', 'UNLOCK');
  };

  useEffect(() => {
    if (pressed > 5) unLockLevel();
  }, [pressed]);

  return (
    <TouchableWithoutFeedback onPress={() => setPressed((p) => p + 1)}>
      <DayContainer>
        {renderItem()}
        <DayNumber color={getTextColor()}>{index + 1}</DayNumber>
      </DayContainer>
    </TouchableWithoutFeedback>
  );
};

export default TopTimeline;

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
