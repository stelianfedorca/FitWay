import firestore from '@react-native-firebase/firestore';
import { UserData } from '../stores/profile';
import { USERS_COLLECTION } from '../utils/consts';
import auth from '@react-native-firebase/auth';

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

export async function updateUserInFirestore(uid: string) {
  try {
    await firestore()
      .collection(USERS_COLLECTION)
      .doc(uid)
      .update({ isSurveyCompleted: true });
  } catch (error) {
    console.log(error);
  }
}
