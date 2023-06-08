import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';
import { RootState } from '../store';

export interface SearchState {
  food: Product;
}

const initialState = {
  food: {},
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFood: (state, action: PayloadAction<Product>) => {
      state.food = action.payload;
    },
  },
});

export const { setFood } = foodSlice.actions;

export const selectFood = (state: RootState): Product => state.food.food;

export default foodSlice.reducer;
