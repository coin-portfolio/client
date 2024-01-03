import { combineReducers, configureStore, PayloadAction } from '@reduxjs/toolkit';

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({});
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
