// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const baseLink = 'https://esptest.mscorpres.net/';

// export interface Department {
//   text: string;
//   value: string;
// }

// export interface Designations {
//   text: string;
//   value: string;
// }

// interface AdminPage {
//   departments: Department[] | null;
//   designations: Designations[] | null;
// }

// const initialState: AdminPage = {
//   departments: [],
//   designations: [],
// };

// export const fetchDepartments = createAsyncThunk<Department, void>(
//     'homePage/fetchCompanies',
//     async (_, { rejectWithValue }) => {
//       try {
//         const response = await axios.get<Department>(
//           `${baseLink}fetch/departments`,
//         );
//         return response.data;
//       } catch (error) {
//         return rejectWithValue('Failed to fetch departments');
//       }
//     },
//   );

//   export const fetchDesignations = createAsyncThunk<Designations, void>(
//     'homePage/fetchCompanies',
//     async (_, { rejectWithValue }) => {
//       try {
//         const response = await axios.get<Designations>(
//           `${baseLink}fetch/designations`,
//         );
//         return response.data;
//       } catch (error) {
//         return rejectWithValue('Failed to fetch designations');
//       }
//     },
//   );

//   const homePageSlice = createSlice({
//     name: 'homePage',
//     initialState,
//     reducers: {
//       clearDepartment(state) {
//         state.departments = [];
//       },
//       clearDesignation(state) {
//         state.designations = [];
//       },
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchDepartments.pending, (state) => {
//         })
//         .addCase(fetchDepartments.fulfilled, (state, action) => {
//           state.departments = action.payload;
//         })
//         .addCase(fetchDepartments.rejected, (state, action) => {
//         })
//         .addCase(fetchDesignations.pending, (state) => {
//           state.loading = 'loading';
//           state.error = null;
//         })
//         .addCase(fetchDesignations.fulfilled, (state, action) => {
//           state.designations = action.payload;
//           state.error = null;
//         })
//         .addCase(fetchDesignations.rejected, (state, action) => {
//         });
//     },
//   });

//   // Export actions and reducer
//   export const {  } =
//     homePageSlice.actions;
//   export default homePageSlice.reducer;

// adminPageSlice.ts
import { orshAxios } from '@/axiosIntercepter';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseLink = 'https://esptest.mscorpres.net/';

interface AddCompanyPayload {
  email: string;
  mobile: string;
  name: string;
  panNo: string;
  website: string;
}

interface AdminPageState {
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminPageState = {
  loading: 'idle',
  error: null,
};

// Define the async thunk for adding a company
export const addCompany = createAsyncThunk(
  'adminPage/addCompany',
  async (companyData: AddCompanyPayload, { rejectWithValue }) => {
    try {
      const response = await orshAxios.post(
        baseLink + 'company/add',
        companyData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to add company');
    }
  },
);

// Create the slice
const adminPageSlice = createSlice({
  name: 'adminPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCompany.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(addCompany.fulfilled, (state) => {
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default adminPageSlice.reducer;
