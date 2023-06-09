import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SignInBackgroundImage } from '../../assets/images';
import {
  Title,
  TextButton,
  StyledInput,
  SignInButton,
  SubTitle,
  TitleContainer,
  SubTitleContainer,
  TitleButton,
  TextError,
  Container,
  SignUpButton,
  TitleSignUp,
  Link,
  LinkText,
  BottomTextContainer,
  styles,
} from './SignInScreen.style';
import { SignInForm, SignInScreenNavigationProp } from './SignInScreen.types';

import { Layout } from '../../components/Layout';
import { SignInSchema } from './SignInScreen.schema';

import auth from '@react-native-firebase/auth';
import { Routes } from '../../navigators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuthStore, useProfileStore } from '../../stores';
import { Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectEmail } from '../../redux/slices/userSlice';
import { selectLoading } from '../../redux/slices/loadingSlice';
import { setLoading as setLoadingState } from '../../redux/slices/loadingSlice';
import {
  selectProfile,
  setIsSurveyCompleted,
} from '../../redux/slices/profileSlice';

export function SignInScreen() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);

  const loadingState = useSelector(selectLoading);

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const setProfile = useProfileStore(state => state.setProfile);

  const email = useSelector(selectEmail);
  const dispatch = useDispatch();

  const profilestate = useSelector(selectProfile);

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues,
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignInSchema),
  });

  async function handleSignIn({ email, password }: SignInForm) {
    // dispatch(setLoadingState({ loading: false }));
    setLoading(true);
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    // if (userCredential) {
    //   dispatch(setIsSurveyCompleted({ isSurveyCompleted: true }));
    // }

    // dispatch(
    //   setProfile({
    //     isSurveyCompleted: true,
    //     age: userCredential.user.,
    //     caloricIntake: 0,
    //     height: String(height),
    //     startingWeight: String(weight),
    //     goalWeight: String(goalWeight),
    //     activityLevel: String(activityLevelData[activityLevel].title),
    //     gender: String(GENDER[genderIndex]),
    //   }),
    // );

    if (userCredential) {
      dispatch(
        login({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }),
      );
    }

    setLoading(false);
  }

  function handleSignUpPress() {
    navigation.navigate(Routes.SignUp);
  }

  return (
    <Layout
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: '#f2f2f3',
      }}>
      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
        }}>
        <ImageBackground
          source={SignInBackgroundImage}
          style={{ height: height / 2.5 }}
        />
        <Pressable
          style={{
            flex: 1,
            backgroundColor: '#f2f2f3',
          }}
          onPress={Keyboard.dismiss}
          accessible={false}>
          <KeyboardAwareScrollView
            style={{
              flex: 1.5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              bottom: 150,
              backgroundColor: '#f2f2f3',
              paddingBottom: 50,
              // paddingVertical: 40,
            }}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingVertical: 50,
              paddingHorizontal: 15,
              justifyContent: 'space-evenly',
            }}>
            <TitleContainer>
              <Text variant="headlineLarge" style={{ fontWeight: '500' }}>
                Welcome back
              </Text>
            </TitleContainer>
            <SubTitleContainer>
              <SubTitle>Please enter your details.</SubTitle>
            </SubTitleContainer>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Pressable
                  style={{
                    height: 55,
                    justifyContent: 'flex-start',
                    marginTop: 30,
                  }}>
                  <StyledInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    label="Email"
                    mode="outlined"
                    theme={{ roundness: 15 }}
                  />
                  {!!errors.email && (
                    <View
                      style={{
                        bottom: -5,
                        paddingHorizontal: 5,
                      }}>
                      <TextError>{errors.email.message}</TextError>
                    </View>
                  )}
                </Pressable>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Pressable
                  style={{
                    marginTop: 30,
                    justifyContent: 'flex-start',
                    height: 55,
                  }}>
                  <StyledInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    autoCorrect={false}
                    textContentType="newPassword"
                    keyboardType="default"
                    returnKeyType="done"
                    placeholderTextColor="#323437"
                    label="Password"
                    mode="outlined"
                    theme={{ roundness: 15 }}
                  />
                  {!!errors.password && (
                    <View style={{ bottom: -5, paddingHorizontal: 5 }}>
                      <TextError>{errors.password.message}</TextError>
                    </View>
                  )}
                </Pressable>
              )}
            />

            <SignInButton
              style={styles.shadowButton}
              onPress={handleSubmit(handleSignIn)}>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <TitleButton>Sign in</TitleButton>
              )}
            </SignInButton>

            <BottomTextContainer>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>
                Don't have an account?
              </Text>
              <Link onPress={handleSignUpPress}>
                <LinkText>Sign Up</LinkText>
              </Link>
            </BottomTextContainer>
          </KeyboardAwareScrollView>
        </Pressable>
      </ScrollView>
    </Layout>
  );
}
