import React, { useEffect, useRef, useState } from "react";
import { Image, Dimensions, Animated, StyleSheet } from "react-native";
import { atom, useRecoilValue } from "recoil";

// waiting for RNBootSplash.show to come back
export const showBootSplashState = atom({
  key: "showBootSplashState",
  default: false,
});

const CustomBootsplash = () => {
  const showBootSplash = useRecoilValue(showBootSplashState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showBootSplash ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setAnimationComplete(!showBootSplash);
      }
    });
  }, [showBootSplash]);

  if (!showBootSplash && animationComplete) return null;

  return (
    <Animated.View style={[styles.fullScreen, { opacity: fadeAnim }]}>
      <Image source={require("../assets/images/Icon.png")} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3e309f",
  },
  image: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
  },
});

export default CustomBootsplash;
