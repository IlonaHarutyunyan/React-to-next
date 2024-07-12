import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getMailings } from '../../api';

export const fetchMailings = createAsyncThunk('mailingsPage/fetchMailings', async page => {
  const response = await getMailings(page);

  return response;
});

const initialState = {
  data: {
    mailings: [null, null, null, null],
    pagesTotal: 0,
    page: 1,
  },
  isLoading: false,
  error: null,
};

export const mailingsPageSlice = createSlice({
  name: 'mailingsPage',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchMailings.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchMailings.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = action.payload;
    });
    builder.addCase(fetchMailings.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });
  },
});

export const { resetState } = mailingsPageSlice.actions;

export default mailingsPageSlice.reducer;
