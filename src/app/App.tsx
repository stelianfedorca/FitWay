import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RootNavigator from '../navigators/RootNavigator';

export function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
