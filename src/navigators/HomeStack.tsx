import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useAuthStore, useProfileStore } from '../stores';
import { Routes, Stacks, Tabs } from './Routes';
import TabNavigator from './TabNavigator';

import { SurveyScreen } from '../screens';
import { IntroductionScreen } from '../screens/survey';

export type RootStackParams = {
  [Stacks.Home]: { screens: Tabs } | undefined;
  [Stacks.Survey]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export type SurveyStackParams = {
  [Routes.Survey]: undefined;
  [Routes.Introduction]: undefined;
};

const SurveyStack = createNativeStackNavigator<SurveyStackParams>();

function Survey() {
  return (
    <SurveyStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      <SurveyStack.Screen
        name={Routes.Introduction}
        component={IntroductionScreen}
      />
      <SurveyStack.Screen name={Routes.Survey} component={SurveyScreen} />
    </SurveyStack.Navigator>
  );
}

const HomeStack = () => {
  const user = useAuthStore(state => state.user);
  const profile = useProfileStore(state => state.profile);
  const survey = !profile?.isSurveyCompleted;
  console.log('survey_completed: ', profile?.isSurveyCompleted);

  console.log(profile);
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: user ? 'push' : 'pop',
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      {survey && <Stack.Screen name={Stacks.Survey} component={Survey} />}
      <Stack.Screen name={Stacks.Home} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default HomeStack;
