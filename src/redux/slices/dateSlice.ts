import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodFirestore, Product } from '../../types/types';
import { RootState } from '../store';

export interface DateState {
  currentDate: string;
}

const initialState = {
  currentDate: '',
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
  },
});

export const { setCurrentDate } = dateSlice.actions;

export const selectCurrentDate = (state: RootState): string =>
  state.date.currentDate;

export default dateSlice.reducer;
