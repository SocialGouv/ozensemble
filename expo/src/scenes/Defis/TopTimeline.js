import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import Lock from '../../components/illustrations/Lock';
import StarButton from '../../components/illustrations/StarButton';
import { storage } from '../../services/storage';
import { defaultPaddingFontScale } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';

const TopTimeline = ({ nbdays, validatedDays, activeDay, hackAndUnlockDay, defiStorageKey }) => {
  return (
    <Container>
      {[...Array(nbdays)].map((_, dayIndex) => {
        return (
          <DayIcon
            key={dayIndex}
            index={dayIndex}
            done={validatedDays > dayIndex}
            locked={dayIndex !== 0 && activeDay < dayIndex}
            unLock={hackAndUnlockDay}
            defiStorageKey={defiStorageKey}
          />
        );
      })}
    </Container>
  );
};

const DayIcon = ({ locked, done, index, unLock, defiStorageKey }) => {
  const [pressed, setPressed] = useState(0);

  const renderItem = () => {
    if (locked) {
      return <Lock color="#C4C4C4" size="20px" />;
    }
    if (done) {
      return <StarButton color="#4030a5" size="20px" />;
    }
    return <StarButton color="#de285e" size="20px" />;
  };

  const getTextColor = () => {
    if (locked) return '#5150A260';
    if (done) return '#4030a5';
    return '#de285e';
  };

  const unLockLevel = async () => {
    setPressed(0);
    await unLock(index);
    storage.set(`${defiStorageKey}_LastUpdate`, 'UNLOCK');
  };

  useEffect(() => {
    if (pressed >= (__DEV__ ? 2 : 8)) unLockLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  padding-vertical: 20px;
  padding-horizontal: ${defaultPaddingFontScale()}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 45px;
`;
const DayContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DayNumber = styled(TextStyled)`
  margin-top: 4px;
  color: ${({ color }) => color || '#C4C4C4'};
`;
/*
const NewDayStar = styled(StarButton)`
  border-color: #de285e;
  border-width: 2px;
  border-radius: 10px;
`;
 */
