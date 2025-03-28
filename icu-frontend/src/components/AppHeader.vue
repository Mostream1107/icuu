<template>
  <el-header class="app-header">
    <div class="header-logo">
      <h2>智能ICU系统</h2>
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
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'AppHeader',
  props: {
    activeIndex: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    
    const userName = computed(() => {
      return store?.state?.user ? store?.state?.user.userName : '用户'
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
    
    return {
      userName,
      handleCommand
    }
  }
}
</script>

<style scoped>
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.header-logo h2 {
  margin: 0;
  color: #409EFF;
}

.header-user {
  cursor: pointer;
}

.el-dropdown-link {
  color: #606266;
  font-size: 14px;
}
</style> 