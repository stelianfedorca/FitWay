import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RootNavigator from '../navigators/RootNavigator';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import { firebase } from '@react-native-firebase/auth';
import { useAuthStore, useProfileStore } from '../stores';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';

import firestore from '@react-native-firebase/firestore';
import { USERS_COLLECTION } from '../utils/consts';
import { setIsSurveyCompleted } from '../redux/slices/profileSlice';
import { UserProfile } from '../screens/survey/SurveyScreen';

export function Root() {
  const onAuthStateChanged = useAuthStore(state => state.onAuthStateChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firebase
      .app()
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          async function refreshProfile() {
            const userId = user?.uid;
            const userProfile = await firestore()
              .collection(USERS_COLLECTION)
              .doc(userId)
              .get();

            const data = userProfile.data() as UserProfile;
            dispatch(
              setIsSurveyCompleted({
                isSurveyCompleted: data.isSurveyCompleted,
              }),
            );
          }
          refreshProfile();
          dispatch(login({ email: user.email, uid: user.uid }));
        } else {
          dispatch(
            setIsSurveyCompleted({
              isSurveyCompleted: false,
            }),
          );
        }
      });

    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
