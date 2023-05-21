import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productApi from "./api/product/productApi";

const initialState = {
  products: [],
  loading: false,
};
export const getProductsFilter = createAsyncThunk(
  "product/getProductsFilter",
  async (filter, payload, thunkAPI) => {
    try {
      const response = await productApi.getProductsFilter(filter, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProductsFilter.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductsFilter.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductsFilter.rejected, (state, action) => {
      state.loading = false;
      toast.error("Không tìm thấy thông tin sản phẩm");
    });
  },
});

const { reducer: productsReducer } = productSlice;
export default productsReducer;
