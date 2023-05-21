import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/product/productApi";

const initialState = {
  loading: false,
  errorMessage: "",
  message: "",
  product: {},
  variant: {},
  shop: {},
  variants: [],
};

export const getProductVariantById = createAsyncThunk(
  "product/getProductVariantsById",
  async (payload, thunkAPI, productVariantId) => {
    try {
      const response = await productApi.getProductVariantById(
        payload,
        productVariantId
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (payload, thunkAPI, productId) => {
    try {
      const response = await productApi.getProductById(payload, productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductDetailById = createAsyncThunk(
  "product/getProductDetailById",
  async (payload, thunkAPI, productId) => {
    try {
      const response = await productApi.getProductDetailById(
        payload,
        productId
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getProductVariantsById
    builder
      .addCase(getProductVariantById.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getProductVariantById.fulfilled, (state, action) => {
        state.loading = false;
        state.variant = action.payload;
      })
      .addCase(getProductVariantById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });

    // getProductById
    builder
      .addCase(getProductById.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });

    // getProductDetailById
    builder
      .addCase(getProductDetailById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetailById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.variants = action.payload.variants;
        state.shop = action.payload.shop;
      })
      .addCase(getProductDetailById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});

export default productDetailSlice.reducer;
