import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null,
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
        patientScore: null,
        enhancedMode: false,
        facialActivity: null,
        facialAnalytics: [] // 用于存储面部分析的历史数据
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        user: state => state.user,
        patientScore: state => state.patientScore,
        enhancedMode: state => state.enhancedMode,
        facialActivity: state => state.facialActivity,
        facialAnalytics: state => state.facialAnalytics
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_TOKEN(state, token) {
            state.token = token
            state.isAuthenticated = true
            localStorage.setItem('token', token)
        },
        LOGOUT(state) {
            state.user = null
            state.token = ''
            state.isAuthenticated = false
            localStorage.removeItem('token')
        },
        SET_PATIENT_SCORE(state, score) {
            state.patientScore = score
        },
        SET_ENHANCED_MODE(state, mode) {
            state.enhancedMode = mode
        },
        SET_FACIAL_ACTIVITY(state, activity) {
            state.facialActivity = activity
                // 同时添加到历史数据中
            state.facialAnalytics.push({
                    ...activity,
                    timestamp: new Date().getTime()
                })
                // 限制历史数据数量
            if (state.facialAnalytics.length > 100) {
                state.facialAnalytics.shift()
            }
        }
    },
    actions: {
        login({ commit }, userData) {
            // 登录成功后设置用户信息和token
            commit('SET_USER', userData)
            commit('SET_TOKEN', 'dummy-token') // 实际应用中应该使用后端返回的token
        },
        logout({ commit }) {
            commit('LOGOUT')
        },
        updatePatientScore({ commit }, score) {
            commit('SET_PATIENT_SCORE', score)
        },
        setEnhancedMode({ commit }, mode) {
            commit('SET_ENHANCED_MODE', mode)
        },
        updateFacialActivity({ commit }, activity) {
            commit('SET_FACIAL_ACTIVITY', activity)
        }
    },
    modules: {}
})