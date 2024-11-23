import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import planReducer from './slices/planSlice';
import userReducer from './slices/userSlice';
import campaignReducer from './slices/campaignSlice';
import reportReducer from './slices/reportSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    user: userReducer,
    campaigns: campaignReducer,
    reports: reportReducer,
  },
});

export default store;
