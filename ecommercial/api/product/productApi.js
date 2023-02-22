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
  getProductVariantsById: (id) => {
    const url = `/product/1.0.0/product-variant/${id}`;
    return axiosClient.get(url);
  },
  getProductById: (id) => {
    const url = `/product/1.0.0/product/${id}`;
    return axiosClient.get(url);
  },
  getProductDetailById: (id) => {
    const url = `/product/1.0.0/product/${id}/detail`;
    return axiosClient.get(url);
  },
};

export default productApi;
