import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import styled from "styled-components";
import TextStyled from "./TextStyled";

const DeleteBackground = styled.View`
  flex: 1;
  background-color: #de285e;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

const DeleteText = styled(TextStyled)`
  color: white;
  font-weight: ${Platform.OS === "android" ? "bold" : "800"};
  width: 130px;
  text-align: center;
`;

const TouchableDelete = ({ children, onDelete }) => (
  <SwipeRow
    rightOpenValue={-140}
    disableRightSwipe={true}
    disableLeftSwipe={false}
    onRowPress={() => {
      if (__DEV__) console.log("provide on press");
    }}>
    <DeleteBackground>
      <TouchableOpacity onPress={onDelete}>
        <DeleteText>Supprimer</DeleteText>
      </TouchableOpacity>
    </DeleteBackground>
    {children}
  </SwipeRow>
);

export default TouchableDelete;
