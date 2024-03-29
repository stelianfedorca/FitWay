import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RootNavigator from '../navigators/RootNavigator';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import { firebase } from '@react-native-firebase/auth';
import { useAuthStore, useProfileStore } from '../stores';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';

import { store } from '../redux/store';
import { Root } from './Root';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs(true);

const persistor = persistStore(store);
export function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
