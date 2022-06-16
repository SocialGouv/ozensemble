import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import TextStyled from '../../../components/TextStyled';

const DraggableFlatListDay4 = ({ data, setData }) => {
  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator key={item.answerKey}>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem, { backgroundColor: isActive ? 'red' : item.backgroundColor }]}>
          <TextStyled>{item.content}</TextStyled>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
    />
  );
};

export default DraggableFlatListDay4;

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
