import axiosClient from "../axiosClient";

const authApi = {
  //call api to get access token
  getAccessToken: (params) => {
    const url = "/user/1.0.0/login/customer";
    return axiosClient.post(url, null, { params });
  },
  // get user info from token
  getCustomerInfoByToken: (params) => {
    const url = "/user/1.0.0/login/info";
    return axiosClient.get(url, { params });
  },
  register: (params) => {
    const url = "/user/1.0.0/register/user";
    return axiosClient.post(url, params);
  },
  updateInfoBasic: (userId, data) => {
    const url = `/user/1.0.0/user/${userId}/info-basic`;
    return axiosClient.put(url, data);
  },
  getUserInfoById: (userId) => {
    const url = `user/1.0.0/user/${userId}`;
    return axiosClient.get(url);
  },
  updateAddress: (userId, data) => {
    const url = `/user/1.0.0/user/${userId}/info-address`;
    return axiosClient.put(url, data);
  },
};

export default authApi;
