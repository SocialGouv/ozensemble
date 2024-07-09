import React from "react";
import styled from "styled-components/native";

const EmptyView = styled.View`
  flex: 1;
  background-color: #0ee;
  position: absolute;
  height: 100%;
  width: 100%;
  ${({ debug }) => debug && "border: 3px solid #000;"}
`;

export default EmptyView;
