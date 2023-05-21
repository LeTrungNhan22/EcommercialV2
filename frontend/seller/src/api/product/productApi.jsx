import axiosClient from "../client/axiosClient";

const productApi = {
    getIndustrials: () => {
        const url = "/product/1.0.0/product/industrials";
        return axiosClient.get(url);
    },
    getTradeMarks: () => {
        const url = "/product/1.0.0/product/trademarks";
        return axiosClient.get(url);
    }

}

export default productApi;