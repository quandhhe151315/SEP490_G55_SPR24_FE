import axios from "axios";
import { BASE_URL } from "../constant";

const instance = axios.create({
  baseURL: BASE_URL,
  // baseURL: "http://localhost:5050/api",
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
