export enum GENDER {
  'Male',
  'Female',
}

export enum ACTIVITY_LEVEL {
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
}

// COLLECTIONS
export const USERS_COLLECTION = 'users';
export const DIARY_COLLECTION = 'diary';

export const FOOD_COLLECTION = 'food';
export const MEALS_COLLECTION = 'meals';

// INNERCOLLECTIONS
export const DAILY_LOGS_COLLECTION = 'daily_logs';
export const PROFILE_COLLECTION = 'profile';
export const LOGS_COLLECTION = 'logs';

export const CARBS_CALORIES_PER_1G = 4;
export const FAT_CALORIES_PER_1G = 9;
export const PROTEIN_CALORIES_PER_1G = 4;

export type TimeFrame = 'day' | 'week';
