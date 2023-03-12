import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Goal = {
  calory: number;
  'gain weight': string;
};

export type Goals = Record<string, Goal | number>;

export type CaloriesGoals = {
  bmr: number;
  goals: Goals;
};

export interface ProfileState {
  email?: string | null;
  firstName?: string;
  gender?: string;
  age?: string;
  startingWeight?: string;
  height?: string;
  activityLevel?: string;
  goalWeight?: string;
  tdee?: number;
  food?: number;
  exercise?: number;
  isSurveyCompleted?: boolean;
  caloriesGoals?: CaloriesGoals;
}

const initialState: Partial<ProfileState> = {
  isSurveyCompleted: true,
  tdee: 0,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      console.log('state: ', state);
      console.log('payload: ', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    setIsSurveyCompleted: (state, action: PayloadAction<ProfileState>) => {
      state.isSurveyCompleted = action.payload.isSurveyCompleted;
    },
    setFirstName: (state, action: PayloadAction<ProfileState>) => {
      state.firstName = action.payload.firstName;
    },
    setCaloriesGoals: (state, action: PayloadAction<ProfileState>) => {
      state.caloriesGoals = action.payload.caloriesGoals;
    },
    setTdee: (state, action: PayloadAction<ProfileState>) => {
      console.log('actionpayload: ', action.payload.tdee);
      state.tdee = action.payload.tdee;
    },
  },
});

export const {
  setProfile,
  setIsSurveyCompleted,
  setFirstName,
  setTdee,
  setCaloriesGoals,
} = profileSlice.actions;

export const selectIsSurveyCompleted = (state: RootState) =>
  state.profile.isSurveyCompleted;

export const selectFirstName = (state: RootState) => state.profile.firstName;

export const selectProfile = (state: RootState) => state.profile;

export const selectCaloriesGoals = (state: RootState) => state.caloriesGoals;

export const selectTdee = (state: RootState) => state.profile.tdee;

export default profileSlice.reducer;
