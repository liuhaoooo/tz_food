import uniRequest from 'uni-request';
import { baseURL } from '../config/config'

uniRequest.defaults.baseURL = baseURL;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截
uniRequest.interceptors.request.use(
    request => {
        return request;
    },
    err => {
        uni.showToast({
            title: "请求失败刷新重试",
            icon: "none",
            duration: 1000
        });
        return Promise.reject(err);
    });

// 响应拦截
uniRequest.interceptors.response.use(response => {
    return Promise.resolve(response.data);
}, error => {
    uni.showToast({
        title: "请求失败刷新重试",
        icon: "none",
        duration: 1000
    });
    return Promise.reject(error);
});


export default uniRequest;