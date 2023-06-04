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
  if (localStorage.getItem("accessToken") === 'Bad credentials') {
    localStorage.removeItem("accessToken");
  }
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
    // Handle errors
    throw error;
  }
);

export default axiosClient;
