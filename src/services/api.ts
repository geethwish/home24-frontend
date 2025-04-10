import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/user.slice";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const api = axios.create({
  baseURL,
  timeout: 10000, // Example timeout
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Or from Redux if you prefer
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error:", error.response.status, error.response.data);
      switch (error.response.status) {
        case 400:
          toast.error(
            "Bad request. Please check your input. Error: " +
              error.response.data?.message
          );
          break;
        case 401:
          toast.error("Unauthorized. Please log in again.");
          store.dispatch(logout());
          break;
        case 404:
          toast.error("Resource not found.");
          break;
        case 500:
          toast.error("Internal server error.");
          break;
        // Add more cases for other error codes as needed
        default:
          toast.error(
            `An error occurred: ${error.response.data?.msg || error.message}`
          );
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error: No response received", error.request);
      toast.error("No response from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Error:", error.message);
      toast.error(`An error occurred: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
