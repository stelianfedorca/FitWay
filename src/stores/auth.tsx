import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import create from 'zustand';

import { useProfileStore } from './profile';

export type AuthState = {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  logout: () => void;
  onAuthStateChanged: (user: FirebaseAuthTypes.User | null) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: user => set(() => ({ user })),
  logout: async () => {
    const { setProfile } = useProfileStore.getState();
    const { setUser } = get();
    setUser(null);
    setProfile(undefined);
    await auth().signOut();
  },
  onAuthStateChanged: async (currentUser: FirebaseAuthTypes.User | null) => {
    const { setUser } = get();
    const { refreshProfile } = useProfileStore.getState();
    console.log('??');
    await refreshProfile();
    setUser(currentUser);
  },
}));
