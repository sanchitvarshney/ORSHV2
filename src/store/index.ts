import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Adjust path as needed
import companiesSlice from '@/features/homePage/companies';

export const store:any = configureStore({
  reducer: {
    auth: authReducer,
    companies: companiesSlice,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
