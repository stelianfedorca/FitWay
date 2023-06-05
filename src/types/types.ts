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
  exercise?: number;
  isSurveyCompleted: boolean;
};

export type User = {
  profile: Profile;
  isSurveyCompleted: boolean;
};

export type Food = {
  name: string;
  type: string;
  quantity: number;
  calories: number;
  image: string;
  foodId?: number | string;
};
