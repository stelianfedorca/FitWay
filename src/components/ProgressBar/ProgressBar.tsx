import React, { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';

export type ProgressBarProps = {
  maxWidth: number;
  style?: StyleProp<ViewStyle>;
  onComplete?: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ProgressBar({ maxWidth, style, onComplete }: ProgressBarProps) {
  const { width } = useWindowDimensions();

  const progress = useSharedValue(0);

  async function onProgressBarCompleted() {
    'worklet';
    if (onComplete) {
      runOnJS(onComplete)(true);
    }
  }

  useEffect(() => {
    progress.value = withTiming(
      maxWidth - 40,
      {
        duration: 3500,
      },
      finished => {
        onProgressBarCompleted();
      },
    );
  }, []);

  const progressBarWidthAnimated = useAnimatedStyle(() => {
    return { width: progress.value };
  });

  return (
    <Animated.View
      style={[styles.progressBar, progressBarWidthAnimated, style]}
    />
  );
}

export const styles = StyleSheet.create({
  progressBar: {
    height: 8,
    flexDirection: 'row',
    backgroundColor: '#457ad7',
    borderRadius: 5,
  },
});
