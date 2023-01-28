import create from 'zustand';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { USERS_COLLECTION } from '../utils/consts';

export type UserStartingInformation = {
  startingWeight?: string;
  height?: string;
  activityLevel?: string;
};

export type UserData = {
  email: string | null;
  firstName: string;
  gender?: string;
  age?: string;
  startingWeight?: string;
  height?: string;
  activityLevel?: string;
  goalWeight?: string;
  isSurveyCompleted: boolean;
  tdee?: number;
  food?: number;
  exercise?: number;
};
// startingInformation?: UserStartingInformation;

export type ProfileState = {
  profile: UserData | undefined;
  setProfile: (profile: UserData | undefined) => void;
  refreshProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: undefined,

  setProfile: (profile: UserData | undefined) => set(() => ({ profile })),
  refreshProfile: async () => {
    const user = auth().currentUser;
    if (!user) return;

    const { setProfile } = get();
    const uid = user.uid;
    const profile = await firestore()
      .collection<UserData>(USERS_COLLECTION)
      .doc(uid)
      .get();
    const userData = profile.data();

    userData && setProfile(userData);
  },
}));
