/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import axios from "axios";
import queryString from "query-string";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
  },
  paramsSerializer: {
    serialize: (serialize) => queryString.stringify(serialize),
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    config.headers.Authorization = `${null}`
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors: if token is expired, open logout and redirect to login page
    const { config, status, data } = error.response;

    switch (status) {
      case 401:
        localStorage.removeItem("accessToken");
        localStorage.removeItem('user');
        localStorage.removeItem("refreshToken");
        const confirm = window.confirm("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        if (confirm) {
          window.location.href = "/login";
        }
        break;
      case 403:
        window.location.href = "/403";
        break;
      case 404:
        window.location.href = "/404";
        break;
      case 500:
        window.location.href = "/500";
        break;
      default:
        break;
    }
  }
);

export default axiosClient;
