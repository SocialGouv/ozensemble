import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import { defaultPaddingFontScale, screenWidth } from "../styles/theme";

const ProgressBar = ({ progress }) => {
  const computedProgress = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(computedProgress, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <ProgressBarContainer>
      <Animated.View
        style={{
          height: progressBarHeight,
          minWidth: progressBarWidth * minWidth,
          width: computedProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, progressBarWidth],
          }),
          backgroundColor: "#39cec0",
          borderRadius: progressBarHeight,
        }}
      />
    </ProgressBarContainer>
  );
};

const progressBarHeight = 10;
const progressBarWidth = screenWidth - 2 * defaultPaddingFontScale();
const minWidth = 0.05; // the min width of the progress bar is 5% of the container

const ProgressBarContainer = styled.View`
  height: ${progressBarHeight}px;
  width: ${progressBarWidth}px;
  margin: ${defaultPaddingFontScale()}px;
  margin-bottom: ${defaultPaddingFontScale() / 2}px;
  background-color: #efefef;
  border-radius: ${progressBarHeight}px;
`;

export default ProgressBar;
