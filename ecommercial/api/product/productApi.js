import axiosClient from "../axiosClient";

const productApi = {
  getProductFilter: () => {
    const url = "/product/1.0.0/product/filter";
    return axiosClient.post(url, {});
  },
};

export default productApi;
