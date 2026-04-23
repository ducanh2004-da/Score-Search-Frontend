// src/configs/api.config.ts
import axios, { AxiosError } from 'axios';

const apiConfig = axios.create({
  // URL trỏ thẳng đến endpoint GraphQL của NestJS (Ví dụ: http://localhost:3000/graphql)
  // Nhớ định nghĩa VITE_API_BACKEND_URL trong file .env của React
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Timeout sau 30 giây nếu server không phản hồi
});

// Interceptor: Lớp bảo vệ chặn ở cửa ra/vào của dữ liệu
apiConfig.interceptors.response.use(
  (response) => {
    // ĐẶC SẢN CỦA GRAPHQL: Luôn trả về HTTP Status 200 kể cả khi API lỗi.
    // Lỗi thực sự sẽ được Backend gói trong mảng `errors`.
    // Chúng ta cần check và ném nó ra để file Service (try/catch) có thể bắt được.
    if (response.data && response.data.errors && response.data.errors.length > 0) {
      const errorMessage = response.data.errors[0].message;
      return Promise.reject(new Error(errorMessage));
    }
    
    // Nếu không có lỗi, cho dữ liệu đi tiếp
    return response;
  },
  (error: AxiosError) => {
    // Nơi này bắt các lỗi "chết người" như: Server sập, mất mạng, URL sai...
    let errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
    
    if (error.response) {
      // Server có phản hồi nhưng mã lỗi không phải 200 (vd: 404, 500)
      errorMessage = `Lỗi hệ thống: ${error.response.status}`;
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default apiConfig;