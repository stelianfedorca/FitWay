import {
  AnyAction,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  Reducer,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import loadingSlice from './slices/loadingSlice';
import mealPlanSlice from './slices/mealPlanSlice';
import searchSlice from './slices/searchSlice';
import foodSlice from './slices/foodSlice';
import diarySlice from './slices/diarySlice';
import dateSlice from './slices/dateSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['user', 'loading', 'search', 'food', 'diary', 'date'],
};

const combinedReducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  loading: loadingSlice,
  mealPlan: mealPlanSlice,
  search: searchSlice,
  food: foodSlice,
  diary: diarySlice,
  date: dateSlice,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/logout') {
    state = {} as RootState;
  }

  return combinedReducers(state, action);
};

const persistedProfileReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedProfileReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// infer the State types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// infer the Dispatch types from the store itself
export type AppDispatch = typeof store.dispatch;
