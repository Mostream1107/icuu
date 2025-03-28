<template>
  <div class="register-container">
    <div class="particles-container">
      <div class="particle" v-for="n in 20" :key="n"></div>
    </div>
    <div class="tech-lines">
      <div class="horizontal-line" v-for="n in 5" :key="`h-${n}`"></div>
      <div class="vertical-line" v-for="n in 5" :key="`v-${n}`"></div>
    </div>
    <div class="register-box">
      <div class="register-header">
        <div class="logo-icon">
          <div class="circle"></div>
          <div class="pulse"></div>
        </div>
        <h2>用户注册</h2>
        <p>创建您的智能ICU系统账号</p>
      </div>
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef" class="register-form">
        <el-form-item prop="userName">
          <el-input v-model="registerForm.userName" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="registerForm.passWord" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" prefix-icon="el-icon-lock" type="password" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" class="register-button" @click="handleRegister">注册</el-button>
        </el-form-item>
        <div class="register-options">
          <span>已有账号？<router-link to="/">立即登录</router-link></span>
        </div>
      </el-form>
      <div class="tech-decoration">
        <div class="circuit-line line-1"></div>
        <div class="circuit-line line-2"></div>
        <div class="circuit-line line-3"></div>
        <div class="circuit-dot dot-1"></div>
        <div class="circuit-dot dot-2"></div>
        <div class="circuit-dot dot-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userApi } from '../api'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const registerFormRef = ref(null)
    const loading = ref(false)

    const registerForm = reactive({
      userName: '',
      passWord: '',
      confirmPassword: ''
    })

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (registerForm.confirmPassword !== '') {
          registerFormRef.value.validateField('confirmPassword')
        }
        callback()
      }
    }

    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== registerForm.passWord) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    const rules = {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      ],
      passWord: [
        { required: true, validator: validatePass, trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, validator: validateConfirmPass, trigger: 'blur' }
      ]
    }

    const handleRegister = async () => {
      if (!registerFormRef.value) return

      try {
        await registerFormRef.value.validate()
        loading.value = true

        const response = await userApi.register({
          userName: registerForm.userName,
          passWord: registerForm.passWord
        })
        
        if (response === '') {
          // 注册成功
          ElMessage.success('注册成功，请登录')
          router.push('/')
        } else {
          // 注册失败
          ElMessage.error(response || '注册失败，请稍后重试')
        }
      } catch (error) {
        console.error('注册错误:', error)
        ElMessage.error('注册失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }

    return {
      registerFormRef,
      registerForm,
      rules,
      loading,
      handleRegister
    }
  }
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0a192f; /* 深蓝色背景 */
  position: relative;
  overflow: hidden;
}

/* 粒子动画容器 */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

/* 粒子样式 */
.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: rgba(100, 255, 218, 0.6);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.8);
  z-index: 0;
  opacity: 0;
  animation: float-particle 15s infinite linear;
}

/* 为每个粒子设置不同的位置、大小和动画延迟 */
.particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; animation-duration: 20s; }
.particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 1s; animation-duration: 18s; }
.particle:nth-child(3) { left: 30%; top: 30%; animation-delay: 2s; animation-duration: 17s; }
.particle:nth-child(4) { left: 40%; top: 70%; animation-delay: 3s; animation-duration: 21s; }
.particle:nth-child(5) { left: 50%; top: 40%; animation-delay: 4s; animation-duration: 19s; }
.particle:nth-child(6) { left: 60%; top: 90%; animation-delay: 5s; animation-duration: 22s; }
.particle:nth-child(7) { left: 70%; top: 50%; animation-delay: 6s; animation-duration: 16s; }
.particle:nth-child(8) { left: 80%; top: 20%; animation-delay: 7s; animation-duration: 23s; }
.particle:nth-child(9) { left: 90%; top: 60%; animation-delay: 8s; animation-duration: 15s; }
.particle:nth-child(10) { left: 5%; top: 50%; animation-delay: 9s; animation-duration: 19s; width: 4px; height: 4px; }
.particle:nth-child(11) { left: 15%; top: 90%; animation-delay: 10s; animation-duration: 20s; }
.particle:nth-child(12) { left: 25%; top: 10%; animation-delay: 11s; animation-duration: 18s; }
.particle:nth-child(13) { left: 35%; top: 45%; animation-delay: 12s; animation-duration: 17s; }
.particle:nth-child(14) { left: 45%; top: 85%; animation-delay: 13s; animation-duration: 21s; }
.particle:nth-child(15) { left: 55%; top: 25%; animation-delay: 14s; animation-duration: 19s; width: 4px; height: 4px; }
.particle:nth-child(16) { left: 65%; top: 65%; animation-delay: 15s; animation-duration: 22s; }
.particle:nth-child(17) { left: 75%; top: 35%; animation-delay: 16s; animation-duration: 16s; }
.particle:nth-child(18) { left: 85%; top: 75%; animation-delay: 17s; animation-duration: 23s; }
.particle:nth-child(19) { left: 95%; top: 15%; animation-delay: 18s; animation-duration: 15s; }
.particle:nth-child(20) { left: 50%; top: 50%; animation-delay: 19s; animation-duration: 24s; width: 5px; height: 5px; }

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) translateX(100vw) rotate(360deg);
    opacity: 0;
  }
}

/* 科技线条背景 */
.tech-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.horizontal-line, .vertical-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.2), rgba(100, 255, 218, 0.1), transparent);
  pointer-events: none;
}

.horizontal-line {
  height: 1px;
  width: 100%;
  animation: move-horizontal 20s infinite linear;
}

.vertical-line {
  width: 1px;
  height: 100%;
  animation: move-vertical 20s infinite linear;
}

.horizontal-line:nth-child(1) { top: 20%; animation-delay: 0s; }
.horizontal-line:nth-child(2) { top: 40%; animation-delay: 4s; }
.horizontal-line:nth-child(3) { top: 60%; animation-delay: 8s; }
.horizontal-line:nth-child(4) { top: 80%; animation-delay: 12s; }
.horizontal-line:nth-child(5) { top: 30%; animation-delay: 16s; }

.vertical-line:nth-child(6) { left: 20%; animation-delay: 2s; }
.vertical-line:nth-child(7) { left: 40%; animation-delay: 6s; }
.vertical-line:nth-child(8) { left: 60%; animation-delay: 10s; }
.vertical-line:nth-child(9) { left: 80%; animation-delay: 14s; }
.vertical-line:nth-child(10) { left: 30%; animation-delay: 18s; }

@keyframes move-horizontal {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes move-vertical {
  0% {
    background-position: 0 -1000px;
  }
  100% {
    background-position: 0 1000px;
  }
}

.register-container::before,
.register-container::after {
  content: '';
  position: absolute;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 47, 0.05) 60%, transparent 70%);
  z-index: 0;
  filter: blur(20px);
}

.register-container::before {
  top: -15vw;
  right: -15vw;
  animation: float 25s ease-in-out infinite;
}

.register-container::after {
  bottom: -15vw;
  left: -15vw;
  animation: float 30s ease-in-out infinite reverse;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-40px) rotate(8deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

.register-box {
  width: 400px;
  padding: 40px;
  background-color: rgba(17, 34, 64, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  border: 1px solid rgba(100, 255, 218, 0.2);
  overflow: hidden;
  animation: slideIn 0.6s ease-out;
}

.register-box::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #64ffda, #0a192f, #64ffda);
  z-index: -1;
  border-radius: 14px;
  animation: borderAnimation 6s ease infinite;
  opacity: 0.4;
}

@keyframes borderAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.logo-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  position: relative;
}

.circle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #64ffda, #0a192f);
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
}

.circle::after {
  content: '';
  width: 40px;
  height: 40px;
  background-color: rgba(17, 34, 64, 0.7);
  border-radius: 50%;
}

.pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 3px solid rgba(100, 255, 218, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

.register-header h2 {
  font-size: 28px;
  color: #64ffda;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
}

.register-header p {
  color: #ccd6f6;
  font-size: 16px;
  opacity: 0.8;
}

.register-form {
  margin-top: 20px;
  position: relative;
  z-index: 2;
}

.register-button {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #0c2d6b, #0053ba);
  border-color: rgba(100, 255, 218, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
  border-color: rgba(100, 255, 218, 0.5);
}

.register-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.5s ease;
}

.register-button:hover::after {
  left: 100%;
  top: 100%;
}

.register-options {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #ccd6f6;
}

.register-options a {
  color: #64ffda;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
}

.register-options a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #64ffda;
  transition: all 0.3s ease;
}

.register-options a:hover {
  text-shadow: 0 0 8px rgba(100, 255, 218, 0.5);
}

.register-options a:hover::after {
  width: 100%;
}

/* 科技感装饰 */
.tech-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.circuit-line {
  position: absolute;
  background-color: rgba(100, 255, 218, 0.2);
}

.circuit-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #64ffda;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.8);
  animation: blinking 3s infinite alternate;
}

@keyframes blinking {
  0%, 80% {
    opacity: 1;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

.line-1 {
  width: 150px;
  height: 1px;
  right: 20px;
  top: 30px;
}

.line-2 {
  width: 1px;
  height: 100px;
  left: 30px;
  bottom: 50px;
}

.line-3 {
  width: 80px;
  height: 1px;
  left: 30px;
  bottom: 50px;
}

.dot-1 {
  right: 20px;
  top: 30px;
}

.dot-2 {
  left: 30px;
  bottom: 50px;
}

.dot-3 {
  left: 110px;
  bottom: 50px;
  animation-delay: 1s;
}

/* 表单控件样式 */
:deep(.el-input__inner) {
  background-color: rgba(10, 25, 47, 0.6);
  border: 1px solid rgba(100, 255, 218, 0.2);
  color: #ccd6f6;
  transition: all 0.3s ease;
}

:deep(.el-input__inner:hover),
:deep(.el-input__inner:focus) {
  border-color: rgba(100, 255, 218, 0.5);
  box-shadow: 0 0 8px rgba(100, 255, 218, 0.1);
}

:deep(.el-input__prefix) {
  color: #64ffda;
}

:deep(.el-form-item__error) {
  color: #ff6b6b;
  font-weight: 500;
}

/* 进入动画效果 */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 