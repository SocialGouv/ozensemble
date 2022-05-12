import React from 'react';
import styled from 'styled-components';
import TextStyled from '../../../../components/TextStyled';

const STEPS = [
  {
    label: 'Dépendance',
    scoreKey: 'RESULT_ARROW_ADDICTED',
  },
  {
    label: 'Usage nocif',
    scoreKey: 'RESULT_ARROW_HARMFUL_USAGE',
  },
  {
    label: 'Usage simple',
    scoreKey: 'RESULT_ARROW_SIMPLE_USAGE',
  },
  {
    label: 'Non usage',
    scoreKey: 'RESULT_ARROW_NO_USAGE',
  },
];

const inactiveColor = '#C4C4C4';
const activeColor = '#de285e';

const ArrowUsage = ({ steps = STEPS, height = 180, score }) => {
  const size = height / steps.length;
  return (
    <MainContainer>
      <ArrowContainer>
        {steps.map(({ scoreKey }, i) => {
          if (i === 0) {
            return (
              <ContainerItem key={i}>
                <ArrowHeadContainer>
                  <ArrowHead height={size} active={scoreKey === score} />
                  <ElementArrow key={i} width={size / 2} height={size * 0.3} active={scoreKey === score} />
                </ArrowHeadContainer>
              </ContainerItem>
            );
          } else {
            return (
              <ContainerItem key={i}>
                <ElementArrow height={size} width={size / 2} active={scoreKey === score} />
              </ContainerItem>
            );
          }
        })}
      </ArrowContainer>
      <LabelsContainer>
        {steps.map(({ label, scoreKey }, i) => {
          return (
            <LabelContainer key={i} active={scoreKey === score} size={size}>
              <TextStyled color={scoreKey === score ? activeColor : inactiveColor} key={i}>
                {label}
              </TextStyled>
            </LabelContainer>
          );
        })}
      </LabelsContainer>
    </MainContainer>
  );
};

const MainContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 8px 0;
`;
const LabelsContainer = styled.View`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
`;

const LabelContainer = styled.View`
  flex: 1;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ size }) => `${size / 10}px ${size / 10}px ${size / 10}px ${size}px`};
  border-color: ${({ active }) => (active ? activeColor : inactiveColor)};
  border-bottom-width: 1px;
  transform: ${({ size }) => `translate(-${size / 2}px)`};
`;

const ArrowContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const ArrowHeadContainer = styled.View`
  display: flex;
  align-items: center;
`;
const ContainerItem = styled.View`
  display: flex;
  flex-direction: row;
`;

const ElementArrow = styled.View`
  background-color: ${({ active }) => (active ? activeColor : inactiveColor)};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

const ArrowHead = styled.View`
  width: 0;
  height: 0;
  border-left-width: ${({ height }) => height / 2}px;
  border-left-color: transparent;

  border-right-width: ${({ height }) => height / 2}px;
  border-right-color: transparent;

  border-bottom-width: ${({ height }) => height * 0.66}px;
  border-bottom-color: ${({ active }) => (active ? activeColor : inactiveColor)};
`;

export default ArrowUsage;
