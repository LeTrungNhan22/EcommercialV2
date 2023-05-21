import { configureStore } from "@reduxjs/toolkit";
import productSingleReducer from "../../features/Product/productSingleSlice";

import productsReducer from "../../features/Product/productSlice";
import authReducer from "../auth/authSlice";


const rootReducer = {
  user: authReducer,
  products: productsReducer,
  productSingle: productSingleReducer,


};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
