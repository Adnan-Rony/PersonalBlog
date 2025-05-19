import axios from 'axios';

const axiosInstance = axios.create({
//  baseURL: import.meta.env.VITE_API_BASE_URL,
 baseURL: "http://localhost:3000/api/v1/",

  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
