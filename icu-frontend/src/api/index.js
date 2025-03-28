import axios from 'axios'

// 创建axios实例
const api = axios.create({
    baseURL: 'http://localhost:8080', // 后端服务器地址
    timeout: 10000 // 请求超时时间
})

// 请求拦截器
api.interceptors.request.use(
    config => {
        // 在请求发送前做一些处理，例如添加token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        // 处理请求错误
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
api.interceptors.response.use(
    response => {
        // 处理响应数据
        return response.data
    },
    error => {
        // 处理响应错误
        console.error('响应错误:', error)
        return Promise.reject(error)
    }
)

// 用户相关API
export const userApi = {
    // 用户登录
    login(data) {
        return api.post('/login/login', data)
    },
    // 用户注册
    register(data) {
        return api.post('/login/register', data)
    }
}

// 人脸识别相关API
export const faceApi = {
    // 上传人脸图像进行分析
    analyzeExpression(data) {
        return api.post('/face/analyze', data)
    },
    // 获取历史记录
    getHistory() {
        return api.get('/face/history')
    }
}

export default api