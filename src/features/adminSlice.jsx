import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Thunk to handle user registration
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password, companyName, companyNumber }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, 'Admin', user.uid), {
        email: user.email,
        fullname: name,
        companyname: companyName,
        companynumber: companyNumber,
      });

      // Return the user details, including the ID
      return { id: user.uid, email: user.email, name };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the user slice
const adminSlice = createSlice({
  name: 'user',
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userId = action.payload.id; // Store the user's ID
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = adminSlice.actions; // Export the logout action
export default adminSlice.reducer;
