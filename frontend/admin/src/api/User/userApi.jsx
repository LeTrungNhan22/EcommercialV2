import axiosClient from "../client/axiosClient";

const userApi = {
  getUserFilter: () => {
    const url = "user/1.0.0/user/filter";
    return axiosClient.post(url, {});
  },
  getUserById: (id) => {
    const url = `user/1.0.0/user/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
