import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';

// Async thunk for booking submission
export const submitBooking = createAsyncThunk(
  'booking/submitBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'Bookings'), {
        ...bookingData,
        userId: auth?.currentUser?.uid,
      });
      return docRef.id; // Return booking ID if successful
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
