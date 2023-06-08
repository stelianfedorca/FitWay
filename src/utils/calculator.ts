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
  tdee?: number,
  exercise?: number,
) {
  if (tdee === undefined) return 0;

  return tdee - caloricIntake + (exercise ?? 0);
}

export function calculateBMI(weight: number, height: number) {
  return (weight / (((height / 100) * height) / 100)).toFixed(1);
}

export function calculateCalories<T>(data: Array<T>) {}
