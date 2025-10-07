import axios from 'axios';
import { notification } from 'antd';

const instance = axios.create({ baseURL: '' }); // dùng proxy

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,  // hoặc res.data nếu bạn muốn
  (error) => {
    const st = error.response?.status;
    const msg = error.response?.data?.message || 'Đã xảy ra lỗi';
    if (st === 401 || st === 403) {
      notification.error({
        message: 'Unauthorized',
        description: msg || 'Token bị hết hạn/hoặc không hợp lệ',
      });
    } else {
      notification.error({ message: 'Error', description: msg });
    }
    return Promise.reject(error);
  }
);

export default instance;
