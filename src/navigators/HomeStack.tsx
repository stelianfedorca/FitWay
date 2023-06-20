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
import { SearchRecommendation } from '../screens/searchfood';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSurveyCompleted } from '../redux/slices/profileSlice';
import { selectUid } from '../redux/slices/userSlice';
import { selectLoading } from '../redux/slices/loadingSlice';
import { IconButton } from 'react-native-paper';
import { useDiary } from '../hooks/useDiary';
import { format } from 'date-fns';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SavedMealPlansDayScreen } from '../screens/saved_meal_plans_day/SavedMealPlansDayScreen';
import { SavedMealPlansWeekScreen } from '../screens/saved_meal_plans_week/SavedMealPlansWeekScreen';
import { selectCurrentDate, setCurrentDate } from '../redux/slices/dateSlice';
import { isEmpty } from '../screens/searchfood/SearchFoodScreen';
import { MealPlanDetails } from '../redux/slices/mealPlanSlice';
import { DetailsScreen } from '../screens/details';

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
  [Routes.Recommendation]: undefined;
  [Routes.SavedMealPlans]: undefined;
  [Routes.MealDetails]: { item: MealPlanDetails; saved: boolean };
};

const Stack = createNativeStackNavigator<RootStackParams>();

export type SavedMealPlansStackParams = {
  [Routes.SavedMealPlansDay]: undefined;
  [Routes.SavedMealPlansWeek]: undefined;
};

const SavedMealPlansTabs =
  createMaterialTopTabNavigator<SavedMealPlansStackParams>();

function SavedMealPlansTabsScreen() {
  return (
    <SavedMealPlansTabs.Navigator screenOptions={{}}>
      <SavedMealPlansTabs.Screen
        name={Routes.SavedMealPlansDay}
        component={SavedMealPlansDayScreen}
        options={{ tabBarLabel: 'Day' }}
      />
      <SavedMealPlansTabs.Screen
        name={Routes.SavedMealPlansWeek}
        component={SavedMealPlansWeekScreen}
        options={{ tabBarLabel: 'Week' }}
      />
    </SavedMealPlansTabs.Navigator>
  );
}

const HomeStack = () => {
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const currentSelectedDate = useSelector(selectCurrentDate);
  useDiary(isEmpty(currentSelectedDate) ? currentDate : currentSelectedDate);
  const user = useSelector(selectUid);
  const isSurveyCompleted = useSelector(selectIsSurveyCompleted);
  const [showSurvey] = useState(!isSurveyCompleted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setCurrentDate(
        isEmpty(currentSelectedDate) ? currentDate : currentSelectedDate,
      ),
    );
  });

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
          animation: 'slide_from_bottom',
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          headerShown: false,
          headerShadowVisible: false,
          // headerLeft: () => <IconButton onPress={() => navigation.} icon="close"/>,
        }}
      />
      <Stack.Screen
        name={Routes.Recommendation}
        component={SearchRecommendation}
        options={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={Routes.SavedMealPlans}
        component={SavedMealPlansTabsScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: 'Meal Plans',
        }}
      />

      <Stack.Screen
        name={Routes.MealDetails}
        component={DetailsScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: 'Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
