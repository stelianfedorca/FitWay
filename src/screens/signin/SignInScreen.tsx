import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import {
  ImageBackground,
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
} from './SignInScreen.style';
import { SignInForm, SignInScreenNavigationProp } from './SignInScreen.types';

import { Layout } from '../../components/Layout';
import { SignInSchema } from './SignInScreen.schema';

export function SignInScreen() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const insets = useSafeAreaInsets();

  const defaultValues = {
    email: '',
    password: '',
  };

  function onSubmit(data: any) {
    console.log(data);
  }

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

  const email = watch('email');

  function onSubmit() {
    console.log('submited');
  }

  function handleSignUpPress() {}
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
        <Container>
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

          <SignInButton onPress={handleSubmit(onSubmit)}>
            <TitleButton>Sign in</TitleButton>
          </SignInButton>
        </Container>
      </ScrollView>
    </Layout>
  );
}
