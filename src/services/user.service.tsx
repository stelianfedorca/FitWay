import firestore from '@react-native-firebase/firestore';
import { UserData } from '../stores/profile';
import { PROFILE_COLLECTION, USERS_COLLECTION } from '../utils/consts';
import auth from '@react-native-firebase/auth';
import { Profile, User } from '../types/types';

export async function createUserInFirestore(
  email: string,
  uid: string,
  isSurveyCompleted: boolean,
  firstName?: string,
  tdee?: number,
) {
  try {
    await firestore().collection(USERS_COLLECTION).doc(uid).set({
      email,
      firstName,
      isSurveyCompleted,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  await auth().signOut();
}

export async function updateUserInFirestore(
  uid: string,
  updateObj: Partial<User>,
) {
  try {
    await firestore().collection(USERS_COLLECTION).doc(uid).update(updateObj);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserFirestore(uid: string) {
  try {
    await firestore().collection(USERS_COLLECTION).doc(uid);
  } catch (error) {
    console.log(error);
  }
}

export async function updateCaloriesIntake(
  uid: string,
  updatedCaloricIntake: number,
) {
  try {
    await firestore()
      .collection(USERS_COLLECTION)
      .doc(uid)
      .update({ 'profile.caloricIntake': updatedCaloricIntake });
  } catch (error) {
    console.log(error);
  }
}

export async function updateMacrosIntake(
  uid: string,
  macros: { fat: number; protein: number; carbs: number },
) {
  try {
    await firestore()
      .collection(USERS_COLLECTION)
      .doc(uid)
      .update({
        'profile.macrosIntake.fat': macros.fat,
        'profile.macrosIntake.protein': macros.protein,
        'profile.macrosIntake.carbs': macros.carbs,
      });
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfileInFiresotore(
  uid: string,
  updateObj: Partial<Profile>,
) {
  await firestore()
    .collection(USERS_COLLECTION)
    .doc(uid)
    .set({ profile: updateObj }, { merge: true });
}
