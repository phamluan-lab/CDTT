import axios from "axios";
import { UrlAPI } from "../config";

// Lấy token từ localStorage
const token = localStorage.getItem('token');

// Tạo axios instance
const httpAxios = axios.create({
  baseURL: UrlAPI,
  // timeout: 1000, // Có thể bỏ qua nếu không cần thiết
  headers: {
    'X-Custom-Header': 'foobar',
    'masv': '1',
  }
});

// Interceptor để thêm Authorization header vào mỗi yêu cầu
httpAxios.interceptors.request.use(
  (config) => {
    if (token) {
      // Thêm token vào header nếu có
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý phản hồi của API
httpAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpAxios;
