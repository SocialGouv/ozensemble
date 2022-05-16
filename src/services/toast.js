import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ModalContainer from '../components/Modal';

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
      <ModalContainer visible={Boolean(caption)} hide={hide} hideOnTouch animationType="fade" style={styles.modal}>
        <View style={styles.wrapper}>
          <Text maxFontSizeMultiplier={2} style={styles.text} testID="toast">
            {caption}
          </Text>
        </View>
      </ModalContainer>
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
  },
  wrapper: {
    backgroundColor: '#4030a5',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  text: {
    fontFamily: 'CodecPro-Bold',
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
