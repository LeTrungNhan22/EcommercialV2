import axiosClient from "../axiosClient";

const productApi = {
  getProductFilter: (params) => {
    const url = "/product/1.0.0/product/filter";
    return axiosClient.post(url, params);
  },
  getIndustrialList: () => {
    const url = "/product/1.0.0/product/industrials";
    return axiosClient.get(url);
  },
};

export default productApi;
