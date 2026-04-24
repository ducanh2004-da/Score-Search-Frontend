import axios, { AxiosError } from 'axios';

const apiConfig = axios.create({

  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, 
});

apiConfig.interceptors.response.use(
  (response) => {
    if (response.data && response.data.errors && response.data.errors.length > 0) {
      const errorMessage = response.data.errors[0].message;
      return Promise.reject(new Error(errorMessage));
    }
    
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
    
    if (error.response) {
      errorMessage = `Lỗi hệ thống: ${error.response.status}`;
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default apiConfig;