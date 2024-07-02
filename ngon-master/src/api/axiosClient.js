import axios from "axios";
import queryString from "query-string";

const token = localStorage.getItem('token'); // or wherever you store your token

const headers = {
  "Content-Type": "application/json",
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // replace with your server URL
  headers,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response;

    return response;
  },
  async function (error) {
    if (error?.response.data) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
);

export default axiosClient;

