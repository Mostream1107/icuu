/**
 * 格式化日期时间
 * @param {Date} date 日期对象
 * @param {String} format 格式化模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {String} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return ''

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const formatMap = {
        'YYYY': year,
        'MM': month < 10 ? `0${month}` : month,
        'DD': day < 10 ? `0${day}` : day,
        'HH': hours < 10 ? `0${hours}` : hours,
        'mm': minutes < 10 ? `0${minutes}` : minutes,
        'ss': seconds < 10 ? `0${seconds}` : seconds
    }

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => formatMap[match])
}

/**
 * 获取RASS评分描述
 * @param {String} score RASS评分
 * @returns {String} 评分描述
 */
export function getRassDescription(score) {
    const descriptions = {
        '+4': '患者有攻击性、有暴力行为',
        '+3': '患者非常躁动，试着拔出呼吸管、胃管或静脉点滴',
        '+2': '患者躁动焦虑，身体移动，无法配合呼吸机',
        '+1': '患者不安焦虑，焦虑紧张但身体只有轻微的移动',
        '0': '患者清醒平静',
        '-1': '患者昏昏欲睡，没有完全清醒，但可以保持清醒超过10秒',
        '-2': '患者轻度镇静，无法维持清醒超过10秒',
        '-3': '中度镇静，对声音有反应',
        '-4': '重度镇静，对身体刺激有反应',
        '-5': '昏迷，对声音及身体刺激都无反应'
    }

    return descriptions[score] || '未知状态'
}

/**
 * 获取RASS评分样式类
 * @param {String} score RASS评分
 * @returns {String} 样式类名
 */
export function getRassScoreClass(score) {
    if (score === '+4' || score === '+3') return 'score-danger'
    if (score === '+2' || score === '+1') return 'score-warning'
    if (score === '0') return 'score-normal'
    if (score === '-1' || score === '-2') return 'score-info'
    if (score === '-3' || score === '-4') return 'score-primary'
    if (score === '-5') return 'score-dark'
    return ''
}

/**
 * 将图像数据转换为Base64
 * @param {HTMLVideoElement} video 视频元素
 * @returns {String} Base64编码的图像数据
 */
export function captureImageFromVideo(video) {
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg')
}

/**
 * 防抖函数
 * @param {Function} fn 要执行的函数
 * @param {Number} delay 延迟时间，单位毫秒
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

/**
 * 节流函数
 * @param {Function} fn 要执行的函数
 * @param {Number} interval 间隔时间，单位毫秒
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, interval) {
    let lastTime = 0
    return function(...args) {
        const now = Date.now()
        if (now - lastTime >= interval) {
            lastTime = now
            fn.apply(this, args)
        }
    }
}