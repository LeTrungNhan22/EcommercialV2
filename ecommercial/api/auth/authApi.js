import axiosClient from "../axiosClient";

const authApi = {
  //call api to get access token
  getAccessToken: (params) => {
    const url = "/user/1.0.0/login/customer";
    return axiosClient.post(url, null, { params });
  },
  // get user info from token
  getCustomerInfo: (params) => {
    const url = "/user/1.0.0/login/info";
    return axiosClient.get(url, { params });
  },
  register: (params) => {
    const url = "/user/1.0.0/register/user";
    return axiosClient.post(url, params);
  },
};

export default authApi;
