import axios from 'axios'
const axiosRequest = axios.create({
    baseURL: '/api/',
    timeout: 1000,
});
// 请求拦截器
axiosRequest.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 响应拦截器
axiosRequest.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default axiosRequest