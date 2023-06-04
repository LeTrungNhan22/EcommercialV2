import axiosClient from "../../../api/client/axiosClient";
const orderApi = {
    //call api to get access token
    orderFilter: (data) => {
        const url = "/order/1.0.0/order/filter";
        return axiosClient.post(url, data);
    },
    orderDetailById: (id) => {
        const url = `/order/1.0.0/order-detail/${id}`;
        return axiosClient.get(url);
    },
    statusOrder: (orderId, data) => {
        const url = `/order/1.0.0/order/${orderId}/status`;
        return axiosClient.put(url, data);
    },
    cancelOrder: (orderId) => {
        const url = `/order/1.0.0/order/${orderId}/cancel`;
        return axiosClient.put(url, { cancelReason: "SHOP", note: "cancelReason by SHOP" });
    },
}

export default orderApi;