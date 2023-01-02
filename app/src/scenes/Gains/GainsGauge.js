import React from 'react';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';

const GainsGauge = ({ title, value, goal }) => (
  <>
    <TextStyled>{title}</TextStyled>
    <Gauge>
      <GaugeInside value={value} goal={goal}>
        <ValueInside>{value}</ValueInside>
      </GaugeInside>
    </Gauge>
    <MaxGoal>
      <TextStyled small>objectif max : {goal}</TextStyled>
    </MaxGoal>
  </>
);

export default GainsGauge;

const MaxGoal = styled.View`
  padding-top: 4px;
  align-items: flex-end;
`;

const ValueInside = styled(TextStyled)`
  overflow: visible;
  font-size: 18px;
  padding-horizontal: 10px;
  text-align: right;
`;

const GaugeInside = styled.View`
  width: ${(props) => (props.value / props.goal > 1 ? 100 : (props.value / props.goal) * 100)}%}};
  height: 100%;
  border-radius: 5px;
  background-color: ${(props) => (props.value / props.goal > 1 ? '#DE285E' : '#39cec1')};
  justify-content: center;
`;

const Gauge = styled.View`
  width: 100%;
  height: 30px;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;
