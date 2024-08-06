import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Adjust path as needed
import homePageSlice from '@/features/homePage/homePageSlice';

export const store:any = configureStore({
  reducer: {
    auth: authReducer,
    homePage: homePageSlice,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
