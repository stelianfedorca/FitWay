import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Stacks, Tabs} from './Routes';
import TabNavigator from './TabNavigator';

export type RootStackParams = {
  [Stacks.Home]: {screens: Tabs} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name={Stacks.Home} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default HomeStack;
