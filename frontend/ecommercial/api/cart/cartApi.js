/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import axiosClient from "../axiosClient";

const cartApi = {
  //call api to get access token
  createCartItems: (data) => {
    const url = "/cart/1.0.0/cart-item/create";
    return axiosClient.post(url, data);
  },
  getCartDetailByUserId: (userId) => {
    const url = `/cart/1.0.0/cart/${userId}/detail`;
    return axiosClient.get(url);
  },
  updateQuantityCartItem: (cartItemId, quantity) => {
    const url = `/cart/1.0.0/cart-item/${cartItemId}/update-quantity?quantity=${quantity}`;
    return axiosClient.put(url);
  },
};
export default cartApi;
