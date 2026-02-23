import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config)=> {
    const token = localStorage.getItem("token");
    if(token) {
      config.headers.Authorization = `Bearer${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default axiosInstance;
