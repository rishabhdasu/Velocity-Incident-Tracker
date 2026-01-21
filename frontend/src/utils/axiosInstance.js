import axios from "axios";
import { BASE_URL } from "./apiPaths";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
