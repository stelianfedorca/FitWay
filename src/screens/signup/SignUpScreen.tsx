import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Routes} from '../../navigators';
import {Container, NextButton, TextButton, Title} from './SignUpScreen.style';
import {SignUpScreenNavigationProp} from './SignUpScreen.types';

export function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  function onPress() {
    navigation.navigate(Routes.SignIn);
  }

  return (
    <Container>
      <Title>{'Hello SignUp Screen'}</Title>
      <NextButton onPress={onPress}>
        <TextButton>Go to Sign In Screen</TextButton>
      </NextButton>
    </Container>
  );
}
