import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RootNavigator from '../navigators/RootNavigator';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   version: 3,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#3498db',
//     secondary: '#f1c40f',
//     tertiary: '#a1b2c3',
//     tertiaryContainer: 'red',
//     primaryContainer: 'red',
//   },
// };
export function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
