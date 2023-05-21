import axiosClient from "../../../../api/client/axiosClient";


const productApi = {
    getProductsFilter: (filter) => {
        const url = "/product/1.0.0/product/filter";
        return axiosClient.post(url, filter);
    },
    getProductDetailByPid: (productId) => {
        const url = `product/1.0.0/product/${productId}/detail`
        return axiosClient.get(url)
    }
};

export default productApi;
