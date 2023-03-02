import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type UserData = {};

export interface ProfileState {
  // email?: string | null;
  firstName?: string;
  // gender?: string;
  // age?: string;
  // startingWeight?: string;
  // height?: string;
  // activityLevel?: string;
  // goalWeight?: string;
  // isSurveyCompleted?: boolean;
  // tdee?: number;
  // food?: number;
  // exercise?: number;
  isSurveyCompleted?: boolean;
}

const initialState: ProfileState = {
  isSurveyCompleted: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsSurveyCompleted: (state, action: PayloadAction<ProfileState>) => {
      state.isSurveyCompleted = action.payload.isSurveyCompleted;
    },
    setFirstName: (state, action: PayloadAction<ProfileState>) => {
      state.firstName = action.payload.firstName;
    },
  },
});

export const { setIsSurveyCompleted, setFirstName } = profileSlice.actions;

export const selectIsSurveyCompleted = (state: RootState) =>
  state.profile.isSurveyCompleted;

export const selectFirstName = (state: RootState) => state.profile.firstName;

export default profileSlice.reducer;
