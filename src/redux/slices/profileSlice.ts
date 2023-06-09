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
  caloricIntake?: number;
  macros?: {
    carbs: number;
    fat: number;
    protein: number;
    carbsProcentage: number;
    fatProcentage: number;
    proteinProcentage: number;
  };
  exercise?: number;
  isSurveyCompleted?: boolean;
  caloriesGoals?: CaloriesGoals;
}

const initialState: Partial<ProfileState> = {
  isSurveyCompleted: false,
  tdee: 0,
  caloricIntake: 0,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setIsSurveyCompleted: (state, action: PayloadAction<boolean>) => {
      state.isSurveyCompleted = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setCaloriesGoals: (state, action: PayloadAction<ProfileState>) => {
      state.caloriesGoals = action.payload.caloriesGoals;
    },
    setTdee: (state, action: PayloadAction<number>) => {
      state.tdee = action.payload;
    },

    addCaloricIntake: (state, action: PayloadAction<number>) => {
      if (state.caloricIntake) {
        state.caloricIntake += action.payload;
      }
    },
  },
});

export const {
  setProfile,
  setIsSurveyCompleted,
  setFirstName,
  setTdee,
  setCaloriesGoals,
  addCaloricIntake,
} = profileSlice.actions;

export const selectIsSurveyCompleted = (state: RootState) =>
  state.profile.isSurveyCompleted;

export const selectFirstName = (state: RootState) => state.profile.firstName;

export const selectProfile = (state: RootState): ProfileState => state.profile;

export const selectCaloriesGoals = (state: RootState) => state.caloriesGoals;

export const selectTdee = (state: RootState): number => state.profile.tdee;

export const selectCaloricIntake = (state: RootState) =>
  state.profile.caloricIntake;

export default profileSlice.reducer;
