import React from 'react';
import styled, { css } from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { setModalTimestamp } from '../ConsoFollowUp/consoDuck';
import matomo from '../../services/matomo';

const iconSize = 30;

const AddDrinkCTAButton = ({ onCTAPress, setModalTimestamp }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      setModalTimestamp(Date.now());
      onCTAPress();
      matomo.logConsoOpenAddScreen();
    }}>
    <CTAContainer>
      <CTASubContainer>
        <PlusHorizontal />
        <PlusVertical />
      </CTASubContainer>
    </CTAContainer>
  </TouchableWithoutFeedback>
);

const roundCss = (size) => css`
  height: ${size}px;
  width: ${size}px;
  border-radius: ${size}px;
`;

const CTASize = 2 * iconSize;
const plusThickness = 4;
const CTAInner = CTASize - 2 * plusThickness;
const plusSize = CTAInner / 2;
const CTAContainer = styled.View`
  position: absolute;
  bottom: ${14 * (plusSize / 4 - plusThickness / 2)}px;
  right: 6px;
  ${roundCss(CTASize)}
  border: 1px solid #4030a533;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const CTASubContainer = styled.View`
  ${roundCss(CTAInner)}
  background-color: #de285e;
  justify-content: center;
  align-items: center;
`;

const PlusHorizontal = styled.View`
  width: ${plusSize}px;
  height: ${plusThickness}px;
  border-radius: ${plusThickness}px;
  position: absolute;
  top: ${CTAInner / 2 - plusThickness / 2}px;
  left: ${(CTAInner - plusSize) / 2}px;
  background: white;
`;

const PlusVertical = styled.View`
  width: ${plusThickness}px;
  height: ${plusSize}px;
  border-radius: ${plusThickness}px;
  position: absolute;
  left: ${CTAInner / 2 - plusThickness / 2}px;
  top: ${(CTAInner - plusSize) / 2}px;
  background: white;
`;

const dispatchToProps = {
  setModalTimestamp,
};

export default connect(null, dispatchToProps)(AddDrinkCTAButton);
