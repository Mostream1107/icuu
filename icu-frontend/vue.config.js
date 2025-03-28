const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // 配置webpack来解决face-api.js的fs模块问题
    configureWebpack: {
        resolve: {
            fallback: {
                fs: false
            },
            alias: {
                // 将fs模块重定向到一个空文件
                fs: path.resolve(__dirname, 'src/utils/fs-empty.js')
            }
        }
    }
})