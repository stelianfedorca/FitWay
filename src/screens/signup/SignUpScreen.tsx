import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Routes } from '../../navigators';
import { SignUpSchema } from './SignUpScreen.schema';
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  Link,
  NextButton,
  SignInContainer,
  SignUpButton,
  StyledInput,
  styles,
  SubTitle,
  TextButton,
  TextError,
  TextLink,
  Title,
  TitleButton,
} from './SignUpScreen.style';
import { SignUpForm, SignUpScreenNavigationProp } from './SignUpScreen.types';
import { useAuthStore, useProfileStore } from '../../stores';
import { SignUpBackgroundImage } from '../../assets/images';
import { Layout } from '../../components/Layout';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/slices/userSlice';
import { setIsSurveyCompleted } from '../../redux/slices/profileSlice';

export function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const setProfile = useProfileStore(state => state.setProfile);
  const setUser = useAuthStore(state => state.setUser);
  const { height } = useWindowDimensions();

  const [loading, setLoading] = useState(false);

  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues,
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignUpSchema),
  });

  async function handleSignUp({ firstName, email, password }: SignUpForm) {
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // setProfile({
      //   firstName: firstName,
      //   email: userCredential.user.email,
      //   isSurveyCompleted: !userCredential.additionalUserInfo?.isNewUser,
      // });

      // AsyncStorage.setItem('userId', JSON.stringify(userCredential.user.uid));

      nameInputRef.current?.clear();
      emailInputRef.current?.clear();
      passwordInputRef.current?.clear();
    } catch (error) {
      // @ts-ignore
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
    }

    setLoading(false);
  }

  function handleSignInPress() {
    navigation.navigate(Routes.SignIn);
  }

  return (
    <Layout
      paddingBottom
      style={{ backgroundColor: '#f2f2f3', justifyContent: 'flex-start' }}>
      <ImageBackground
        source={SignUpBackgroundImage}
        style={{
          height: 310,
          width: '100%',
        }}
        resizeMode="cover"
      />
      <Container>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: '#f2f2f3',
          }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: 'center',
          }}
          scrollEnabled={false}>
          <HeaderContainer>
            <HeaderTitle variant="headlineLarge">Sign Up</HeaderTitle>
          </HeaderContainer>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Pressable
                style={{
                  height: 55,
                  justifyContent: 'flex-start',
                }}>
                <StyledInput
                  ref={nameInputRef}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  textContentType="name"
                  autoCapitalize="words"
                  autoCorrect={true}
                  mode="outlined"
                  label="Name"
                  theme={{ roundness: 15 }}
                />
                {!!errors.firstName && (
                  <View
                    style={{
                      bottom: -5,
                      paddingHorizontal: 5,
                    }}>
                    <TextError>{errors.firstName.message}</TextError>
                  </View>
                )}
              </Pressable>
            )}
          />
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
                  ref={emailInputRef}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  mode="outlined"
                  label="Email"
                  theme={{ roundness: 15 }}
                  style={{}}
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
                  ref={passwordInputRef}
                  secureTextEntry={true}
                  autoCorrect={false}
                  textContentType="newPassword"
                  keyboardType="default"
                  returnKeyType="done"
                  mode="outlined"
                  label="Password"
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

          <SignUpButton
            onPress={handleSubmit(handleSignUp)}
            style={styles.shadowButton}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <TitleButton>Sign Up</TitleButton>
            )}
          </SignUpButton>

          <SignInContainer>
            <SubTitle>Joined us before? </SubTitle>
            <Link onPress={handleSignInPress}>
              <TextLink>Sign In</TextLink>
            </Link>
          </SignInContainer>
        </KeyboardAwareScrollView>
      </Container>
    </Layout>
  );
}
