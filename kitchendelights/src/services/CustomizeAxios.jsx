import axios from "axios";
const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "jwt") {
      return value;
    }
  }
  return null;
};
const instance = axios.create({
  baseURL: "http://localhost:5050/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getTokenFromCookie(); // Lấy token JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào tiêu đề Authorization
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

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
