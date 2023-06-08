import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import AnimatedTextStyled from './AnimatedTextStyled';

const PeriodSwitchToggle = ({ period, setPeriod }) => {
  const [componentWidth, setComponentWidth] = useState(0);
  const [animatedXValue] = useState(new Animated.Value(0));

  useEffect(() => {
    runAnimation(renderValue(period));
  }, [period]);

  const renderValue = () => {
    switch (period) {
      case 'monthly':
        return 2;
      case 'weekly':
        return 1;
      case 'daily':
      default:
        return 0;
    }
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
        <CellContainer borderRight />
        <CellContainer borderRight />
        <CellContainer />
      </Cells>
      <AnimatedCell
        style={{
          transform: [
            {
              translateX: animatedXValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, componentWidth / 3, (componentWidth / 3) * 2],
              }),
            },
          ],
        }}>
        <AnimatedCellInside />
      </AnimatedCell>
      <Cells>
        <CellContainerTouchable
          onPress={() => {
            setPeriod('daily');
          }}>
          <CellText
            style={{
              color: animatedXValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: ['#4030A5', '#767676', '#767676'],
              }),
            }}>
            Jour
          </CellText>
        </CellContainerTouchable>
        <CellContainerTouchable
          onPress={() => {
            setPeriod('weekly');
          }}>
          <CellText
            style={{
              color: animatedXValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: ['#767676', '#4030A5', '#767676'],
              }),
            }}>
            Semaine
          </CellText>
        </CellContainerTouchable>
        <CellContainerTouchable
          onPress={() => {
            setPeriod('monthly');
          }}>
          <CellText
            style={{
              color: animatedXValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: ['#767676', '#767676', '#4030A5'],
              }),
            }}>
            Mois
          </CellText>
        </CellContainerTouchable>
      </Cells>
    </Container>
  );
};

export default PeriodSwitchToggle;

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
  width: ${100 / 3}%;
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
  width: ${100 / 3}%;
  height: 70%;
  border: 0px solid #c4c4c4;
  ${({ borderRight }) => borderRight && 'border-right-width: 1px;'}
  align-items: center;
  justify-content: center;
`;

const CellContainerTouchable = styled.TouchableOpacity`
  width: ${100 / 3}%;
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
`;
