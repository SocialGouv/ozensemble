import React from 'react';
import { Modal, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const ModalContainer = ({
  animationType = 'slide',
  visible,
  hide,
  withBackground,
  children,
  hideOnTouch,
  style = {},
  safeAreaView = true,
}) => {
  const Wrapper = hideOnTouch ? TouchableWithoutFeedback : React.Fragment;
  const wrapperProps = hideOnTouch ? { onPress: hide, style: styles.touchable } : {};
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={hide}
      animationType={animationType}
      style={styles.modalContainer}>
      <>
        <Wrapper {...wrapperProps}>
          <View style={[styles.background, withBackground && styles.colored]} />
        </Wrapper>
        {safeAreaView ? (
          <SafeAreaView style={[styles.modal, style]} pointerEvents="box-none">
            <View style={styles.container}>{children}</View>
          </SafeAreaView>
        ) : (
          children
        )}
      </>
    </Modal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    width: '100%',
  },
  touchable: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  colored: {
    backgroundColor: 'rgba(1,1,1,0.3)',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 15,
    maxWidth: '90%',
  },
});
