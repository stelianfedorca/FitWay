import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';

export interface UserState {
  email: string | null;
  firstName?: string | null;
  uid: string | null;
}

const initialState: UserState = {
  email: null,
  firstName: null,
  uid: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.firstName = action.payload.firstName;
    },
    signup: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.firstName = action.payload.firstName;
    },
    logout: state => {
      //
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

// selectors
export const selectEmail = (state: RootState) => state.user.email;
export const selectUid = (state: RootState) => state.user.uid;

export default userSlice.reducer;
