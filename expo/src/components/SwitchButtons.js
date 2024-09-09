import React, { useCallback, useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import TextStyled from "./TextStyled";

const SwitchButtons = ({ leftContent, rightContent, handleSwitchChange, initPosition = 1 }) => {
  const translateX = useRef(new Animated.Value(initPosition)).current;
  const position = useRef(new Animated.Value(initPosition)).current;
  const containerRef = useRef(null);
  const insideContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: initPosition * (width - 4),
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onTerminate = async (evt) => {
    try {
      const newX = evt.nativeEvent.locationX;

      // Measure the width of the inside container
      const width = await new Promise((res) =>
        insideContainerRef.current.measure((x, y, width, height, pageX, pageY) => {
          res(width);
        })
      );

      const newPosition = Number(newX > width / 2);

      // Measure the width of the button
      const buttonWidth = await new Promise((res) =>
        buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
          res(width);
        })
      );

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: newPosition * (buttonWidth - 4),
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: newPosition,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      handleSwitchChange(newPosition === 0 ? leftContent : rightContent);
    } catch (error) {
      console.error("Error during onTerminate:", error);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      // onPanResponderGrant: (evt, gestureState) => {},
      // onPanResponderMove: (evt, gestureState) => {},
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: onTerminate,
      // onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  return (
    <View style={[styles.outerContainer]}>
      <View
        ref={containerRef}
        style={[styles.container]}
        {...(panResponder?.panHandlers || {})}
        pointerEvents="box-only"
      >
        <View ref={insideContainerRef} style={styles.content}>
          <Animated.View ref={buttonRef} onLayout={onLayout} style={[styles.button, { transform: [{ translateX }] }]} />
        </View>
        <View style={styles.textsContainer}>
          <View style={styles.textContainer}>
            <Animated.View
              style={[
                styles.textColorsContainer,
                {
                  opacity: position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ]}
            >
              <TextStyled bold color={"#000"}>
                {leftContent}
              </TextStyled>
            </Animated.View>
            <Animated.View
              style={[
                styles.textColorsContainer,
                {
                  opacity: position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                    extrapolate: "clamp",
                  }),
                },
              ]}
            >
              <TextStyled bold color={"#fff"}>
                {leftContent}
              </TextStyled>
            </Animated.View>
          </View>
          <View style={styles.textContainer}>
            <Animated.View
              style={[
                styles.textColorsContainer,
                {
                  opacity: position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                    extrapolate: "clamp",
                  }),
                },
              ]}
            >
              <TextStyled bold color={"#000"}>
                {rightContent}
              </TextStyled>
            </Animated.View>
            <Animated.View
              style={[
                styles.textColorsContainer,
                {
                  opacity: position.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ]}
            >
              <TextStyled bold color={"#fff"}>
                {rightContent}
              </TextStyled>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};

const padding = 4;

const styles = StyleSheet.create({
  outerContainer: {
    width: "40%",
    alignItems: "center",
  },

  title: {
    marginBottom: 10,
  },
  container: {
    width: "70%",
    borderRadius: 30,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderColor: "#DBDBE8",
  },
  content: {
    width: "100%",
  },
  button: {
    backgroundColor: "#4030A5",
    width: "50%",
    minHeight: 30,
    borderRadius: 30,
    margin: 2,
  },
  textsContainer: {
    position: "absolute",
    top: padding,
    left: padding,
    right: padding,
    bottom: padding,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textColorsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    marginVertical: "auto",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default SwitchButtons;
