// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import adminReducer from '../features/adminSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    auth: authReducer,
  },
});

export default store;

