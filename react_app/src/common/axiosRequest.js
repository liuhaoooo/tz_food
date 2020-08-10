import axios from 'axios'
import { message } from 'antd';
const axiosRequest = axios.create({
    baseURL: '/api/',
    timeout: 1000,
});
// 请求拦截器
axiosRequest.interceptors.request.use((config) => {
    return config;
}, (error) => {
    message.error('请求失败，请检查网络');
    return Promise.reject(error);
});

// 响应拦截器
axiosRequest.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    message.error('请求失败，请检查网络');
    return Promise.reject(error);
});

export default axiosRequest