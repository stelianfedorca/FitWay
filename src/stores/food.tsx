import create from 'zustand';

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
};

export type FoodState = {
  food: FoodData[] | undefined;
  setFood: (food: FoodData[] | undefined) => void;
};

export const useFoodStore = create<FoodState>((set, get) => ({
  food: undefined,
  setFood: (food: FoodData[] | undefined) => set(() => ({ food })),
}));
