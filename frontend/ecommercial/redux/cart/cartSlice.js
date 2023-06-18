/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import cartApi from "../../api/cart/cartApi";

const initialState = {
  cartItems:
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  loading: false,
  cartDetail: {},
};
export const createCartItems = createAsyncThunk(
  "cart/createCartItems",
  async (data, payload, thunkAPI) => {
    try {
      const response = await cartApi.createCartItems(payload, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getCartDetailByUserId = createAsyncThunk(
  "cart/getCartDetailByUserId",
  async ({ userId }, payload, thunkAPI) => {
    try {
      const response = await cartApi.getCartDetailByUserId(userId, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateQuantityCartItem = createAsyncThunk(
  "cart/updateQuantityCartItem",
  async ({ cartItemId, quantity }, payload, thunkAPI) => {
    try {
      const response = await cartApi.updateQuantityCartItem(
        cartItemId,
        quantity,
        payload
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const indexItem = state.cartItems.findIndex(
        (item) => item.options?.variantId === action.payload.options?.variantId
      );
      if (indexItem >= 0) {
        state.cartItems[indexItem].quantity += action.payload.quantity;
        toast.success(
          <div>
            Đã thêm sản phẩm{" "}
            <span className="text-red-700">{action.payload.name}</span> vào giỏ
            hàng!
          </div>
        );
      } else {
        const tempVariant = { ...action.payload };
        state.cartItems.push(tempVariant);
        toast.success(
          <div>
            Đã thêm sản phẩm{" "}
            <span className="text-red-700">{action.payload.name}</span> vào giỏ
            hàng!
          </div>
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },

  extraReducers: (builder) => {
    //get cart detail
    builder.addCase(getCartDetailByUserId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCartDetailByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.cartDetail = {
        ...action.payload.cart,
        itemToShops: action.payload.cartItems,
      };
    });
    builder.addCase(getCartDetailByUserId.rejected, (state, action) => {
      state.loading = false;
    });
    //update quantity cart item
    builder.addCase(updateQuantityCartItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateQuantityCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.cartDetail = {
        ...action.payload.cart,
        itemToShops: action.payload.cartItems,
      };
    });
    builder.addCase(updateQuantityCartItem.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
