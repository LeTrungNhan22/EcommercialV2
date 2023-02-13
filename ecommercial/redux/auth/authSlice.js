import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  user: null,
  token: null,
  loading: false,
  error: "",
};
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (data, thunkAPI) => {
    const response = await fetch(`${baseUrl}/user/1.0.0/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(dataRes);
    }
    return dataRes;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.loading = false;

      if (error) {
        state.error = action.payload.message;
      } else {
        state.message = action.payload.message;
      }
    },

    [signUpUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
