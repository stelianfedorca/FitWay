import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useAuthStore, useProfileStore } from '../stores';
import { Routes, Stacks, Tabs } from './Routes';
import TabNavigator from './TabNavigator';

import { SurveyScreen } from '../screens';
import { IntroductionScreen } from '../screens/survey';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { SearchFoodScreen } from '../screens/searchfood';
import { useSelector } from 'react-redux';
import { selectIsSurveyCompleted } from '../redux/slices/profileSlice';
import { selectUid } from '../redux/slices/userSlice';

export type SurveyStackParams = {
  [Routes.Survey]: undefined;
  [Routes.Introduction]: undefined;
  [Routes.Loading]: undefined;
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
      <SurveyStack.Screen name={Routes.Loading} component={LoadingScreen} />
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
  console.log('homestack');
  const user = useSelector(selectUid);
  const isSurveyCompleted = useSelector(selectIsSurveyCompleted);

  const [showSurvey] = useState(!isSurveyCompleted);

  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: user ? 'push' : 'pop',
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      {isSurveyCompleted ? (
        <>
          <Stack.Screen name={Stacks.Home} component={TabNavigator} />
          <Stack.Screen
            name={Routes.Search}
            component={SearchFoodScreen}
            options={{
              headerShown: true,
              headerShadowVisible: false,
            }}
          />
        </>
      ) : (
        <>
          {console.log('aici ????')}
          <Stack.Screen name={Stacks.Survey} component={Survey} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default HomeStack;
