import { Text, useWindowDimensions } from 'react-native';
import { Layout } from '../../components/Layout';
import { Container, PrimaryButton, TextContinue } from './LoadingScreen.style';

import { ProgressBar } from '../../components/ProgressBar';
import { useCalories } from '../../hooks/useCalories';
import { useState } from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';

export function LoadingScreen() {
  useCalories();
  const { width } = useWindowDimensions();
  const [isButtonShowing, setIsButtonShowing] = useState(false);

  return (
    <Layout>
      <Container>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'center',
            marginBottom: 50,
          }}>
          Calculating daily calories recommandation
        </Text>
        <ProgressBar maxWidth={width} onComplete={setIsButtonShowing} />
        {isButtonShowing && (
          <PrimaryButton
            entering={FadeIn}
            exiting={FadeOut}
            onPress={() => console.log('hello world')}>
            <TextContinue>Continue</TextContinue>
          </PrimaryButton>
        )}
      </Container>
    </Layout>
  );
}
