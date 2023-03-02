import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useAuthStore, useProfileStore } from '../stores';
import { Routes, Stacks, Tabs } from './Routes';
import TabNavigator from './TabNavigator';

import { SurveyScreen } from '../screens';
import { IntroductionScreen } from '../screens/survey';
import { SearchFoodScreen } from '../screens/searchfood';
import { useSelector } from 'react-redux';
import { selectIsSurveyCompleted } from '../redux/slices/profileSlice';

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

export type RootStackParams = {
  [Stacks.Home]: { screens: Tabs } | undefined;
  [Stacks.Survey]: undefined;
  [Routes.Search]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const HomeStack = () => {
  const user = useAuthStore(state => state.user);
  // const profile = useProfileStore(state => state.profile);
  // const survey = !profile?.isSurveyCompleted;

  const isSurveyCompleted = useSelector(selectIsSurveyCompleted);

  const [showSurvey] = useState(!isSurveyCompleted);

  return (
    <Stack.Navigator
      screenOptions={{
        // animationTypeForReplace: user ? 'push' : 'pop',
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      {showSurvey && <Stack.Screen name={Stacks.Survey} component={Survey} />}
      <Stack.Screen name={Stacks.Home} component={TabNavigator} />
      <Stack.Screen
        name={Routes.Search}
        component={SearchFoodScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
