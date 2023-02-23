import axiosClient from "../axiosClient";

const cartApi = {
  //call api to get access token
  createCartItems: (data) => {
    const url = "/cart/1.0.0/cart-item/create";
    return axiosClient.post(url, data);
  },
  getCartDetailByUserId: (userId) => {
    const url = `/cart/1.0.0/cart/1677049250644450/detail`;
    return axiosClient.get(url);
  },
};
export default cartApi;
