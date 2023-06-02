
import axiosClient from "../../../../api/client/axiosClient";


const productApi = {
    getProductsFilter: (filter) => {
        const url = "/product/1.0.0/product/filter";
        return axiosClient.post(url, filter);
    },
    getProductDetailByPid: (productId) => {
        const url = `product/1.0.0/product/${productId}/detail`
        return axiosClient.get(url)
    },
    createProduct: (product) => {
        const url = "/product/1.0.0/product/create";
        return axiosClient.post(url, product);
    },

    getIndustrials: () => {
        const url = "/product/1.0.0/product/industrials";
        return axiosClient.get(url);
    },
    getTradeMarks: () => {
        const url = "/product/1.0.0/product/trademarks";
        return axiosClient.get(url);
    }


};

export default productApi;
