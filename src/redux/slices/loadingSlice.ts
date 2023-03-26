import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boolean } from 'yup';
import { RootState } from '../store';

export interface LoadingState {
  loading: boolean;
}

const initialState = {
  loading: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loading.loading;

export default loadingSlice.reducer;
