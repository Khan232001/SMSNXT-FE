import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    activity: [],
    subscriptions: [],
    messageTemplates: [],
    campaigns: [],
  },
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
