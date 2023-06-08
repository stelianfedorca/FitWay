import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boolean } from 'yup';
import { RootState } from '../store';

export interface SearchState {
  search: string;
}

const initialState = {
  search: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export const selectSearch = (state: RootState): string => state.search.search;

export default searchSlice.reducer;
