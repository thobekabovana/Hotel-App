// src/features/clientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Thunk to handle user registration for clients
export const registerClient = createAsyncThunk(
  'client/registerClient',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Return the user details, including the ID
      return { id: user.uid, email: user.email, name };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the client slice
const clientSlice = createSlice({
  name: 'client',
  initialState: {
    userId: null, // Store the user's ID
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerClient.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userId = action.payload.id; // Store the user's ID
        state.loading = false;
      })
      .addCase(registerClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = clientSlice.actions; // Export the logout action
export default clientSlice.reducer;
