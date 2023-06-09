import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { RAPIDAPI_KEY, RAPIDAPI_HOST, RAPIDAPI_HOST_EDAMAM } from '@env';
import { FoodFirestore, Product } from '../types/types';
import {
  DAILY_LOGS_COLLECTION,
  DIARY_COLLECTION,
  LOGS_COLLECTION,
} from '../utils/consts';
import { format } from 'date-fns';

const SEARCH_PRODUCT_API =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search';

const SEARCH_PRODUCTS_EDAMAM =
  'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser';

/**
 * Search the product using the spoonacular API Search Grocery Products
 * @param search
 */
export async function searchProduct(search: string) {
  try {
    const response = await axios.get(SEARCH_PRODUCTS_EDAMAM, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST_EDAMAM,
      },
      params: {
        ingr: search,
        'nutrition-type': 'cooking',
        'category[0]': 'generic-foods',
        'health[0]': 'alcohol-free',
      },
    });

    return response.data.hints;
  } catch (error) {
    console.error('error is: ', error);
    return null;
  }
}

/**
 * Get the detailed information about the product with specified id
 * @param id the Product id
 */
export async function getProductInformation(id: number) {
  try {
    const response = await axios.get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${id}`,
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('error is: ', error);
    return null;
  }
}

export async function addFoodToDiary(userId: string, food: FoodFirestore) {
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  await firestore()
    .collection(DIARY_COLLECTION)
    .doc(userId)
    .collection(DAILY_LOGS_COLLECTION)
    .doc(currentDate)
    .collection(LOGS_COLLECTION)
    .doc(food.id)
    .set(food, { merge: true });
}
