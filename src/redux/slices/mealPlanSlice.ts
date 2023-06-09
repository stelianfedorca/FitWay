import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Meal {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  sourceUrl: string;
  servings: number;
}

// the meal plan for a day
export type MealPlanDay = {
  meals: Meal[];
  nutrients: {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
  };
};

// the meal plan for a week
export type MealPlanWeek = {};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type MealPlanDetails = {
  sourceName?: string;
  title: string;
  id: number;
  image: string;
  readyInMinutes: number;
  servings: number;
  nutrition: {
    nutrients: Nutrient[];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
  diets: string[];
  dishTypes: string[];
};

export interface MealPlanState {
  mealPlanPerDay?: MealPlanDay;
  mealPlanPerWeek?: MealPlanWeek;
  selectedTargetCalories?: number;
}

const initialState: Partial<MealPlanState> = {};

export const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    setMealPlan: (state, action: PayloadAction<MealPlanState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setMealPlanPerDay: (state, action: PayloadAction<MealPlanDay>) => {
      state.mealPlanPerDay = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setMealPlan, setMealPlanPerDay, reset } = mealPlanSlice.actions;

export const selectMealPlanPerDay = (state: RootState): MealPlanDay =>
  state.mealPlan.mealPlanPerDay;

export const selectMealPlanPerWeek = (state: RootState) =>
  state.mealPlan.mealPlanPerWeek;

export const selectMeal = (state: RootState) => state.mealplan;

export default mealPlanSlice.reducer;
