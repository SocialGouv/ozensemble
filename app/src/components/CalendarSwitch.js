import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import AnimatedTextStyled from './AnimatedTextStyled';

const CalendarSwitch = ({ window, setWindow }) => {
  const [componentWidth, setComponentWidth] = useState(0);
  const [animatedXValue] = useState(new Animated.Value(0));

  useEffect(() => {
    runAnimation(renderValue(window));
  }, [window]);

  const renderValue = () => {
    return Number(window === 'gains');
  };

  const runAnimation = (toValue) => {
    Animated.timing(animatedXValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container onLayout={(e) => setComponentWidth(e.nativeEvent.layout.width)}>
      <Cells>
        <CellContainer />
        <CellContainer />
      </Cells>
      <AnimatedCell
        style={{
          transform: [
            {
              translateX: animatedXValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, componentWidth / 2],
              }),
            },
          ],
        }}>
        <AnimatedCellInside />
      </AnimatedCell>
      <Cells>
        <CellContainerTouchable
          onPress={() => {
            setWindow('calendar');
          }}>
          <CellText
            style={{
              color: animatedXValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['#4030A5', '#767676'],
              }),
            }}>
            Vue Jours
          </CellText>
        </CellContainerTouchable>
        <CellContainerTouchable
          onPress={() => {
            setWindow('gains');
          }}>
          <CellText
            style={{
              color: animatedXValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['#767676', '#4030A5'],
              }),
            }}>
            Vue Gains
          </CellText>
        </CellContainerTouchable>
      </Cells>
    </Container>
  );
};

export default CalendarSwitch;

const AnimatedCellInside = styled.View`
  background-color: #fff;
  border-radius: 5px;
  width: 95%;
  height: 100%;
  shadow-offset: 0px 0px;
  shadow-color: #000000;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 4;
`;

const AnimatedCell = styled(Animated.View)`
  width: ${100 / 2}%;
  height: 80%;
  margin-vertical: 10%;
  align-items: center;
  justify-content: center;
`;

const Cells = styled.View`
  position: absolute;
  width: 100%;
  height: 30px;
  align-items: center;
  flex-direction: row;
`;

const CellContainer = styled.View`
  width: ${100 / 2}%;
  height: 70%;
  border: 0px solid #c4c4c4;
  align-items: center;
  justify-content: center;
`;

const CellContainerTouchable = styled.TouchableOpacity`
  width: ${100 / 2}%;
  height: 70%;
  align-items: center;
  justify-content: center;
`;

const CellText = styled(AnimatedTextStyled)`
  color: #767676;
`;

const Container = styled.View`
  width: 100%;
  height: 30px;
  background-color: #efefef;
  border-radius: 7px;
  align-items: center;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 25px;
`;
