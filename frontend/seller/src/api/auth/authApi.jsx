import axiosClient from "../client/axiosClient";
const userApi = {
  loginCustomer: (params) => {
    const url = `/user/1.0.0/login/customer`;
    return axiosClient.post(url, null, { params })
  },
  loginInfo: (params) => {
    const url = "/user/1.0.0/login/info";
    return axiosClient.get(url, params);
  },
};

export default userApi;
