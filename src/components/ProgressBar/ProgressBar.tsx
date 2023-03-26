import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';

export type ProgressBarProps = {
  maxWidth: number;
  style?: StyleProp<ViewStyle>;
  onComplete?: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ProgressBar({ maxWidth, style, onComplete }: ProgressBarProps) {
  const progress = useSharedValue(0);

  async function onProgressBarCompleted() {
    'worklet';
    if (onComplete) {
      runOnJS(onComplete)(true);
    }
  }

  useEffect(() => {
    progress.value = withDelay(
      1000,
      withTiming(
        maxWidth - 40,
        {
          duration: 2500,
        },
        finished => {
          onProgressBarCompleted();
        },
      ),
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
