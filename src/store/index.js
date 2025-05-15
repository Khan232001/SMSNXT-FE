import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import planReducer from './slices/planSlice';
import userReducer from './slices/userSlice';
import campaignReducer from './slices/campaignSlice';
import reportReducer from './slices/reportSlice';
import textBlastReducer from "./slices/textBlastSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    user: userReducer,
    campaigns: campaignReducer,
    reports: reportReducer,
    textBlast: textBlastReducer,
  },
});

export default store;
