import create from 'zustand';

export enum FoodType {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
  snacks = 'snacks',
}

export type FoodData = {
  name?: string;
  manufacturer?: string;
  calories?: number;
  carbs?: number;
  fat?: number;
  protein?: number;
  servingSize?: number;
  numberOfServings?: number;
  key?: string;
  type?: FoodType;
};

export type FoodState = {
  food: FoodData[] | undefined;
  selectedFood: FoodData | undefined;
  setSelectedFood: (food: FoodData | undefined) => void;
  setFood: (food: FoodData[] | undefined) => void;
};

export const useFoodStore = create<FoodState>((set, get) => ({
  food: undefined,
  selectedFood: undefined,
  setFood: (food: FoodData[] | undefined) => set(() => ({ food })),
  setSelectedFood: (selectedFood: FoodData | undefined) =>
    set(() => ({ selectedFood })),
}));
