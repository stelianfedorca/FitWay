import firestore from '@react-native-firebase/firestore';
import { UserData } from '../stores/profile';
import { USERS_COLLECTION } from '../utils/consts';

export async function createUserInFirestore(
  uid: string,
  firstName: string,
  email: string,
  isSurveyCompleted: boolean,
  tdee?: number,
) {
  await firestore().collection(USERS_COLLECTION).doc(uid).set({
    email,
    firstName,
    isSurveyCompleted,
    tdee,
  });
}
