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

export const getIndustrialList = createAsyncThunk(
  "product/getIndustrialList",
  async (payload, thunkAPI) => {
    try {
      const response = await productApi.getIndustrialList();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductByFilter.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.resultList;
      })
      .addCase(getProductByFilter.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });

    // getIndustrialList
    builder
      .addCase(getIndustrialList.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getIndustrialList.fulfilled, (state, action) => {
        state.loading = false;
        state.industrialList = action.payload;
      })
      .addCase(getIndustrialList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addDefaultCase((state, action) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
