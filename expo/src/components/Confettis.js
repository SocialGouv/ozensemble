import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Image } from "expo-image";
import ConfettiImage from "../assets/images/confetti.png";

const NUM_CONFETTI = 100;
const COLORS = ["#107ed5", "#DE285E", "#39CEC1", "#09aec5", "#FCBC49"];
const CONFETTI_SIZE = 16;

const Confettis = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {Array.from({ length: NUM_CONFETTI }).map((_, index) => (
        <Confetti
          key={index}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          color={COLORS[index % COLORS.length]}
          delay={index * 50}
        />
      ))}
    </View>
  );
};

const Confetti = ({ screenWidth, screenHeight, color, delay }) => {
  const x = useSharedValue(Math.random() * screenWidth);
  const y = useSharedValue(-screenHeight); // Start well above the screen
  const rotation = useSharedValue(0);

  // Randomize horizontal movement
  const amplitude = Math.random() * 50 + 50; // Random amplitude between 50 and 250
  const period = Math.random() * 2000 + 1000; // Random period between 1000 and 3000 ms

  React.useEffect(() => {
    y.value = withDelay(
      delay,
      withTiming(screenHeight + CONFETTI_SIZE, {
        duration: 4000, // 10 seconds for a slower fall
        easing: Easing.linear,
      })
    );

    x.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(x.value - amplitude, {
            duration: period,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(x.value + amplitude, {
            duration: period,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      )
    );

    rotation.value = withDelay(
      delay,
      withRepeat(
        withTiming(2 * Math.PI, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { rotate: `${rotation.value}rad` },
      ],
      backgroundColor: color,
    };
  });

  return (
    <Animated.View style={[styles.confetti, animatedStyle]}>
      <Image source={ConfettiImage} style={styles.confettiImage} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  confetti: {
    position: "absolute",
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
  },
  confettiImage: {
    width: "100%",
    height: "100%",
  },
});

export default Confettis;
