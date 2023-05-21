import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productApi from "./api/product/productApi";

const initialState = {
  loading: false,
  productSingle: {},
};

export const getProductSingle = createAsyncThunk(
  "product/getProductSingle",
  async (productId, payload, thunkAPI) => {
    try {
      const response = await productApi.getProductDetailByPid(
        productId,
        payload
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSingleSlice = createSlice({
  name: "productSingle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProductSingle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductSingle.fulfilled, (state, action) => {
      state.productSingle = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductSingle.rejected, (state, action) => {
      state.loading = false;
      toast.error("Không tìm thấy thông tin sản phẩm");
    });
  },
});
const { reducer: productSingleReducer } = productSingleSlice;

export default productSingleReducer;
