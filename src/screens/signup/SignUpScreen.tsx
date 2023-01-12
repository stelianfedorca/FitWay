import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import auth from '@react-native-firebase/auth';

import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Routes } from '../../navigators';
import { SignUpSchema } from './SignUpScreen.schema';
import {
  Container,
  Link,
  NextButton,
  SignInContainer,
  SignUpButton,
  StyledInput,
  SubTitle,
  TextButton,
  TextError,
  TextLink,
  Title,
  TitleButton,
} from './SignUpScreen.style';
import { SignUpForm, SignUpScreenNavigationProp } from './SignUpScreen.types';

export function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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

  async function handleSignUp({ email, password }: SignUpForm) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      emailInputRef.current?.clear();
      passwordInputRef.current?.clear();
    } catch (error) {
      // @ts-ignore
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
    }
  }

  function handleSignInPress() {
    navigation.navigate(Routes.SignIn);
  }

  return (
    <Container>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Pressable
              style={{
                // paddingVertical: 18,
                // borderWidth: 1,
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
                placeholder="Email"
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
                marginTop: 15,
                // paddingVertical: 18,
                justifyContent: 'flex-start',
                height: 55,
              }}>
              <StyledInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                ref={passwordInputRef}
                secureTextEntry={true}
                placeholder="Password"
                autoCorrect={false}
                textContentType="newPassword"
                keyboardType="default"
                returnKeyType="done"
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
          style={{
            shadowColor: 'black',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
          }}>
          <TitleButton>Sign Up</TitleButton>
        </SignUpButton>

        <SignInContainer>
          <SubTitle>Having already an account? </SubTitle>
          <Link onPress={handleSignInPress}>
            <TextLink>Sign In</TextLink>
          </Link>
        </SignInContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
}
