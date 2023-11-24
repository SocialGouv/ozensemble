import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import ConfettiImage from '../assets/images/confetti.png';

const NUM_CONFETTI = 100;
const COLORS = ['#107ed5', '#DE285E', '#39CEC1', '#09aec5', '#FCBC49'];
const CONFETTI_SIZE = 16;

const Confettis = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const confettiProps = Array.from({ length: NUM_CONFETTI }, (_, i) => ({
    initialX: Math.random() * screenWidth,
    initialY: -screenHeight - 100, // Start off-screen
    xVel: Math.random() * 400 - 200,
    yVel: Math.random() * 150 + 400,
    angleVel: (Math.random() * 3 - 1.5) * Math.PI,
    delay: Math.floor(i / 15) * 0.3,
    elasticity: Math.random() * 0.3 + 0.1,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {confettiProps.map((props, index) => (
        <Confetti key={index} {...props} />
      ))}
    </View>
  );
};
const Confetti = ({ initialX, initialY, xVel, yVel, angleVel, delay, elasticity, color }) => {
  const { width: screenWidth } = Dimensions.get('screen');
  const x = useSharedValue(initialX);
  const y = useSharedValue(initialY);
  const angle = useSharedValue(0); // Assuming initial angle is 0

  useEffect(() => {
    let frameId;

    const animate = () => {
      'worklet';
      if (delay > 0) {
        delay -= 1 / 60; // Assuming 60 FPS
      } else {
        x.value += xVel / 60;
        y.value += yVel / 60;
        angle.value += angleVel / 60;

        // Check and handle left and right boundaries
        if (x.value > screenWidth - CONFETTI_SIZE) {
          x.value = screenWidth - CONFETTI_SIZE; // Adjust position
          xVel *= -elasticity; // Reverse velocity
        } else if (x.value < 0) {
          x.value = 0; // Adjust position
          xVel *= -elasticity; // Reverse velocity
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }, { rotate: `${angle.value}rad` }],
      backgroundColor: color,
    };
  });

  return (
    <Animated.View style={[styles.confettiContainer, animatedStyles]}>
      <FastImage source={ConfettiImage} style={styles.confetti} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  confettiContainer: {
    position: 'absolute',
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    top: 0,
    left: 0,
  },
  confetti: {
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
  },
});

export default Confettis;
