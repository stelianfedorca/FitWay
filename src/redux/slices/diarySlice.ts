import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodFirestore, Product } from '../../types/types';
import { RootState } from '../store';

export interface SearchState {
  diaryFood: FoodFirestore[];
}

const initialState = {
  diaryFood: {},
};

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setDiaryFood: (state, action: PayloadAction<FoodFirestore[]>) => {
      state.diaryFood = action.payload;
    },
  },
});

export const { setDiaryFood } = diarySlice.actions;

export const selectDiaryFood = (state: RootState): FoodFirestore[] =>
  state.diary.diaryFood;

export default diarySlice.reducer;
