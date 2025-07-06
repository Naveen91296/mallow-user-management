import Cookies from "js-cookie";
import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export const API_BASE_URL = "https://reqres.in/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

// Request interceptor
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!navigator?.onLine) {
    console.warn("No internet connection");
    return config;
  }

  // Skip authorization header for auth endpoints
  const authEndpoints = ["/login", "/register"];
  const isAuthEndpoint = authEndpoints.some((endpoint) =>
    config.url?.includes(endpoint)
  );

  if (!isAuthEndpoint) {
    const token = Cookies.get("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.clear();
      Cookies.remove("accessToken");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
