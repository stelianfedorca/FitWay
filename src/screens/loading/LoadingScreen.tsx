import { Text, useWindowDimensions } from 'react-native';
import { Layout } from '../../components/Layout';
import {
  Container,
  AnimatedPrimaryButton,
  TextContinue,
  AnimatedHeaderText,
} from './LoadingScreen.style';

import { ProgressBar } from '../../components/ProgressBar';
import { useCalories } from '../../hooks/useCalories';
import { useEffect, useState } from 'react';
import {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export function LoadingScreen() {
  useCalories();
  const { width } = useWindowDimensions();
  const [isButtonShowing, setIsButtonShowing] = useState(false);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    textOpacity.value = withTiming(1, { duration: 1500 });
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: textOpacity.value };
  });

  return (
    <Layout>
      <Container>
        <AnimatedHeaderText style={textAnimatedStyle}>
          Calculating daily calories recommandation
        </AnimatedHeaderText>
        <ProgressBar maxWidth={width} onComplete={setIsButtonShowing} />
        {isButtonShowing && (
          <AnimatedPrimaryButton
            entering={FadeIn.delay(300)}
            exiting={FadeOut}
            onPress={() => console.log('hello world')}>
            <TextContinue>Continue</TextContinue>
          </AnimatedPrimaryButton>
        )}
      </Container>
    </Layout>
  );
}
