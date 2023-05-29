import { RAPIDAPI_HOST, RAPIDAPI_KEY } from '@env';
import axios from 'axios';
import {
  MealPlanDay,
  MealPlanDetails,
  MealPlanWeek,
} from '../redux/slices/mealPlanSlice';
import { TimeFrame } from '../utils/consts';

export const getMealPlan = async (
  timeFrame: TimeFrame,
  caloricTarget: number,
): Promise<MealPlanDay | null> => {
  try {
    const res = await axios.get(
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
        params: {
          timeFrame: timeFrame,
          targetCalories: caloricTarget,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('error is: ', error);
    return null;
  }
};

// calls the Get Recipe Information
export const getMealDetails = async (
  id: number,
): Promise<MealPlanDetails | null> => {
  try {
    console.log('...@@@');
    const res = await axios.get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
        params: {
          includeNutrition: 'true',
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('error is: ', error);
    return null;
  }
};
