import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RootNavigator from '../navigators/RootNavigator';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import { firebase } from '@react-native-firebase/auth';
import { useAuthStore, useProfileStore } from '../stores';

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
  const onAuthStateChanged = useAuthStore(state => state.onAuthStateChanged);

  useEffect(() => {
    const subscriber = firebase
      .app()
      .auth()
      .onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);
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
