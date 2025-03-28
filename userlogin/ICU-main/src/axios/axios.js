
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000 // 设置超时时间
});

// 请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做些什么
    return response;
}, error => {
    // 对响应错误做些什么
    return Promise.reject(error);
});

export default instance;
