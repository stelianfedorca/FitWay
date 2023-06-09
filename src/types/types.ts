export type Profile = {
  email?: string | null;
  firstName?: string;
  gender?: string;
  age?: string;
  startingWeight?: string;
  height?: string;
  activityLevel?: string;
  goalWeight?: string;
  tdee?: number;
  caloricIntake: number;
  macros?: {
    carbs: number;
    fat: number;
    protein: number;
    carbsProcentage: number;
    fatProcentage: number;
    proteinProcentage: number;
  };
  macrosIntake?: {
    carbs: number;
    fat: number;
    protein: number;
  };
  exercise?: number;
  isSurveyCompleted: boolean;
};

export type User = {
  email: string;
  firstName: string;
  isSurveyCompleted: boolean;
  profile: Profile;
};

export interface Food {
  name: string;
  type: string;
  quantity: number;
  calories: number;
  image: string;
  foodId?: number | string;
}

export enum Macros {
  ENERC_KCAL = 'calories',
  PROCNT = 'protein',
  FAT = 'fat',
  CHOCDF = 'carbs',
}
export interface Product {
  food: {
    foodId: string;
    image: string;
    label: string;
    nutrients: {
      ENERC_KCAL: number;
      PROCNT: number;
      FAT: number;
      CHOCDF: number;
      // FIBTG: number;
    };
    brand: string;
  };
}

export interface FoodFirestore {
  id: string;
  name: string;
  image: string;
  brand: string;
  type: string;
  nutrition: Nutrition;
}

export type Nutrition = {
  caloricBreakdown?: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
  calories: number;
  fat: string | number;
  carbs: string | number;
  protein: string | number;
  servings: {
    number: number;
    size: number;
  };
};

export interface Meal {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  sourceUrl: string;
  servings: number;
}

// the meal plan for a day
export type MealPlanDayFirestore = {
  meals: Meal[];
  nutrients: {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
  };
};

export type MealPlanWeekFirestore = {
  meals: MealPlanDayFirestore[];
};

// export interface DetailedProductInformation extends Product {
//   nutrition: Nutrition;
//   brand: string;
// }
