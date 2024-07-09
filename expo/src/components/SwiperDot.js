import React from "react";
import styled, { css } from "styled-components/native";

const SwiperDot = ({ active }) => (
  <DotContainer active={active}>
    <Dot active={active} />
  </DotContainer>
);

const dotSize = 12;

const dotCss = css`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: ${dotSize}px;
  margin: 3px;
  overflow: hidden;
`;

const DotContainer = styled.View`
  ${dotCss}
  background-color: ${({ active }) => (!active ? "#C0C0C0" : "#CC3B5F")};
`;

const Dot = styled.View`
  ${dotCss}
  margin-top: ${dotSize * 0.12}px;
  margin-left: 0px;
  background-color: ${({ active }) => (!active ? "#C0C0C0" : "#CC3B5F")};
`;

export default SwiperDot;
