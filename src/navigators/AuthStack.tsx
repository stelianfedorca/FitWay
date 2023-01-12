import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import { SignInScreen, SignUpScreen } from '../screens';

export type AuthStackParams = {
  [Routes.SignIn]: { email: string } | undefined;
  [Routes.SignUp]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParams>();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
