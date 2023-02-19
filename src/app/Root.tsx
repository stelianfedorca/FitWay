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
import AuthStack from '../navigators/AuthStack';

import auth from '@react-native-firebase/auth';

export function Root() {
  const onAuthStateChanged = useAuthStore(state => state.onAuthStateChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firebase
      .app()
      .auth()
      .onAuthStateChanged(async user => {
        if (user) {
          // check if it is a newly created user
          const isNewUser =
            user.metadata.creationTime === user.metadata.lastSignInTime;

          isNewUser &&
            dispatch(setIsSurveyCompleted({ isSurveyCompleted: false }));
          console.log('se apeleaza dupa sign in');
          async function refreshProfile() {
            // const userId = user?.uid;
            // const userProfile = await firestore()
            //   .collection<UserProfile>(USERS_COLLECTION)
            //   .doc(userId)
            //   .get();
            // const data = userProfile.data() as UserProfile;
            // dispatch(
            //   setIsSurveyCompleted({
            //     isSurveyCompleted: false,
            //   }),
            // );
          }
          // refreshProfile();
          dispatch(login({ email: user.email, uid: user.uid }));
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
