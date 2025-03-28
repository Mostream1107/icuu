# 智能ICU系统 - 前端

这是一个基于Vue 3的智能ICU系统前端项目，用于重症监护病房患者表情识别和状态评估。

## 功能特点

- 用户登录和注册
- 人脸识别和表情分析
- RASS评分（里士满镇静-躁动量表）
- 历史记录查看
- 响应式设计

## 技术栈

- Vue 3
- Vue Router
- Vuex
- Element Plus
- Face-api.js
- Axios

## 项目设置

### 安装依赖
```
npm install
```

### 开发环境运行
```
npm run serve
```

### 生产环境构建
```
npm run build
```

### 代码检查
```
npm run lint
```

## 项目结构

```
icu-frontend/
├── public/               # 静态资源
├── src/
│   ├── api/              # API请求
│   ├── assets/           # 资源文件
│   ├── components/       # 公共组件
│   ├── router/           # 路由配置
│   ├── store/            # Vuex状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .gitignore            # Git忽略文件
├── babel.config.js       # Babel配置
├── package.json          # 项目依赖
└── README.md             # 项目说明
```

## 后端API

本项目需要连接到后端API，默认后端服务器地址为`http://localhost:8080`。

主要API端点：
- `/login/login` - 用户登录
- `/login/register` - 用户注册
- `/face/analyze` - 人脸表情分析

## 注意事项

- 使用人脸识别功能需要允许浏览器访问摄像头
- 首次使用需要加载人脸识别模型，可能需要一些时间
- 本项目需要配合后端API使用 