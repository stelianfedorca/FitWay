import firestore from '@react-native-firebase/firestore';

import { FoodData } from '../stores/food';
import { MEALS_COLLECTION } from '../utils/consts';

export type MealData = Omit<FoodData, 'key'> & { type?: string };

export async function addMeal(meal: MealData) {
  try {
    await firestore().collection(MEALS_COLLECTION).doc('09-02-2023').set(meal);
  } catch (error) {
    console.log(error);
  }
}
