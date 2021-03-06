import React from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

/* ACTION */

export const setToast = (caption = '', duration = 2000) => ({
  type: 'SET_TOAST',
  payload: { caption, duration },
});

/* COMPONENT */

const makeStateToProps = (state) => ({ caption: state.caption, duration: state.duration });
const dispatchToProps = { setToast };

const Toast = connect(
  makeStateToProps,
  dispatchToProps
)(({ backgroundColor, caption, duration, setToast }) => {
  const [show, setShow] = React.useState(caption.length);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const timeout = React.useRef(null);

  const fadeIn = () => {
    setShow(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setShow(false);
      setToast('');
    });
  };

  const handleReset = () => {
    clearTimeout(timeout.current);
    fadeOut();
  };

  React.useEffect(() => {
    if (caption.length) {
      fadeIn();
      timeout.current = setTimeout(() => {
        fadeOut();
      }, duration);
      return () => clearTimeout(timeout.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caption, duration]);

  if (!show) return null;

  return (
    <TouchableWithoutFeedback onPress={handleReset}>
      <View style={styles.container}>
        <Animated.View style={[styles.toastContainer(backgroundColor), { opacity: fadeAnim }]}>
          <Text style={styles.content}>{caption}</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  toastContainer: (backgroundColor) => ({
    overflow: 'hidden',
    maxWidth: Dimensions.get('window').width * 0.8,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  }),
  content: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

/* PROVIDER */

const initState = {
  caption: '',
  duration: 3000,
};

const reducer = (state = initState, action = {}) => {
  if (action.type === 'SET_TOAST') return action.payload;
  return state;
};

const store = createStore(reducer);

export const ToastProvider = ({ children, backgroundColor }) => (
  <Provider store={store}>
    <>
      {children}
      <Toast backgroundColor={backgroundColor} />
    </>
  </Provider>
);

/* HOC */

export const withToast = (ChildComponent) => {
  const ToastedComponent = (props) => {
    if (!ChildComponent) return null;
    return <ChildComponent {...props} setToast={(...args) => store.dispatch(setToast(...args))} />;
  };

  ToastedComponent.displayName = `withToast(${
    ToastedComponent.displayName || ToastedComponent.name || 'Component'
  })`;

  return ToastedComponent;
};
