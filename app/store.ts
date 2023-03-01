import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../components/Menu/menuSlice';
import { d3DataApi } from '../services/d3Data';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    [d3DataApi.reducerPath]: d3DataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(d3DataApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
