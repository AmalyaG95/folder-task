import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import counterReducer from '../features/counter/counterSlice';
import addFormReducer from '../features/addForm/addFormSlice';
import singleFileReducer from '../features/singleFile/singleFileSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    counter: counterReducer,
    addForm: addFormReducer,
    singleFile: singleFileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
