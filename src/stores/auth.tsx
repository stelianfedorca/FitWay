import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import create from 'zustand';
export type AuthState = {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: user => set(() => ({ user })),
  logout: async () => {
    const { setUser } = get();
    setUser(null);
    await auth().signOut();
  },
}));
