import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignUpBackgroundImage } from '../../assets/images';
import { Layout } from '../../components/Layout';
import { Routes } from '../../navigators';
import { SignUpSchema } from './SignUpScreen.schema';
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  Link,
  SignInContainer,
  SignUpButton,
  StyledInput,
  styles,
  SubTitle,
  TextError,
  TextLink,
  TitleButton,
} from './SignUpScreen.style';
import { SignUpForm, SignUpScreenNavigationProp } from './SignUpScreen.types';

import { useDispatch } from 'react-redux';
import { createUserInFirestore } from '../../services/user.service';

export function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

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

      if (userCredential && userCredential.user) {
        await createUserInFirestore(
          email,
          userCredential.user.uid,
          false,
          firstName,
        );
      }

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
            <HeaderTitle>Create Account</HeaderTitle>
            <Text style={{ marginTop: 4 }}>Sign up to join</Text>
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
                  textColor="black"
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
                  textColor="black"
                  theme={{
                    roundness: 15,
                  }}
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
                  keyboardType="default"
                  returnKeyType="done"
                  mode="outlined"
                  label="Password"
                  textColor="black"
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
