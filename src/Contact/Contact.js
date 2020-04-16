import React from 'react';
import ContactForm from './ContactForm';
import ContactConfirm from './ContactConfirm';
import { useBackHandler } from '../helpers/customHooks';

const Contact = ({ onTextFocusInput, onTextFocusBlur, setView }) => {
  const [screen, setScreen] = React.useState(1);

  const onBackHandlerPressed = () => {
    if (screen === 2) {
      setScreen(1);
      return true;
    }
    return true;
  };

  useBackHandler(onBackHandlerPressed);

  if (screen === 1) {
    return (
      <ContactForm
        onActionButtonPress={() => setScreen(2)}
        onTextFocusInput={onTextFocusInput}
        onTextFocusBlur={onTextFocusBlur}
      />
    );
  }

  if (screen === 2) {
    return <ContactConfirm onBackPress={onBackHandlerPressed} setView={setView} />;
  }
  return null;
};

export default Contact;
