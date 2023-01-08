import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {useForm, Controller} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {
  BackButton,
  Container,
  Title,
  TextButton,
  StyledInput,
  SignInButton,
} from './SignInScreen.style';
import {SignInForm, SignInScreenNavigationProp} from './SignInScreen.types';

export function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();

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
    formState: {errors},
  } = useForm<SignInForm>({defaultValues});

  function onPress() {
    navigation.goBack();
  }
  return (
    <Container>
      <Title>{'Hello SignInScreen'}</Title>
      <View
        style={{
          height: 100,
          borderWidth: 3,
          borderColor: 'pink',
        }}></View>
      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // flex: 1,
          borderWidth: 1,
          paddingBottom: 400,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: 'blue',
          }}>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <StyledInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <StyledInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <SignInButton>
            <TextButton color="white">Sign In</TextButton>
          </SignInButton>
        </View>
      </ScrollView>
      {/* <BackButton onPress={onPress}>
        <TextButton>Go back to Sign Up Screen</TextButton>
      </BackButton> */}
    </Container>
  );
}
