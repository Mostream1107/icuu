<template>
  <div class="dashboard-container">
    <div class="particles-container">
      <div class="particle" v-for="n in 15" :key="n"></div>
    </div>
    <div class="tech-lines">
      <div class="horizontal-line" v-for="n in 4" :key="`h-${n}`"></div>
      <div class="vertical-line" v-for="n in 4" :key="`v-${n}`"></div>
    </div>
    <el-container>
      <el-header>
        <div class="header-logo">
          <h2>智慧ICU系统</h2>
        </div>
        <div class="header-menu">
          <el-menu mode="horizontal" :router="true" :default-active="activeIndex">
            <el-menu-item index="/dashboard">首页</el-menu-item>
            <el-menu-item index="/face-recognition">人脸识别</el-menu-item>
          </el-menu>
        </div>
        <div class="header-user">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="welcome-card">
              <h1>欢迎使用智慧ICU系统</h1>
              <p>本系统通过人脸识别技术，对重症监护病房患者的微表情进行分析，帮助医护人员更好地了解患者状态。</p>
              <el-button type="primary" size="large" @click="goToFaceRecognition">开始使用人脸识别</el-button>
            </div>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" class="mt-20">
          <el-col :span="12">
            <div class="info-card">
              <h3>里士满镇静-躁动量表 (RASS)</h3>
              <p>RASS量表是一种评估重症患者镇静和躁动程度的工具，分数范围从+4（极度躁动）到-5（无法唤醒）。</p>
              <el-table :data="rassData" style="width: 100%">
                <el-table-column prop="score" label="分数" width="80"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-card">
              <h3>系统功能介绍</h3>
              <ul>
                <li><strong>人脸识别：</strong>通过摄像头捕捉患者面部表情</li>
                <li><strong>表情分析：</strong>分析患者微表情，评估RASS评分</li>
                <li><strong>数据记录：</strong>记录患者状态变化，便于医护人员追踪</li>
                <li><strong>实时监控：</strong>实时监测患者状态，及时发现异常</li>
              </ul>
              <p>本系统采用先进的人工智慧技术，提高重症监护的精准度和效率。</p>
            </div>
          </el-col>
        </el-row>
      </el-main>
      
      <el-footer>
        <p>© 2025 智慧ICU系统 - 重症监护微表情识别与RASS评分系统</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const store = useStore()
    const activeIndex = ref('/dashboard')
    
    const userName = computed(() => {
      return store?.state?.user ? store?.state?.user.userName : '用户'
    })
    
    const rassData = ref([
      { score: '+4', description: '患者有攻击性、有暴力行为' },
      { score: '+3', description: '患者非常躁动，试着拔出呼吸管、胃管或静脉点滴' },
      { score: '+2', description: '患者躁动焦虑，身体移动，无法配合呼吸机' },
      { score: '+1', description: '患者不安焦虑，焦虑紧张但身体只有轻微的移动' },
      { score: '0', description: '患者清醒平静' },
      { score: '-1', description: '患者昏昏欲睡，没有完全清醒，但可以保持清醒超过10秒' },
      { score: '-2', description: '患者轻度镇静，无法维持清醒超过10秒' },
      { score: '-3', description: '中度镇静，对声音有反应' },
      { score: '-4', description: '重度镇静，对身体刺激有反应' },
      { score: '-5', description: '昏迷，对声音及身体刺激都无反应' }
    ])
    
    onMounted(() => {
      // 检查用户是否已登录
      if (!store?.state?.isAuthenticated) {
        router.push('/')
      }
    })
    
    const handleCommand = (command) => {
      if (command === 'logout') {
        ElMessageBox.confirm('确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('logout')
          router.push('/')
        }).catch(() => {})
      }
    }
    
    const goToFaceRecognition = () => {
      router.push('/face-recognition')
    }
    
    return {
      activeIndex,
      userName,
      rassData,
      handleCommand,
      goToFaceRecognition
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  background-color: #0a192f; /* 深蓝色背景 */
  color: #e6f1ff;
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
  pointer-events: none;
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
  animation: float-particle 20s infinite linear;
  pointer-events: none;
}

/* 为每个粒子设置不同的位置、大小和动画延迟 */
.particle:nth-child(1) { left: 5%; top: 20%; animation-delay: 0s; animation-duration: 25s; }
.particle:nth-child(2) { left: 15%; top: 80%; animation-delay: 2s; animation-duration: 20s; }
.particle:nth-child(3) { left: 25%; top: 30%; animation-delay: 4s; animation-duration: 22s; }
.particle:nth-child(4) { left: 35%; top: 70%; animation-delay: 6s; animation-duration: 28s; }
.particle:nth-child(5) { left: 45%; top: 40%; animation-delay: 8s; animation-duration: 23s; }
.particle:nth-child(6) { left: 55%; top: 90%; animation-delay: 10s; animation-duration: 26s; }
.particle:nth-child(7) { left: 65%; top: 50%; animation-delay: 12s; animation-duration: 21s; }
.particle:nth-child(8) { left: 75%; top: 25%; animation-delay: 14s; animation-duration: 27s; }
.particle:nth-child(9) { left: 85%; top: 60%; animation-delay: 16s; animation-duration: 24s; }
.particle:nth-child(10) { left: 95%; top: 40%; animation-delay: 18s; animation-duration: 29s; width: 4px; height: 4px; }
.particle:nth-child(11) { left: 10%; top: 50%; animation-delay: 1s; animation-duration: 30s; }
.particle:nth-child(12) { left: 30%; top: 85%; animation-delay: 3s; animation-duration: 22s; }
.particle:nth-child(13) { left: 50%; top: 15%; animation-delay: 5s; animation-duration: 26s; }
.particle:nth-child(14) { left: 70%; top: 75%; animation-delay: 7s; animation-duration: 27s; }
.particle:nth-child(15) { left: 90%; top: 30%; animation-delay: 9s; animation-duration: 24s; width: 4px; height: 4px; }

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.6;
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
  pointer-events: none;
}

.horizontal-line, .vertical-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.05), rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.05), transparent);
  pointer-events: none;
}

.horizontal-line {
  height: 1px;
  width: 100%;
  animation: move-horizontal 30s infinite linear;
}

.vertical-line {
  width: 1px;
  height: 100%;
  animation: move-vertical 30s infinite linear;
}

.horizontal-line:nth-child(1) { top: 25%; animation-delay: 0s; }
.horizontal-line:nth-child(2) { top: 45%; animation-delay: 8s; }
.horizontal-line:nth-child(3) { top: 65%; animation-delay: 16s; }
.horizontal-line:nth-child(4) { top: 85%; animation-delay: 24s; }

.vertical-line:nth-child(5) { left: 25%; animation-delay: 4s; }
.vertical-line:nth-child(6) { left: 45%; animation-delay: 12s; }
.vertical-line:nth-child(7) { left: 65%; animation-delay: 20s; }
.vertical-line:nth-child(8) { left: 85%; animation-delay: 28s; }

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

/* 保留原有样式并确保z-index正确 */
.el-container {
  position: relative;
  z-index: 1;
  height: 100%;
}

.el-header {
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-logo h2 {
  margin: 0;
  color: #64ffda; /* 科技感浅绿色 */
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  transition: all 0.3s ease;
}

.header-logo h2:hover {
  text-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
}

.header-user {
  cursor: pointer;
}

.el-dropdown-link {
  color: #ccd6f6;
  font-size: 14px;
}

.el-main {
  padding: 20px;
  height: calc(100vh - 120px);
  overflow-y: auto;
}

.welcome-card {
  background: linear-gradient(135deg, rgba(17, 34, 64, 0.9), rgba(41, 61, 102, 0.8));
  background-size: 400% 400%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  color: #e6f1ff;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.welcome-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #64ffda, #0a192f, #64ffda);
  z-index: -1;
  border-radius: 14px;
  animation: borderAnimation 3s ease infinite;
  opacity: 0.5;
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

.welcome-card h1 {
  margin-top: 0;
  font-size: 32px;
  color: #64ffda;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.welcome-card p {
  font-size: 16px;
  margin-bottom: 30px;
  color: #ccd6f6;
  line-height: 1.6;
}

.info-card {
  background-color: rgba(17, 34, 64, 0.7);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  height: 100%;
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(5px);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.info-card h3 {
  margin-top: 0;
  color: #64ffda;
  border-bottom: 1px solid rgba(100, 255, 218, 0.2);
  padding-bottom: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
}

.info-card h3::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #64ffda, transparent);
}

.info-card ul {
  padding-left: 20px;
  color: #ccd6f6;
}

.info-card li {
  margin-bottom: 15px;
  position: relative;
}

.info-card li strong {
  color: #64ffda;
  font-weight: 600;
  position: relative;
  padding-left: 5px;
}

.info-card li strong::before {
  content: '›';
  position: absolute;
  left: -5px;
  color: #64ffda;
  font-size: 18px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.info-card li:hover strong::before {
  opacity: 1;
  transform: translateX(0);
}

.info-card p {
  color: #ccd6f6;
  line-height: 1.6;
}

.el-footer {
  background-color: rgba(10, 25, 47, 0.85);
  color: #8892b0;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

/* 表格样式 */
:deep(.el-table) {
  --el-table-header-bg-color: rgba(17, 34, 64, 0.8);
  --el-table-header-text-color: #64ffda;
  --el-table-row-hover-bg-color: rgba(100, 255, 218, 0.1);
  --el-table-border-color: rgba(100, 255, 218, 0.1);
  --el-table-font-color: #ccd6f6;
  --el-table-header-font-color: #64ffda;
  background-color: transparent;
  margin-top: 20px;
}

:deep(.el-table tr) {
  background-color: rgba(17, 34, 64, 0.5);
}

:deep(.el-table th.el-table__cell) {
  background-color: rgba(17, 34, 64, 0.8);
  border-bottom: 2px solid rgba(100, 255, 218, 0.2);
}

:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
}

:deep(.el-button) {
  border-radius: 6px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

:deep(.el-button.el-button--primary) {
  background: linear-gradient(45deg, #0c2d6b, #0053ba);
  border-color: #0053ba;
}

:deep(.el-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
}

:deep(.el-button::after) {
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

:deep(.el-button:hover::after) {
  left: 100%;
  top: 100%;
}

/* 菜单样式优化 */
:deep(.el-menu) {
  background-color: transparent;
  border-bottom: none;
}

:deep(.el-menu-item) {
  color: #ccd6f6;
  font-weight: 500;
  transition: all 0.3s ease;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(100, 255, 218, 0.1);
  color: #64ffda;
}

:deep(.el-menu-item.is-active) {
  color: #64ffda;
  border-bottom: 2px solid #64ffda;
}

.mt-20 {
  margin-top: 20px;
}

/* 为数据表格添加微动画效果 */
:deep(.el-table__row) {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

:deep(.el-table__row:hover) {
  transform: translateX(5px);
  background-color: rgba(100, 255, 218, 0.08) !important;
}

/* 数据表格中的数据样式 */
:deep(.el-table__row td:first-child) {
  color: #64ffda;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
}

/* 页面底部小装饰 */
.el-footer::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.5), transparent);
}
</style> 