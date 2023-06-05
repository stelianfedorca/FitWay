import { StyleSheet, Text, useWindowDimensions } from 'react-native';
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
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { SurveyScreenNavigationProp } from '../survey/SurveyScreen.types';
import { Stacks } from '../../navigators/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, setTdee } from '../../redux/slices/profileSlice';
import { calculateTDEE } from '../../utils/calculator';
import {
  updateProfileInFiresotore,
  updateUserInFirestore,
} from '../../services/user.service';

import auth from '@react-native-firebase/auth';
import { selectUid } from '../../redux/slices/userSlice';

export function LoadingScreen() {
  // useCalories();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const navigation = useNavigation<SurveyScreenNavigationProp>();
  const [isButtonShowing, setIsButtonShowing] = useState(false);
  const textOpacity = useSharedValue(0);

  // const userId = auth().currentUser?.uid;

  const uid = useSelector(selectUid);

  useEffect(() => {
    textOpacity.value = withTiming(1, { duration: 1300 });
  }, []);

  useEffect(() => {
    dispatch(setTdee(calculateTDEE(79, 179, 23, 'male', 2)));
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: textOpacity.value };
  });

  async function handleContinuePress() {
    await updateProfileInFiresotore(uid, profile);
    navigation.replace(Stacks.Home);
  }

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
            onPress={handleContinuePress}
            style={styles.shadowButton}>
            <TextContinue>Continue</TextContinue>
          </AnimatedPrimaryButton>
        )}
      </Container>
    </Layout>
  );
}

export const styles = StyleSheet.create({
  shadowButton: {
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
  },
});
