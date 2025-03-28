import api from './index'

// 患者相关API
export const patientApi = {
    // 获取患者列表
    getPatientList() {
        return api.get('/patient/list')
    },

    // 获取患者详情
    getPatientDetail(id) {
        return api.get(`/patient/detail/${id}`)
    },

    // 添加患者
    addPatient(data) {
        return api.post('/patient/add', data)
    },

    // 更新患者信息
    updatePatient(data) {
        return api.put('/patient/update', data)
    },

    // 删除患者
    deletePatient(id) {
        return api.delete(`/patient/delete/${id}`)
    }
}

export default patientApi