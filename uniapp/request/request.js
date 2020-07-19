import uniRequest from 'uni-request';

uniRequest.defaults.baseURL = 'http://liuhaooo.top:6003/api/';// api的base_url
// uniRequest.defaults.baseURL = 'http://127.0.0.1:8848/api/';
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截
uniRequest.interceptors.request.use(
    request => {
        return request;
    },
    err => {
        console.log('请求失败');
        return Promise.reject(err);
    });
 
// 响应拦截
uniRequest.interceptors.response.use(response=> {
    return Promise.resolve(response.data);
}, error=> {
    return Promise.reject(error);
});


export default uniRequest;