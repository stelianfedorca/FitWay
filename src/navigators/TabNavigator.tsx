import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens';
import { Routes, Tabs } from './Routes';
import { TabBar } from '../components/TabBar';
import {
  Button,
  Image,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { FAB } from 'react-native-paper';
import {
  DiaryScreen,
  ProfileScreen,
  CustomizeMealPlanScreen,
  MealPlanScreen,
} from '../screens';

import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { selectMealPlanPerDay } from '../redux/slices/mealPlanSlice';
import { useMealPlanDetails } from '../hooks/useMealPlanDetails';
import { SearchFoodScreen } from '../screens/searchfood';
import { SavedMealPlansScreen } from '../screens/saved_meal_plans/SavedMealPlansScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SavedMealPlansDayScreen } from '../screens/saved_meal_plans_day/SavedMealPlansDayScreen';
import { SavedMealPlansWeekScreen } from '../screens/saved_meal_plans_week/SavedMealPlansWeekScreen';

export type HomeStackParams = {
  [Routes.Home]: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParams>();

function Home() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name={Routes.Home} component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

export type DiaryStackParams = {
  [Routes.Diary]: undefined;
  [Routes.Search]: undefined;
};

const DiaryStack = createNativeStackNavigator<DiaryStackParams>();

function Diary() {
  return (
    <DiaryStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      <DiaryStack.Screen name={Routes.Diary} component={DiaryScreen} />
      <DiaryStack.Screen
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
    </DiaryStack.Navigator>
  );
}

export type MealPlanStackParams = {
  [Routes.CustomizeMealPlan]: undefined;
  [Routes.MealPlan]: undefined;
};

export const MealPlanStack = createNativeStackNavigator<MealPlanStackParams>();

export function MealPlan() {
  return (
    <MealPlanStack.Navigator>
      <MealPlanStack.Screen
        name={Routes.CustomizeMealPlan}
        component={CustomizeMealPlanScreen}
        options={{ headerShown: false }}
      />
      <MealPlanStack.Screen
        name={Routes.MealPlan}
        component={MealPlanScreen}
        options={{ headerShown: false }}
        // options={{
        //   header: ({ navigation }) => (
        //     <View style={{ height: 80, backgroundColor: '#EDF1F9' }}>
        //       <Pressable
        //         onPress={() => navigation.goBack()}
        //         style={{ position: 'absolute', top: 60, left: 15 }}>
        //         <Ionicons name="chevron-back" size={36} color="#16277b" />
        //       </Pressable>
        //     </View>
        //   ),
        // }}
      />
    </MealPlanStack.Navigator>
  );
}

export type ProfileStackParams = {
  [Routes.Profile]: undefined;
  // [Routes.SavedMealPlans]: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

function Profile() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        // tabBarIcon: () => <View />,
      }}>
      <ProfileStack.Screen name={Routes.Profile} component={ProfileScreen} />
      {/* <ProfileStack.Screen
        name={Routes.SavedMealPlans}
        component={SavedMealPlans}
      /> */}
    </ProfileStack.Navigator>
  );
}

function Fab() {
  return <></>;
}

export type TabParams = {
  [Tabs.Home]: undefined;
  [Tabs.Diary]: undefined;
  [Tabs.Profile]: undefined;
  [Tabs.MealPlan]: undefined;
};

const Tab = createBottomTabNavigator<TabParams>();

const TabNavigator = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 100,
            // backgroundColor: '#5769c2',
            backgroundColor: '#4659b8',
          },
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#c7ccd5',
        }}

        // barStyle={{
        //   height: 100,
        //   // backgroundColor: '#EDF1F9',
        //   // backgroundColor: '#5769c2',
        //   width: '100%',
        // }}
        // shifting={true}
        // labeled={false}
      >
        <Tab.Screen
          name={Tabs.Home}
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="dashboard" size={30} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name={Tabs.Diary}
          component={Diary}
          options={{
            tabBarIcon: ({ color }) => (
              <MIcon name="book-open-page-variant" size={30} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name={Tabs.MealPlan}
          component={MealPlan}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-newspaper" size={30} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name={Tabs.Profile}
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <MIcon name="account-circle" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* <Tab.Screen
            name={Tabs.FAB}
            component={Fab}
            options={{
              tabBarIcon: ({ color }) => (
                <FAB
                  icon="plus"
                  style={{
                    position: 'absolute',
                    top: -20,
                    backgroundColor: '#626FB2',
                    borderRadius: 30,
                  }}
                  color="white"
                />
              ),
            }}
          /> */}

      {/* <FAB
        icon="plus"
        small
        style={{
          position: 'absolute',
          bottom: 50,
          left: '45%',
          borderRadius: 30,
          backgroundColor: '#626FB2',
        }}
        color="white"
      /> */}
    </>
  );
};

export default TabNavigator;
