import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../api/constants';

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
