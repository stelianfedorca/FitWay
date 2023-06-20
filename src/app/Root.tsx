import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RootNavigator from '../navigators/RootNavigator';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import { firebase } from '@react-native-firebase/auth';
import { useAuthStore, useProfileStore } from '../stores';
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from 'react-redux';
import { login } from '../redux/slices/userSlice';

import firestore from '@react-native-firebase/firestore';
import {
  DAILY_LOGS_COLLECTION,
  DIARY_COLLECTION,
  LOGS_COLLECTION,
  USERS_COLLECTION,
} from '../utils/consts';
import {
  ProfileState,
  selectIsSurveyCompleted,
  setFirstName,
  setIsSurveyCompleted,
  setProfile,
} from '../redux/slices/profileSlice';
// import { UserProfile } from '../screens/survey/SurveyScreen';
import AuthStack from '../navigators/AuthStack';

import auth from '@react-native-firebase/auth';

import database from '@react-native-firebase/database';
import { FoodFirestore, User } from '../types/types';
import { format } from 'date-fns';

export function Root() {
  // const onAuthStateChanged = useAuthStore(state => state.onAuthStateChanged);
  const dispatch = useDispatch();
  const survey = useSelector(selectIsSurveyCompleted);

  const currentUser = firebase.app().auth().currentUser;
  const currentDate = format(new Date(), 'dd-MM-yyyy');

  useEffect(() => {
    const subscriber = firebase
      .app()
      .auth()
      .onAuthStateChanged(async user => {
        if (user) {
          // check if it is a newly created user

          //FIXME: Find a way to check if user is newly created
          //PROBLEM: When the user creates an account and goes through the survey, closes the app and enters again, it brings him back to the survey (not expected)
          //CAUSE: the condition for checking if the user is newly created consists of comparing the date between account creation and latest login date (it checks for last 3 minutes or so)
          // const isNewUser =
          //   user.metadata.creationTime === user.metadata.lastSignInTime;
          async function refreshProfile() {
            const userId = user?.uid;
            const userFound = await firestore()
              .collection<Partial<User>>(USERS_COLLECTION)
              .doc(userId)
              .get();
            const data = userFound.data();

            if (data) {
              dispatch(
                setProfile({
                  isSurveyCompleted: data.isSurveyCompleted ?? false,
                  firstName: data.firstName ?? '',
                  email: data.email ?? '',
                  caloricIntake: data.profile?.caloricIntake ?? 0,
                  tdee: data.profile?.tdee ?? 0,
                  macros: {
                    carbs: data.profile?.macros?.carbs ?? 0,
                    fat: data.profile?.macros?.fat ?? 0,
                    protein: data.profile?.macros?.protein ?? 0,
                    fatProcentage: data.profile?.macros?.fatProcentage ?? 0,
                    proteinProcentage:
                      data.profile?.macros?.proteinProcentage ?? 0,
                    carbsProcentage: data.profile?.macros?.carbsProcentage ?? 0,
                  },
                  macrosIntake: data.profile?.macrosIntake ?? {
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                  },
                  startingWeight: data.profile?.startingWeight ?? '70',
                  goalWeight: data.profile?.goalWeight ?? '70',
                  age: data.profile?.age ?? '18',
                  height: data.profile?.height ?? '180',
                }),
              );
            }
          }
          //FIXME: Nu cred ca mai trebuie
          //FIXME: Find a way to check if user is newly created
          //PROBLEM: When the user creates an account and goes through the survey, closes the app and enters again, it brings him back to the survey (not expected)
          //CAUSE: the condition for checking if the user is newly created consists of comparing the date between account creation and latest login date (it checks for last 3 minutes or so)
          // if (isNewUser) {
          //   dispatch(setIsSurveyCompleted({ isSurveyCompleted: false }));
          // }
          await refreshProfile();
          dispatch(login({ email: user.email, uid: user.uid }));
        }
      });

    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   firestore()
  //     .collection(DIARY_COLLECTION)
  //     .doc(currentUser?.uid)
  //     .collection(DAILY_LOGS_COLLECTION)
  //     .doc(currentDate)
  //     .collection(LOGS_COLLECTION)
  //     .onSnapshot(documentSnapshot => {
  //     });
  // }, []);

  //FIXME:
  //PROBLEM: this listener is not updated on time
  // if I already signed up and then I log out and immediately I signed up again with another account,
  // the survey doesn't show up because it reads from firestore collection with the id from the previous account

  // listen to realtime updates on user document in firestore
  useEffect(() => {
    if (currentUser?.uid) {
      firestore()
        .collection(USERS_COLLECTION)
        .doc(currentUser?.uid)
        .onSnapshot(documentSnapshot => {
          const data = documentSnapshot.data() as User;
          const macrosIntake = data.profile?.macrosIntake ?? {
            fat: 0,
            protein: 0,
            carbs: 0,
          };
          dispatch(
            setProfile({
              caloricIntake: data.profile?.caloricIntake ?? 0,
              macrosIntake: macrosIntake,
            }),
          );
        });
    }
  }, [currentUser?.uid]);

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
