import axiosClient from "../axiosClient";

const shopApi = {
    getShopDetailById: (shopId) => {
        const url = `/user/1.0.0/shop/shop/${shopId}`;
        return axiosClient.get(url);
    }
};

export default shopApi;
