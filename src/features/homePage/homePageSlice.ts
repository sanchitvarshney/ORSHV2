import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const baseLink = 'https://esptest.mscorpres.net/';

// Define types
export interface Company {
  text: string;
  value: string;
}

interface CompanyResponse {
  data: Company[];
  status: string;
  success: boolean;
}

export interface SearchCompany {
  name: string;
  panNo: string;
  website: string;
  createdOn: string;
  updatedOn: string;
}

interface HomePageState {
  companies: Company[] | null;
  searchCompanies: SearchCompany[] | null;
  selectedCompany: Company | null;
  error: string | null;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state
const initialState: HomePageState = {
  companies: [],
  searchCompanies: [],
  selectedCompany: null,
  error: null,
  loading: 'idle',
};

// Async thunk for fetching companies
export const fetchCompanies = createAsyncThunk<CompanyResponse, void>(
  'homePage/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CompanyResponse>(
        `${baseLink}fetch/companyList`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch companies');
    }
  },
);

// Ensure that your API response data has unique identifiers
export const fetchSearchCompanies = createAsyncThunk<SearchCompany[]>(
  'homePage/searchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseLink}company/company?search=`);
      return response?.data?.data; // Ensure data has unique identifiers
    } catch (error) {
      return rejectWithValue('Failed to fetch companies');
    }
  },
);

// Create the slice
const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    selectCompany(state, action: { payload: Company }) {
      state.selectedCompany = action.payload;
    },
    clearSelectedCompany(state) {
      state.selectedCompany = null;
    },
    clearCompanyError(state) {
      state.error = null;
    },
    clearSearchCompanies(state) {
      state.searchCompanies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.companies = action.payload.data;
        state.error = null;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchSearchCompanies.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchSearchCompanies.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.searchCompanies = action.payload;
        state.error = null;
      })
      .addCase(fetchSearchCompanies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { selectCompany, clearSelectedCompany, clearCompanyError } =
  homePageSlice.actions;
export default homePageSlice.reducer;
