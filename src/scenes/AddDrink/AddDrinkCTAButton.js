import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { modalTimestampState } from '../../recoil/consos';
import matomo from '../../services/matomo';
import { screenHeight, screenWidth } from '../../styles/theme';

const iconSize = 30;

export const showCTAButtonState = atom({
  key: 'showCTAButtonState',
  default: true,
});

const AddDrinkCTAButton = ({ onCTAPress }) => {
  const setModalTimestamp = useSetRecoilState(modalTimestampState);
  const showCTAButton = useRecoilValue(showCTAButtonState);

  if (!showCTAButton) return null;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setModalTimestamp(Date.now());
        onCTAPress();
        matomo.logConsoOpenAddScreen('CTA');
      }}>
      <CTAContainer>
        <CTASubContainer>
          <PlusHorizontal />
          <PlusVertical />
        </CTASubContainer>
      </CTAContainer>
    </TouchableWithoutFeedback>
  );
};

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
  top: ${screenHeight * 0.8}px;
  left: ${screenWidth * 0.8}px;
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

export default AddDrinkCTAButton;
