# 人脸识别模型

此目录用于存放face-api.js所需的模型文件。在实际部署前，需要下载以下模型文件并放置在此目录中：

1. tiny_face_detector_model-weights_manifest.json
2. tiny_face_detector_model-shard1
3. face_landmark_68_model-weights_manifest.json
4. face_landmark_68_model-shard1
5. face_recognition_model-weights_manifest.json
6. face_recognition_model-shard1
7. face_expression_model-weights_manifest.json
8. face_expression_model-shard1

## 模型下载

可以从以下GitHub仓库下载模型文件：
https://github.com/justadudewhohacks/face-api.js/tree/master/weights

## 使用说明

这些模型文件用于人脸检测、面部特征点识别、面部微表情分析等功能。在应用程序启动时，会自动加载这些模型。 