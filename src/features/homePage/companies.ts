// src/features/companies/companySlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for company data
interface Company {
  id: string;
  name: string;
  // Add other company properties as needed
}

interface CompaniesState {
  companies: Company[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: CompaniesState = {
  companies: [],
  loading: 'idle',
  error: null,
};

// Create the async thunk
export const fetchCompanies = createAsyncThunk<Company[]>(
  'companies/fetchCompanies',
  async () => {
    const response = await axios.get('https://esptest.mscorpres.net/fetch/companyList');
    console.log(response.data,"companyData")
    return response.data;
  }
);

// Create the slice
const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch companies';
      });
  },
});

export default companiesSlice.reducer;
