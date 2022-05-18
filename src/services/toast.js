import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from '../components/Modal';

const ModalContext = React.createContext();

export const useToast = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

const ToastProvider = (props) => {
  const [caption, setCaption] = useState();

  const hide = useCallback(() => setCaption(null), [setCaption]);

  const show = useCallback(
    (caption, timeout = 3000) => {
      setCaption(caption);
      setTimeout(() => {
        setCaption(null);
      }, timeout);
    },
    [setCaption]
  );

  return (
    <ModalContext.Provider value={{ hide, show }} {...props}>
      {props.children}
      <Modal visible={Boolean(caption)} hideOnTouch hide={hide} animationType="fade" style={styles.modal}>
        <View style={styles.wrapper}>
          <Text maxFontSizeMultiplier={2} style={styles.text} testID="toast">
            {caption}
          </Text>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

export default ToastProvider;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 3,
  },
  wrapper: {
    backgroundColor: '#4030a5',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
