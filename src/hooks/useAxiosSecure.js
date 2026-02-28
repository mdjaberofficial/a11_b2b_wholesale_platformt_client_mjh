// src/hooks/useAxiosSecure.js
import axios from "axios";
import auth from "../config/firebase.config";

// Create a base instance
const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000', // Update this to your deployed server URL later
});

const useAxiosSecure = () => {
  // Request Interceptor: Attach the token before the request is sent
  axiosSecure.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
      // Get the fresh token directly from Firebase
      const token = await user.getIdToken();
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Response Interceptor: Handle 401/403 errors (e.g., log the user out if the token expires)
  axiosSecure.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      // Optional: Add logic here to log the user out via AuthContext if their token is totally invalid
      console.error("Unauthorized access intercepted");
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;