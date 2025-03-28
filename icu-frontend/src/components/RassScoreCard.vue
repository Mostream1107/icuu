<template>
  <div class="rass-score-card">
    <h3>RASS评分结果</h3>
    <div v-if="score !== null" class="score-display">
      <div class="score-value" :class="getScoreClass(score)">
        {{ score }}
      </div>
      <div class="score-description">
        {{ getScoreDescription(score) }}
      </div>
    </div>
    <div v-else class="no-score">
      <p>尚未进行评分，请拍摄患者照片进行分析</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RassScoreCard',
  props: {
    score: {
      type: String,
      default: null
    }
  },
  setup() {
    // 获取评分描述
    const getScoreDescription = (score) => {
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
    
    // 获取评分样式类
    const getScoreClass = (score) => {
      if (score === '+4' || score === '+3') return 'score-danger'
      if (score === '+2' || score === '+1') return 'score-warning'
      if (score === '0') return 'score-normal'
      if (score === '-1' || score === '-2') return 'score-info'
      if (score === '-3' || score === '-4') return 'score-primary'
      if (score === '-5') return 'score-dark'
      return ''
    }
    
    return {
      getScoreDescription,
      getScoreClass
    }
  }
}
</script>

<style scoped>
.rass-score-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.rass-score-card h3 {
  margin-top: 0;
  color: #303133;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.score-value {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
}

.score-description {
  text-align: center;
  font-size: 16px;
  color: #606266;
}

.no-score {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  color: #909399;
  font-size: 16px;
  text-align: center;
}

/* 评分颜色 */
.score-danger {
  background-color: #F56C6C;
}

.score-warning {
  background-color: #E6A23C;
}

.score-normal {
  background-color: #67C23A;
}

.score-info {
  background-color: #909399;
}

.score-primary {
  background-color: #409EFF;
}

.score-dark {
  background-color: #303133;
}
</style> 