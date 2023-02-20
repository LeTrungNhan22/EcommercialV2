import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/product/productApi";

const initialState = {
  products: [],
  loading: false,
  errorMessage: "",
  message: "",
};

export const getProductByFilter = createAsyncThunk(
  "product/getProductByFilter",
  async (payload, thunkAPI, params) => {
    try {
      const response = await productApi.getProductFilter(payload, params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductByFilter.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductByFilter.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.resultList;
    },
    [getProductByFilter.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export default productSlice.reducer;
