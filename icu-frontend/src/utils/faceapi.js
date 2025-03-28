// 为Node.js模块提供浏览器兼容的polyfill
if (typeof window !== 'undefined') {
    window.fs = {
        promises: {
            readFile: () => Promise.resolve(Buffer.from([])),
            writeFile: () => Promise.resolve()
        },
        readFileSync: () => Buffer.from([]),
        writeFileSync: () => {},
        existsSync: () => false
    };

    // 其他可能需要的Node.js模块
    window.process = window.process || {
        env: { NODE_ENV: 'production' }
    };

    window.Buffer = window.Buffer || {
        from: (arr) => new Uint8Array(arr)
    };
}

// 导入face-api.js
import * as faceapi from 'face-api.js';

// 导出模块
export default faceapi;