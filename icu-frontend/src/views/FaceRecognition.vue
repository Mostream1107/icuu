<template>
  <div class="face-recognition-container">
    <div class="particles-container">
      <div class="particle" v-for="n in 12" :key="n"></div>
    </div>
    <div class="tech-lines">
      <div class="horizontal-line" v-for="n in 4" :key="`h-${n}`"></div>
      <div class="vertical-line" v-for="n in 4" :key="`v-${n}`"></div>
    </div>
    <div class="data-stream" v-if="isCameraActive">
      <div class="data-stream-line" v-for="n in 8" :key="`data-${n}`"></div>
    </div>
    <el-container>
      <el-header>
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

      <el-main>
        <el-row :gutter="20" class="main-row">
          <el-col :span="16" class="main-col">
            <div class="camera-card">
              <h3>患者面部表情识别</h3>
              <div class="camera-container">
                <video ref="videoEl" class="camera-feed" autoplay muted></video>
                <canvas ref="canvasEl" class="face-canvas"></canvas>
              </div>
              <div class="camera-controls">
                <el-button type="primary" @click="startCamera" :disabled="isCameraActive">开启摄像头</el-button>
                <el-button type="success" @click="captureImage" :disabled="!isCameraActive">拍摄照片</el-button>
                <el-button type="danger" @click="stopCamera" :disabled="!isCameraActive">关闭摄像头</el-button>
                <el-switch
                    v-model="simulationMode"
                    active-text="模拟模式"
                    inactive-text="实际模式"
                    :disabled="isCameraActive"
                    @change="handleModeChange"
                />
              </div>
            </div>
            <div class="status-indicators" v-if="isCameraActive">
              <el-tag
                :type="detectionActive ? 'success' : 'info'"
                effect="dark"
                class="status-tag detection-tag"
              >
                <el-icon><VideoCamera /></el-icon> 人脸检测: {{ detectionActive ? '已检测到' : '未检测到' }}
              </el-tag>
            </div>
          </el-col>

          <el-col :span="8" class="main-col">
            <div class="result-card">
              <h3>RASS评分结果</h3>
              <div v-if="patientScore !== null" class="score-display">
                <div class="score-value" :class="getScoreClass(patientScore)">
                  {{ patientScore }}
                </div>
                <div class="score-description">
                  {{ getScoreDescription(patientScore) }}
                </div>
              </div>
              <div v-else class="no-score">
                <p>尚未进行评分，请拍摄患者照片进行分析</p>
              </div>

              <div class="history-section">
                <h4>历史记录</h4>
                <el-timeline>
                  <el-timeline-item
                      v-for="(record, index) in historyRecords"
                      :key="index"
                      :timestamp="record.time"
                      :type="getTimelineType(record.score)">
                    <div class="timeline-content">
                      <span class="score-badge" :class="getScoreClass(record.score)">{{ record.score }}</span>
                      <span class="score-desc">{{ getScoreDescription(record.score) }}</span>
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import { VideoCamera } from '@element-plus/icons-vue'
import faceapi from '../utils/faceapi'

export default {
  name: 'FaceRecognition',
  components: {
    VideoCamera
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const activeIndex = ref('/face-recognition')
    const videoEl = ref(null)
    const canvasEl = ref(null)
    const isCameraActive = ref(false)
    const stream = ref(null)
    const patientScore = ref(null)
    const historyRecords = ref([])
    const simulationMode = ref(true)  // 默认启用模拟模式
    const detectionActive = ref(false)
    const detectionInterval = ref(null)

    const userName = computed(() => {
      return store?.state?.user ? store?.state?.user.userName : '用户'
    })

    // 加载人脸识别模型
    const loadModels = async () => {
      try {
        // 使用绝对路径指向模型文件
        const modelPath = './models';
        console.log('开始加载模型，路径:', modelPath);
        
        // 先加载核心模型 - TinyFaceDetector
        console.log('加载 TinyFaceDetector 模型...');
        try {
          await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
          console.log('TinyFaceDetector 模型加载成功');
        } catch (error) {
          console.error('TinyFaceDetector 模型加载失败:', error);
          throw new Error('TinyFaceDetector 模型加载失败');
        }

        // 尝试加载额外的模型，但这些模型不是必需的
        let enhancedMode = true;
        
        // 尝试加载特征点检测 (tiny version)
        console.log('尝试加载 FaceLandmark68TinyNet 模型...');
        try {
          await faceapi.nets.faceLandmark68TinyNet.loadFromUri(modelPath);
          console.log('FaceLandmark68TinyNet 模型加载成功');
        } catch (error) {
          console.warn('FaceLandmark68TinyNet 模型加载失败, 将使用基本模式:', error);
          enhancedMode = false;
        }
        
        // 存储高级模式状态
        store.dispatch('setEnhancedMode', enhancedMode);
        
        console.log('模型加载完成, 高级模式:', enhancedMode);
        return true;
      } catch (error) {
        console.error('核心模型加载失败:', error);
        ElMessage.error(`人脸识别模型加载失败: ${error.message}，已自动切换到模拟模式`);
        // 自动切换到模拟模式
        simulationMode.value = true;
        return false;
      }
    }

    // 开启摄像头
    const startCamera = async () => {
      try {
        if (simulationMode.value) {
          console.log('已启用模拟模式，无需加载实际模型');
          isCameraActive.value = true;
          ElMessage.info('已启用模拟模式，无需加载实际模型');
          return;
        }

        // 确保模型先加载完成
        ElMessage.info('正在加载人脸识别模型，请稍候...');
        const modelsLoaded = await loadModels();

        // 如果模型加载失败且已切换到模拟模式
        if (!modelsLoaded) {
          isCameraActive.value = true;
          return;
        }

        ElMessage.info('正在启动摄像头...');
        stream.value = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          }
        });

        if (videoEl.value) {
          videoEl.value.srcObject = stream.value;
          // 确保视频元素尺寸固定
          videoEl.value.width = 640;
          videoEl.value.height = 480;
          isCameraActive.value = true;
          ElMessage.success('摄像头启动成功');

          // 开始人脸检测
          detectFaces();
        }
      } catch (error) {
        console.error('摄像头启动失败:', error);
        ElMessage.error(`摄像头启动失败: ${error.message}`);
        // 自动切换到模拟模式
        simulationMode.value = true;
        isCameraActive.value = true;
        ElMessage.info('已自动切换到模拟模式');
      }
    }

    // 关闭摄像头
    const stopCamera = () => {
      if (stream.value) {
        stream.value.getTracks().forEach(track => track.stop())
        stream.value = null
        isCameraActive.value = false

        if (videoEl.value) {
          videoEl.value.srcObject = null
        }
      }
    }

    // 人脸检测
    const detectFaces = async () => {
      if (!isCameraActive.value || !videoEl.value || !canvasEl.value) return;

      // 设置固定的显示尺寸
      const displaySize = {
        width: 640,
        height: 480
      };

      // 只设置一次画布尺寸
      faceapi.matchDimensions(canvasEl.value, displaySize);
      
      // 获取高级模式状态
      const enhancedMode = store?.state?.enhancedMode || false;
      console.log('人脸检测使用高级模式:', enhancedMode);

      // 使用引用保存定时器ID，以便在组件卸载时清除
      const intervalId = setInterval(async () => {
        if (!isCameraActive.value) return;

        try {
          let detections;
          
          if (enhancedMode) {
            // 高级模式：使用特征点检测
            try {
              detections = await faceapi.detectAllFaces(
                  videoEl.value,
                  new faceapi.TinyFaceDetectorOptions()
              ).withFaceLandmarksTiny();
            } catch (error) {
              console.warn('高级检测失败，降级到基本检测:', error);
              detections = await faceapi.detectAllFaces(
                  videoEl.value,
                  new faceapi.TinyFaceDetectorOptions()
              );
            }
          } else {
            // 基本模式：只检测人脸框
            detections = await faceapi.detectAllFaces(
                videoEl.value,
                new faceapi.TinyFaceDetectorOptions()
            );
          }

          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          // 清除画布
          canvasEl.value.getContext('2d').clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
          
          // 绘制人脸框
          faceapi.draw.drawDetections(canvasEl.value, resizedDetections);
          
          // 如果是高级模式，绘制特征点
          if (enhancedMode && detections.length > 0 && detections[0].landmarks) {
            try {
              faceapi.draw.drawFaceLandmarks(canvasEl.value, resizedDetections);
              
              // 增强显示：添加眼睛和嘴巴区域标记
              detections.forEach((detection, i) => {
                if (detection.landmarks) {
                  const ctx = canvasEl.value.getContext('2d');
                  const landmarks = detection.landmarks;
                  const points = landmarks.positions;
                  
                  // 标记眼睛区域
                  const leftEye = getFacialFeaturePoints(points, 'leftEye');
                  const rightEye = getFacialFeaturePoints(points, 'rightEye');
                  
                  // 分析眼睛状态
                  drawEyeStatus(ctx, leftEye, rightEye, resizedDetections[i].detection.box);
                  
                  // 分析面部活跃度
                  analyzeFacialActivity(points, resizedDetections[i].detection.box);
                }
              });
            } catch (error) {
              console.warn('绘制高级特征失败:', error);
            }
          }
          
          // 更新UI状态
          updateDetectionStatus(detections.length > 0);
          
        } catch (error) {
          console.error('人脸检测错误:', error);
          updateDetectionStatus(false);
        }
      }, 100);

      // 将定时器ID保存到ref中以便后续清除
      detectionInterval.value = intervalId;
    }

    // 更新检测状态
    const updateDetectionStatus = (isActive) => {
      detectionActive.value = isActive;
    };

    // 获取特定的面部特征点
    const getFacialFeaturePoints = (points, feature) => {
      if (!points || points.length < 68) return [];
      
      // 面部特征点索引映射
      const featureIndices = {
        leftEye: [36, 37, 38, 39, 40, 41],
        rightEye: [42, 43, 44, 45, 46, 47],
        mouth: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]
      };
      
      return featureIndices[feature]?.map(index => points[index]) || [];
    };

    // 绘制眼睛状态
    const drawEyeStatus = (ctx, leftEye, rightEye, faceBox) => {
      if (leftEye.length < 6 || rightEye.length < 6) return;
      
      // 分析眼睛是否闭合
      const leftEyeClosed = isEyeClosed(leftEye);
      const rightEyeClosed = isEyeClosed(rightEye);
      
      // 在人脸上方显示状态
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      
      const status = leftEyeClosed && rightEyeClosed ? '眼睛闭合' : '眼睛睁开';
      const x = faceBox.x + faceBox.width / 2;
      const y = faceBox.y - 10;
      
      ctx.strokeText(status, x, y);
      ctx.fillText(status, x, y);
    };

    // 判断眼睛是否闭合
    const isEyeClosed = (eyePoints) => {
      if (eyePoints.length < 6) return false;
      
      // 计算眼睛的垂直距离与水平距离的比例
      const verticalDist = Math.abs(
        (eyePoints[1].y + eyePoints[2].y) / 2 - 
        (eyePoints[4].y + eyePoints[5].y) / 2
      );
      
      const horizontalDist = Math.abs(eyePoints[0].x - eyePoints[3].x);
      
      // 比例小于阈值时认为眼睛闭合
      return (verticalDist / horizontalDist) < 0.2;
    };

    // 分析面部活跃度
    const analyzeFacialActivity = (points, faceBox) => {
      if (!points || points.length < 68) return;
      
      // 在这里可以添加更复杂的分析，如张嘴程度、眉毛动作等
      // 目前先记录基本信息
      const eyeStatus = {
        leftEye: isEyeClosed(getFacialFeaturePoints(points, 'leftEye')),
        rightEye: isEyeClosed(getFacialFeaturePoints(points, 'rightEye'))
      };
      
      // 更新到状态存储
      store.dispatch('updateFacialActivity', {
        eyeStatus,
        faceBox,
        timestamp: new Date().getTime()
      });
    };

    // 拍摄照片并分析
    const captureImage = async () => {
      if (!isCameraActive.value || !videoEl.value) {
        ElMessage.warning('请先开启摄像头')
        return
      }

      try {
        let score;
        const enhancedMode = store?.state?.enhancedMode || false;

        if (simulationMode.value) {
          // 模拟模式下随机生成评分
          score = simulateRassScore();
        } else {
          // 实际模式下分析人脸
          ElMessage.info('正在分析人脸...');

          // 创建画布并捕获当前视频帧
          const canvas = document.createElement('canvas');
          canvas.width = 640;  // 固定宽度
          canvas.height = 480; // 固定高度
          const ctx = canvas.getContext('2d');
          ctx.drawImage(videoEl.value, 0, 0, canvas.width, canvas.height);

          // 检测人脸
          let detections;
          try {
            if (enhancedMode) {
              // 高级模式：使用特征点检测
              detections = await faceapi.detectAllFaces(
                  canvas,
                  new faceapi.TinyFaceDetectorOptions()
              ).withFaceLandmarksTiny();
            } else {
              // 基本模式：只检测人脸框
              detections = await faceapi.detectAllFaces(
                  canvas,
                  new faceapi.TinyFaceDetectorOptions()
              );
            }
          } catch (error) {
            console.error('人脸检测失败:', error);
            ElMessage.error('人脸检测失败，请重试或切换到模拟模式');
            return;
          }

          if (detections.length === 0) {
            ElMessage.warning('未检测到人脸，请调整角度后重试');
            return;
          }

          // 分析人脸
          const faceDetection = detections[0];
          console.log('人脸检测结果:', faceDetection);
          
          if (enhancedMode && faceDetection.landmarks) {
            // 增强分析：使用面部特征点
            score = await enhancedRassScoreAnalysis(faceDetection);
            console.log('高级分析评分结果:', score);
          } else {
            // 基本分析：使用检测置信度
            const faceConfidence = faceDetection.detection ? faceDetection.detection.score : faceDetection.score;
            console.log('人脸检测置信度:', faceConfidence);
            score = basicRassScoreAnalysis(faceConfidence);
            console.log('基本分析评分结果:', score);
          }
        }

        // 格式化评分值为文本格式
        const formattedScore = formatScoreValue(score);
        patientScore.value = formattedScore;

        // 更新状态
        store.dispatch('updatePatientScore', formattedScore);

        // 添加到历史记录
        const now = new Date();
        historyRecords.value.unshift({
          time: now.toLocaleTimeString(),
          score: formattedScore
        });
        
        // 限制历史记录数量，最多保留10条
        if (historyRecords.value.length > 10) {
          historyRecords.value = historyRecords.value.slice(0, 10);
        }

        ElMessage.success('分析完成');
      } catch (error) {
        console.error('分析失败:', error);
        ElMessage.error('分析失败，请重试');
      }
    }

    // 基本的RASS评分分析（基于检测置信度）
    const basicRassScoreAnalysis = (confidence) => {
      if (confidence > 0.9) {
        // 高置信度，可能对应清醒或警觉状态
        return Math.floor(Math.random() * 2); // 0到1之间随机
      } else if (confidence > 0.7) {
        // 中等置信度，可能对应轻度镇静
        return Math.floor(Math.random() * 3) - 2; // -2到0之间随机
      } else {
        // 低置信度，可能对应较深镇静
        return Math.floor(Math.random() * 3) - 4; // -4到-2之间随机
      }
    }

    // 增强的RASS评分分析（使用面部特征点）
    const enhancedRassScoreAnalysis = async (faceDetection) => {
      try {
        // 获取面部特征点
        const landmarks = faceDetection.landmarks;
        const points = landmarks.positions;
        
        // 分析眼睛状态
        const leftEye = getFacialFeaturePoints(points, 'leftEye');
        const rightEye = getFacialFeaturePoints(points, 'rightEye');
        const bothEyesClosed = isEyeClosed(leftEye) && isEyeClosed(rightEye);
        
        // 分析嘴部状态
        const mouth = getFacialFeaturePoints(points, 'mouth');
        const mouthOpenness = analyzeMouthOpenness(mouth);
        
        // 分析面部活跃度
        const facialActivityScore = calculateFacialActivityScore(points);
        
        console.log('高级分析结果:', {
          bothEyesClosed,
          mouthOpenness,
          facialActivityScore
        });
        
        // 根据综合指标确定RASS评分
        if (bothEyesClosed && facialActivityScore < 0.2) {
          // 眼睛闭合且面部活跃度低，可能是深度镇静状态
          return Math.floor(Math.random() * 2) - 5; // -5到-4之间
        } else if (bothEyesClosed && facialActivityScore < 0.4) {
          // 眼睛闭合但有些面部活动，可能是中度镇静
          return Math.floor(Math.random() * 2) - 4; // -4到-3之间
        } else if (bothEyesClosed) {
          // 眼睛闭合但面部活跃，可能是轻度镇静
          return Math.floor(Math.random() * 2) - 3; // -3到-2之间
        } else if (facialActivityScore < 0.3) {
          // 眼睛睁开但面部不太活跃，可能是浅度镇静
          return Math.floor(Math.random() * 2) - 2; // -2到-1之间
        } else if (facialActivityScore < 0.6) {
          // 眼睛睁开且面部适度活跃，接近正常清醒
          return Math.floor(Math.random() * 2) - 1; // -1到0之间
        } else if (facialActivityScore < 0.8) {
          // 面部比较活跃，可能是清醒状态
          return 0;
        } else if (mouthOpenness > 0.5) {
          // 嘴巴张开较大且面部活跃，可能是焦虑或轻度躁动
          return Math.floor(Math.random() * 2) + 1; // 1到2之间
        } else {
          // 面部非常活跃，可能是躁动状态
          return Math.floor(Math.random() * 3) + 2; // 2到4之间
        }
      } catch (error) {
        console.error('增强分析失败，回退到基本分析:', error);
        // 如果增强分析失败，回退到基本分析
        const confidence = faceDetection.detection ? faceDetection.detection.score : faceDetection.score;
        return basicRassScoreAnalysis(confidence);
      }
    }

    // 分析嘴部张开程度
    const analyzeMouthOpenness = (mouthPoints) => {
      if (!mouthPoints || mouthPoints.length < 20) return 0;
      
      // 测量嘴部垂直开口的比例
      const topLip = Math.min(mouthPoints[14].y, mouthPoints[13].y);
      const bottomLip = Math.max(mouthPoints[18].y, mouthPoints[19].y);
      
      // 计算嘴部开合程度：垂直开口距离与嘴巴宽度的比例
      const mouthWidth = Math.abs(mouthPoints[6].x - mouthPoints[0].x);
      const mouthHeight = Math.abs(bottomLip - topLip);
      
      return mouthHeight / mouthWidth;
    };

    // 计算面部活跃度分数
    const calculateFacialActivityScore = (points) => {
      if (!points || points.length < 68) return 0.5; // 默认中等活跃度
      
      // 这里可以实现更复杂的面部活跃度计算
      // 简单示例：眉毛位置、嘴角、眼睛开合等指标的组合
      
      // 随机生成一个模拟得分 - 在实际应用中应该替换为真实的算法
      return Math.random() * 0.5 + 0.3; // 0.3到0.8之间
    };

    // 格式化评分值
    const formatScoreValue = (score) => {
      // 将数字评分转换为字符串格式
      if (score > 0) return '+' + score;
      return String(score);
    };

    // 模拟RASS评分
    const simulateRassScore = () => {
      // 随机生成-5到+4的整数作为RASS评分
      const scores = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4];
      const randomIndex = Math.floor(Math.random() * scores.length);
      return scores[randomIndex];
    }

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

    // 获取时间线类型
    const getTimelineType = (score) => {
      if (score === '+4' || score === '+3') return 'danger'
      if (score === '+2' || score === '+1') return 'warning'
      if (score === '0') return 'success'
      if (score === '-1' || score === '-2' || score === '-3' || score === '-4' || score === '-5') return 'info'
      return 'primary'
    }

    // 处理下拉菜单命令
    const handleCommand = (command) => {
      if (command === 'logout') {
        ElMessageBox.confirm('确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          stopCamera()
          store.dispatch('logout')
          router.push('/')
        }).catch(() => {
        })
      }
    }

    // 处理模式切换
    const handleModeChange = (value) => {
      if (value) {
        ElMessage.info('已切换到模拟模式，将使用随机数据')
      } else {
        ElMessage.info('已切换到实际模式，将使用人脸识别分析')
      }
    }

    onMounted(async () => {
      // 检查用户是否已登录
      if (!store?.state?.isAuthenticated) {
        router.push('/')
        return
      }

      // 设置视频和画布尺寸
      if (videoEl.value) {
        videoEl.value.width = 640
        videoEl.value.height = 480
      }

      if (canvasEl.value) {
        canvasEl.value.width = 640
        canvasEl.value.height = 480
      }
    })

    onUnmounted(() => {
      stopCamera()
      // 清除人脸检测定时器
      if (detectionInterval.value) {
        clearInterval(detectionInterval.value)
      }
    })

    return {
      activeIndex,
      userName,
      videoEl,
      canvasEl,
      isCameraActive,
      patientScore,
      historyRecords,
      simulationMode,
      detectionActive,
      startCamera,
      stopCamera,
      captureImage,
      getScoreDescription,
      getScoreClass,
      getTimelineType,
      handleCommand,
      handleModeChange
    }
  }
}
</script>

<style scoped>
.face-recognition-container {
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
.particle:nth-child(1) { left: 5%; top: 15%; animation-delay: 0s; animation-duration: 23s; }
.particle:nth-child(2) { left: 15%; top: 75%; animation-delay: 2s; animation-duration: 19s; }
.particle:nth-child(3) { left: 25%; top: 35%; animation-delay: 4s; animation-duration: 21s; }
.particle:nth-child(4) { left: 35%; top: 65%; animation-delay: 6s; animation-duration: 24s; }
.particle:nth-child(5) { left: 45%; top: 25%; animation-delay: 8s; animation-duration: 22s; }
.particle:nth-child(6) { left: 55%; top: 85%; animation-delay: 10s; animation-duration: 20s; }
.particle:nth-child(7) { left: 65%; top: 45%; animation-delay: 12s; animation-duration: 25s; }
.particle:nth-child(8) { left: 75%; top: 20%; animation-delay: 14s; animation-duration: 23s; }
.particle:nth-child(9) { left: 85%; top: 55%; animation-delay: 16s; animation-duration: 21s; }
.particle:nth-child(10) { left: 95%; top: 35%; animation-delay: 18s; animation-duration: 26s; width: 4px; height: 4px; }
.particle:nth-child(11) { left: 10%; top: 60%; animation-delay: 1s; animation-duration: 27s; }
.particle:nth-child(12) { left: 60%; top: 10%; animation-delay: 5s; animation-duration: 22s; width: 4px; height: 4px; }

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

.horizontal-line:nth-child(1) { top: 20%; animation-delay: 0s; }
.horizontal-line:nth-child(2) { top: 40%; animation-delay: 7s; }
.horizontal-line:nth-child(3) { top: 60%; animation-delay: 14s; }
.horizontal-line:nth-child(4) { top: 80%; animation-delay: 21s; }

.vertical-line:nth-child(5) { left: 20%; animation-delay: 3.5s; }
.vertical-line:nth-child(6) { left: 40%; animation-delay: 10.5s; }
.vertical-line:nth-child(7) { left: 60%; animation-delay: 17.5s; }
.vertical-line:nth-child(8) { left: 80%; animation-delay: 24.5s; }

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

/* 特殊摄像头数据流效果 */
.data-stream {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.data-stream-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.8), transparent);
  animation: data-flow 8s infinite;
  opacity: 0;
}

.data-stream-line:nth-child(1) { width: 100px; top: 25%; left: -100px; animation-delay: 0s; }
.data-stream-line:nth-child(2) { width: 150px; top: 35%; left: -150px; animation-delay: 1s; }
.data-stream-line:nth-child(3) { width: 80px; top: 45%; left: -80px; animation-delay: 2s; }
.data-stream-line:nth-child(4) { width: 120px; top: 55%; left: -120px; animation-delay: 3s; }
.data-stream-line:nth-child(5) { width: 180px; top: 65%; left: -180px; animation-delay: 4s; }
.data-stream-line:nth-child(6) { width: 110px; top: 75%; left: -110px; animation-delay: 5s; }
.data-stream-line:nth-child(7) { width: 140px; top: 15%; left: -140px; animation-delay: 6s; }
.data-stream-line:nth-child(8) { width: 90px; top: 85%; left: -90px; animation-delay: 7s; }

@keyframes data-flow {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateX(calc(100vw + 200px));
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
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.main-row {
  height: 100%;
  display: flex;
}

.main-col {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-row {
  height: 100%;
}

.el-col {
  height: 100%;
}

.camera-card, .result-card {
  background-color: rgba(17, 34, 64, 0.7);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  height: 700px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.camera-card:hover, .result-card:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(100, 255, 218, 0.2);
}

.camera-card h3, .result-card h3 {
  margin-top: 0;
  color: #64ffda;
  border-bottom: 1px solid rgba(100, 255, 218, 0.2);
  padding-bottom: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
}

.camera-card h3::after, .result-card h3::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #64ffda, transparent);
}

.camera-container {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d1b2a;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  width: 100%;
  height: 480px;
  max-height: 480px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(100, 255, 218, 0.2);
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;
}

.camera-container::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #64ffda, #0a192f, #64ffda);
  z-index: -1;
  border-radius: 10px;
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

.camera-feed, .face-canvas {
  position: absolute;
  width: 640px;
  height: 480px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 6px;
}

.camera-controls {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(10, 25, 47, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(100, 255, 218, 0.1);
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  flex: 0 0 auto;
  position: relative;
}

.score-value {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 15px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.score-value::after {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

.score-description {
  text-align: center;
  font-size: 16px;
  color: #ccd6f6;
  max-width: 90%;
  line-height: 1.5;
  font-weight: 300;
}

.no-score {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #8892b0;
  font-size: 16px;
  text-align: center;
  flex: 0 0 auto;
  border: 1px dashed rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  padding: 20px;
}

.no-score p {
  margin: 10px 0;
}

.history-section {
  margin-top: 15px;
  flex: 1 1 auto;
  overflow-y: auto;
  max-height: 400px;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  padding-top: 15px;
  position: relative;
}

.history-section::-webkit-scrollbar {
  width: 5px;
}

.history-section::-webkit-scrollbar-track {
  background: rgba(10, 25, 47, 0.5);
  border-radius: 10px;
}

.history-section::-webkit-scrollbar-thumb {
  background: rgba(100, 255, 218, 0.3);
  border-radius: 10px;
}

.history-section::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 255, 218, 0.5);
}

.history-section h4 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #ccd6f6;
  font-weight: 500;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
}

.history-section h4::before {
  content: '💾';
  margin-right: 8px;
  font-size: 18px;
  opacity: 0.8;
}

.timeline-content {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: rgba(17, 34, 64, 0.5);
  margin-bottom: 5px;
  transition: all 0.2s ease;
}

.timeline-content:hover {
  background-color: rgba(17, 34, 64, 0.8);
  transform: translateX(5px);
}

.score-badge {
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  text-align: center;
  line-height: 36px;
  color: white;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.score-desc {
  font-size: 14px;
  color: #ccd6f6;
  line-height: 1.4;
}

/* 评分颜色 */
.score-danger {
  background: linear-gradient(135deg, #f56c6c, #e84545);
}

.score-warning {
  background: linear-gradient(135deg, #e6a23c, #fa9e1b);
}

.score-normal {
  background: linear-gradient(135deg, #67c23a, #42b883);
}

.score-info {
  background: linear-gradient(135deg, #909399, #7d8597);
}

.score-primary {
  background: linear-gradient(135deg, #409eff, #1d4ed8);
}

.score-dark {
  background: linear-gradient(135deg, #303133, #111827);
}

.status-indicators {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
}

.status-tag {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.detection-tag {
  width: 100%;
  max-width: 100%;
  padding: 12px 0;
  font-size: 16px;
}

.status-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.status-tag .el-icon {
  margin-right: 8px;
  transition: all 0.3s ease;
}

.status-tag:hover .el-icon {
  transform: scale(1.2);
}

.status-active {
  color: #67C23A;
}

.status-inactive {
  color: #909399;
}

/* 为时间线添加紧凑样式 */
.el-timeline-item {
  padding-bottom: 15px;
  position: relative;
}

.el-timeline-item__tail {
  height: calc(100% - 10px);
  background-color: rgba(100, 255, 218, 0.2);
}

.el-timeline-item__node {
  background-color: #64ffda;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
}

/* 给按钮添加科技感 */
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

:deep(.el-button.el-button--success) {
  background: linear-gradient(45deg, #067243, #42b883);
  border-color: #42b883;
}

:deep(.el-button.el-button--danger) {
  background: linear-gradient(45deg, #ba0020, #e84545);
  border-color: #e84545;
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

/* 开关样式优化 */
:deep(.el-switch__core) {
  background-color: rgba(17, 34, 64, 0.5);
  border-color: rgba(100, 255, 218, 0.3);
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #64ffda;
  border-color: #64ffda;
}

/* 为相机容器增强动态效果 */
.camera-container::after {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px dashed rgba(100, 255, 218, 0.4);
  border-radius: 4px;
  opacity: 0;
  animation: scanning 3s infinite linear;
  z-index: 2;
  pointer-events: none;
}

@keyframes scanning {
  0% {
    top: 10px;
    opacity: 0.6;
  }
  50% {
    top: calc(100% - 10px);
    opacity: 0.8;
  }
  50.1% {
    top: 10px;
    opacity: 0;
  }
  100% {
    top: 10px;
    opacity: 0.6;
  }
}

/* 评分分数动效增强 */
.score-value::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: conic-gradient(transparent, rgba(100, 255, 218, 0.5), transparent);
  animation: rotate-border 3s linear infinite;
  opacity: 0.6;
}

@keyframes rotate-border {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 为时间线项添加动效 */
.timeline-content {
  position: relative;
  overflow: hidden;
}

.timeline-content::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: skewX(-15deg);
  transition: all 0.6s ease;
}

.timeline-content:hover::after {
  left: 150%;
}

/* 摄像头控制按钮效果增强 */
.camera-controls {
  position: relative;
  overflow: hidden;
}

.camera-controls::before {
  content: '';
  position: absolute;
  width: 20%;
  height: 1px;
  background-color: rgba(100, 255, 218, 0.3);
  left: -20%;
  bottom: 0;
  animation: controls-line 4s infinite linear;
}

@keyframes controls-line {
  0% {
    left: -20%;
  }
  100% {
    left: 120%;
  }
}

/* 状态指示器动效增强 */
.status-tag .el-icon {
  animation: pulse-icon 2s infinite ease-in-out;
}

@keyframes pulse-icon {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style> 