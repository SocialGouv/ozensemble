import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import TextStyled from '../../../components/TextStyled';

const DraggableFlatListDay4 = ({ data, setData }) => {
  const renderItem = ({ item, drag, isActive }) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[styles.rowItem, { backgroundColor: isActive ? 'red' : item.backgroundColor }]}>
        <TextStyled>{item.content}</TextStyled>
      </TouchableOpacity>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.answerKey}
      renderItem={renderItem}
    />
  );
};
{
  /* <DraggableFlatList
ref={draggableListRef}
contentContainerStyle={[
  styles.sectionsList,
  styles.draggableList,
  draggableListVisible && styles.draggableListVisible,
]}
keyboardShouldPersistTaps="always"
data={sections}
renderItem={renderSection}
keyExtractor={(item) => item.id}
onDragEnd={onDragEnd}
ListFooterComponent={
  <TouchableWithoutFeedback onPress={onSectionsDisactive}>
    <View style={styles.resetActive} />
  </TouchableWithoutFeedback>
}
scrollEventThrottle={16}
onScrollEndDrag={(e) => setListScrollOffset(e.nativeEvent.contentOffset.y)}
onMomentumScrollEnd={(e) => setListScrollOffset(e.nativeEvent.contentOffset.y)}
/>
 */
}
export default DraggableFlatListDay4;

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
