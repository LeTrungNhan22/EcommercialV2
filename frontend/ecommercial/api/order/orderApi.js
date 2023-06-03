import axiosClient from "../axiosClient";

const orderApi = {
    //call api to get access token
    createOrder: (data) => {
        const url = "/order/1.0.0/order";
        return axiosClient.post(url, data);
    },
    orderDetail: (orderId) => {
        const url = `/order/1.0.0/order-detail/${orderId}`;
        return axiosClient.get(url);
    },
    orderById: (orderId) => {
        const url = `/order/1.0.0/order/${orderId}`;
        return axiosClient.get(url);
    },

    cancelOrder: (orderId) => {
        const url = `/order/1.0.0/order/${orderId}/cancel`;
        return axiosClient.put(url, { cancelReason: "CUSTOMER", note: "cancelReason by customer" });
    },
    confirmOrder: (orderId) => {
        const url = `/order/1.0.0/order/${orderId}/confirm-sequence`;
        return axiosClient.put(url);
    },
    statusOrder: (orderId) => {
        const url = `/order/1.0.0/order/${orderId}/status`;
        return axiosClient.put(url);
    },
    filterOrder: (data) => {
        const url = `/order/1.0.0/order/filter`;
        return axiosClient.post(url, data);
    }




};
export default orderApi;
