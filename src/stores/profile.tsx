import auth from '@react-native-firebase/auth';
import create from 'zustand';

export type UserData = {
  firstName?: string;
  email: string | null;
  isSurveyCompleted: boolean;
  gender?: string;
  age?: string;
  startingWeight?: string;
  height?: string;
  goalWeight?: string;
  activityLevel?: string;
};

export type ProfileState = {
  profile: UserData | undefined;
  setProfile: (profile: UserData | undefined) => void;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: undefined,
  setProfile: (profile: UserData | undefined) => set(() => ({ profile })),
}));
