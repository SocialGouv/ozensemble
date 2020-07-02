import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Animated } from 'react-native';

const ProgressBar = ({ progress, theme }) => {
  const computedProgress = React.useRef(new Animated.Value(progress)).current;

  React.useEffect(() => {
    Animated.timing(computedProgress, {
      toValue: progress,
      duration: 500,
    }).start();
  }, [progress])

  return (
    <ProgressBarContainer>
      <Animated.View
        style={{
          height: theme.dimensions.progressBar,
          minWidth: progressBarWidth({ theme }) * minWidth,
          width: computedProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, progressBarWidth({ theme })],
          }),
          backgroundColor: theme.colors.headerBackground,
          borderRadius: theme.dimensions.progressBar,
        }}
      />
    </ProgressBarContainer>
  );
};

const minWidth = 0.05; // the min width of the progress bar is 5% of the container

const progressBarWidth = ({ theme }) =>
  theme.dimensions.screen.width - 2 * theme.dimensions.quizzPadding;

const ProgressBarContainer = styled.View`
  height: ${({ theme }) => theme.dimensions.progressBar}px;
  width: ${progressBarWidth}px;
  margin: ${({ theme }) => theme.dimensions.quizzPadding}px;
  margin-bottom: ${({ theme }) => theme.dimensions.quizzPadding / 2}px;
  background-color: ${({ theme }) => theme.colors.greyBg};
  border-radius: ${({ theme }) => theme.dimensions.progressBar}px;
`;

export default withTheme(ProgressBar);
