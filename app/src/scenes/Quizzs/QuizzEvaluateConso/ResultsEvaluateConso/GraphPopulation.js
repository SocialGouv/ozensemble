import React from 'react';
import styled from 'styled-components';

const GraphPopulation = ({ nbBars = 15, maxHeight = 120, minHeight = 10, activeBarIndex }) => {
  const getHeight = (index) => {
    const middleBarIndex = Math.floor(nbBars / 2);
    const delta = Math.abs(index - middleBarIndex);
    return maxHeight - (delta * (maxHeight - minHeight)) / middleBarIndex;
  };
  return (
    <Container>
      {[...Array(nbBars)].map((_, i) => {
        return <Bar key={i} height={getHeight(i)} minHeight={minHeight} active={activeBarIndex === i} />;
      })}
    </Container>
  );
};

export default GraphPopulation;

const Container = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const Bar = styled.View`
  background-color: ${({ active }) => (active ? '#de285e' : '#4030a5')};
  border-radius: 4px;
  height: ${({ height, minHeight }) => height || minHeight}px;
  flex: 1;
  margin: 0 3px;
`;
