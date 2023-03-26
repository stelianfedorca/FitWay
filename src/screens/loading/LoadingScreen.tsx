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
import { useNavigation } from '@react-navigation/native';
import { SurveyScreenNavigationProp } from '../survey/SurveyScreen.types';
import { Stacks } from '../../navigators/Routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCaloriesGoals,
  selectTdee,
  setIsSurveyCompleted,
  setProfile,
  setTdee,
} from '../../redux/slices/profileSlice';

export function LoadingScreen() {
  useCalories();
  
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation<SurveyScreenNavigationProp>();
  const [isButtonShowing, setIsButtonShowing] = useState(false);
  const textOpacity = useSharedValue(0);

  const caloriesGoals = useSelector(selectCaloriesGoals);
  const tdee = useSelector(selectTdee);

  useEffect(() => {
    textOpacity.value = withTiming(1, { duration: 1300 });
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: textOpacity.value };
  });

  function handleContinuePress() {
    navigation.replace(Stacks.Home);
  }

  console.log('loading screen...');

  return (
    <Layout>
      <Container>
        <AnimatedHeaderText style={textAnimatedStyle}>
          Calculating daily calories recommandation
        </AnimatedHeaderText>
        <ProgressBar maxWidth={width} onComplete={setIsButtonShowing} />
        {isButtonShowing && (
          <AnimatedPrimaryButton
            entering={FadeIn.delay(200)}
            exiting={FadeOut}
            onPress={handleContinuePress}>
            <TextContinue>Continue</TextContinue>
          </AnimatedPrimaryButton>
        )}
      </Container>
    </Layout>
  );
}
