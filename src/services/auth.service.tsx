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
  await firestore().collection(USERS_COLLECTION).doc(uid).set({
    email,
    firstName,
    isSurveyCompleted,
    tdee,
  });
}

export async function signOut() {
  await auth().signOut();
}
