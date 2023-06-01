// Description: This file contains the store for the application

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import cartSlice from "../cart/cartSlice";
import productDetailSlice from "../product/productDetailSlice";
import productsSlice from "../product/productsSlice";
import shopSlice from "../shop/shopSlice";
import orderSlice from "../order/orderSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    products: productsSlice,
    productDetail: productDetailSlice,
    cart: cartSlice,
    shop: shopSlice,
    order: orderSlice,
  },
});

export default store;
