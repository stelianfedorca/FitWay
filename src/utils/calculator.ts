import { current } from '@reduxjs/toolkit';
import { FoodFirestore } from '../types/types';

export type CalculatorProps = {
  weight: number;
  height: number;
  age: number;
};

// export enum ActivityMultiplier {
//   'Sedentary' = 1.2,
//   'Lightly Active' = 1.375,
//   'Moderately Active' = 1.55,
//   'Very Active' = 1.9,
// }

// export enum ActivityLevel {
//   Sedentary = 'Sedentary',
//   LIGHTLY_ACTIVE = 'Lightly Active',
//   MODERATELY_ACTIVE = 'Moderately Active',
//   VERY_ACTIVE = 'Very Active',
// }

interface ActivityLevelMultiplier {
  value: number;
}
export type ActivityLevelKeys =
  | 'Sedentary'
  | 'Lightly Active'
  | 'Moderately Active'
  | 'Very Active';

const activityLevel: Record<ActivityLevelKeys, ActivityLevelMultiplier> = {
  Sedentary: { value: 1.2 },
  'Lightly Active': { value: 1.375 },
  'Moderately Active': { value: 1.55 },
  'Very Active': { value: 1.9 },
};

export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: string,
) => {
  const resultForMale = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
  const resultForFemale = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  if (gender === 'Male') {
    return resultForMale;
  }

  return resultForFemale;
};

export const calculateTDEE = (
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: number,
) => {
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = Number((bmr * activityLevel).toFixed(0));
  return tdee;
};

export function getRemainingCalories(
  caloricIntake: number,
  tdee: number,
  exercise?: number,
) {
  return tdee - caloricIntake + (exercise ?? 0);
}

export function getBMICategory(bmi: number) {
  if (bmi < 18.5) return 'UnderWeight';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal';
  if (bmi >= 25 && bmi <= 29.9) return 'Overweight';

  return 'Obesity';
}

export function calculateBMI(weight: number, height: number) {
  const bmiValue = (weight / (((height / 100) * height) / 100)).toFixed(1);
  const bmiCategory = getBMICategory(Number(bmiValue));

  return {
    bmiValue: bmiValue,
    bmiCategory: bmiCategory,
  };
}

export function calculateCaloriesByServing(calories: number, quantity: number) {
  return Math.round((quantity * calories) / 100);
}

export function calculateCalories(data: FoodFirestore[]): number {
  const totalCalories =
    data.length > 0
      ? data.reduce((acc, currentItem) => {
          if (currentItem.isMeal) {
            return acc + currentItem.nutrition.calories;
          } else {
            return (
              acc +
              calculateCaloriesByServing(
                currentItem.nutrition.calories,
                currentItem.nutrition.servings.size,
              )
            );
          }
        }, 0)
      : 0;

  return Math.round(totalCalories);
}
export function calculateMacronutrientsByServing(
  macronutrient: number,
  quantity: number,
) {
  return Math.round((quantity * macronutrient) / 100);
}

// trb modificate
export function calculateTotalFat(diaryFood: FoodFirestore[]) {
  return diaryFood.reduce((acc, item) => {
    return (
      acc +
      calculateMacronutrientsByServing(
        Number(item.nutrition.fat),
        item.nutrition.servings.size,
      )
    );
  }, 0);
}
export function calculateTotalProtein(diaryFood: FoodFirestore[]) {
  return diaryFood.reduce((acc, item) => {
    return (
      acc +
      calculateMacronutrientsByServing(
        Number(item.nutrition.protein),
        item.nutrition.servings.size,
      )
    );
  }, 0);
}
export function calculateTotalCarbs(diaryFood: FoodFirestore[]) {
  return diaryFood.reduce((acc, item) => {
    return (
      acc +
      calculateMacronutrientsByServing(
        Number(item.nutrition.carbs),
        item.nutrition.servings.size,
      )
    );
  }, 0);
}

export function calculateGramsFromPercentage(
  procent: number,
  macroMultiplier: number,
  calories: number,
) {
  return Math.round(((procent / 100) * calories) / macroMultiplier);
}

export function getBMI() {}
