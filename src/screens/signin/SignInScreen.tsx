import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';

import { useForm, Controller } from 'react-hook-form';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  TextInput,
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
} from './SignInScreen.style';
import { SignInForm, SignInScreenNavigationProp } from './SignInScreen.types';

import { Layout } from '../../components/Layout';
import { SignInSchema } from './SignInScreen.schema';

import auth from '@react-native-firebase/auth';
import { Routes } from '../../navigators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuthStore } from '../../stores';

export function SignInScreen() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    setUser(user);
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
        backgroundColor: 'white',
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
        <KeyboardAwareScrollView
          style={{
            flex: 1.5,
            borderTopLeftRadius: 55,
            borderTopRightRadius: 55,
            bottom: 50,
            backgroundColor: 'white',
            paddingBottom: 50,
            padding: 40,
          }}
          contentContainerStyle={{}}>
          <TitleContainer>
            <Title size={34} color="#d3bfad">
              Welcome
            </Title>
          </TitleContainer>
          <SubTitleContainer>
            <SubTitle>Don't have an account? </SubTitle>
            <TextButton onPress={handleSignUpPress}>
              <Title color="#44423f">Sign Up</Title>
            </TextButton>
          </SubTitleContainer>
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

          <SignInButton onPress={handleSubmit(handleSignIn)}>
            <TitleButton>Sign in</TitleButton>
          </SignInButton>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Layout>
  );
}
