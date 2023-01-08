import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens/home';
import {ProfileScreen} from '../screens/profile';
import {Routes, Tabs} from './Routes';
import {TabBar} from '../components/TabBar';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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

export type ProfileStackParams = {
  [Routes.Profile]: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

function Profile() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name={Routes.Profile} component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

export type TabParams = {
  [Tabs.Home]: undefined;
  [Tabs.Profile]: undefined;
};

const Tab = createBottomTabNavigator<TabParams>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={Tabs.Home}
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <MIcon name="home" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Tabs.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <MIcon name="account-circle" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
