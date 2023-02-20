// Description: This file contains the store for the application

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import productSlice from "../product/productSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    products: productSlice,
  },
});

export default store;
