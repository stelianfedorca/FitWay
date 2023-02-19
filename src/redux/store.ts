import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';

const combinedReducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/logout') {
    state = {} as RootState;
  }

  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// infer the State types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// infer the Dispatch types from the store itself
export type AppDispatch = typeof store.dispatch;
