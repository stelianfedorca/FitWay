import { RAPIDAPI_KEY, RAPIDAPI_HOST } from '@env';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {
  MealPlanDay,
  MealPlanDetails,
  MealPlanWeek,
} from '../redux/slices/mealPlanSlice';
import { MealPlanDayFirestore } from '../types/types';
import {
  DAY_PLAN_COLLECTION,
  DIARY_COLLECTION,
  MEALS_COLLECTION,
  PLANS_COLLECTION,
  TimeFrame,
} from '../utils/consts';

export const getMealPlan = async (
  timeFrame: TimeFrame,
  caloricTarget: number,
  dietType?: string,
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
          diet: dietType ?? '',
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

export async function addMealPlanToFirestore(
  userId: string,
  meal: MealPlanDay,
) {
  try {
    const data = await firestore()
      .collection(PLANS_COLLECTION)
      .doc(userId)
      .collection(DAY_PLAN_COLLECTION)
      .add(meal);

    if (data) return true;

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getSavedMealPlansFirestore(
  uid: string,
): Promise<MealPlanDayFirestore[]> {
  try {
    const mealPlansQuerySnapshot = await firestore()
      .collection(PLANS_COLLECTION)
      .doc(uid)
      .collection(DAY_PLAN_COLLECTION)
      .get();

    const data = mealPlansQuerySnapshot.docs.map(mealPlanDoc => {
      const mealPlanDayData = mealPlanDoc.data() as MealPlanDayFirestore;
      return mealPlanDayData;
    });

    // const data: MealPlanDayFirestore[] = [];

    // mealPlansQuerySnapshot.docs.forEach(mealPlanDoc => {
    //   console.log('doc: ', mealPlanDoc);
    //   const mealPlanDayData = mealPlanDoc.data() as MealPlanDayFirestore;
    //   data.push(mealPlanDayData);
    // });

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
