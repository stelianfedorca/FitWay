import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/home';
import { ProfileScreen } from '../screens/profile';
import { Routes, Tabs } from './Routes';
import { TabBar } from '../components/TabBar';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useWindowDimensions } from 'react-native';
import { FAB } from 'react-native-paper';

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

function Fab() {
  return <></>;
}

export type TabParams = {
  [Tabs.Home]: undefined;
  [Tabs.Profile]: undefined;
};

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Tab.Navigator
        barStyle={{
          height: 100,
          backgroundColor: '#EDF1F9',
          width: '100%',
        }}
        shifting={true}
        labeled={false}>
        <Tab.Screen
          name={Tabs.Home}
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="dashboard" size={32} color={color} />
            ),
          }}
        />

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
        <Tab.Screen
          name={Tabs.Profile}
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <MIcon name="account-circle" size={32} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      <FAB
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
      />
    </>
  );
};

export default TabNavigator;
