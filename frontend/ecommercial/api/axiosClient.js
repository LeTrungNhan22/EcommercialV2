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
let confirmDisplayed = false; // Khởi tạo cờ confirmDisplayed

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors: if token is expired, open logout and redirect to login page
    if (error && !confirmDisplayed) { // Kiểm tra cờ confirmDisplayed
      confirmDisplayed = true; // Đánh dấu confirm đã được hiển thị
      try {
        const confirm = window.confirm("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        if (confirm) {
          // waiting for website logout
          window.close(); // Đóng tab hiện tại
          setTimeout(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem('user');
            localStorage.removeItem("refreshToken");
            window.location.href = "/user/auth/login";
            // Đóng tab confirm
          }, 2000);
        } else {
          confirmDisplayed = false; // Đặt lại cờ confirmDisplayed
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
);



export default axiosClient;
