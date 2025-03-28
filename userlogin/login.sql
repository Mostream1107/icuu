/*
 Navicat Premium Data Transfer

 Source Server         : docker-mysql8
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : 127.0.0.1:3306
 Source Schema         : login

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 24/03/2024 17:17:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for download_record
-- ----------------------------
DROP TABLE IF EXISTS `download_record`;
CREATE TABLE `download_record`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_name` int(0) NULL DEFAULT NULL COMMENT 'login表的id信息',
  `time` datetime(0) NULL DEFAULT NULL COMMENT '下载时间',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '下载内容',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '下载名称',
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '超参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of download_record
-- ----------------------------
INSERT INTO `download_record` VALUES (1, 1, '2024-03-24 15:20:15', '# Ultralytics YOLO 🚀, AGPL-3.0 license\n# YOLOv8目标检测模型，具有P3-P5输出。使用示例请参见 https://docs.ultralytics.com/tasks/detect\n\n# Parameters\nnc: 80  # 类别数目\n\nscales: # 模型复合缩放常数，例如 \'model=yolov8n.yaml\' 将调用带有 \'n\' 缩放的 yolov8.yaml\n # [depth, width, max_channels]\n  n: [0.33, 0.25, 1024]  # YOLOv8n概览：225层, 3157200参数, 3157184梯度, 8.9 GFLOPs\n  s: [0.33, 0.50, 1024]  # YOLOv8s概览：225层, 11166560参数, 11166544梯度, 28.8 GFLOPs\n  m: [0.67, 0.75, 768]   # YOLOv8m概览：295层, 25902640参数, 25902624梯度, 79.3 GFLOPs\n  l: [1.00, 1.00, 512]   # YOLOv8l概览：365层, 43691520参数, 43691504梯度, 165.7 GFLOPs\n  x: [1.00, 1.25, 512]   # YOLOv8x概览：365层, 68229648参数, 68229632梯度, 258.5 GFLOPs\n\n\n# YOLOv8.0n骨架\nbackbone:\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, SPPF, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 6], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 4], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [[-1, 12], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , Detect, [2, 1]]\n\n# YOLOv8.0n头部\nhead:\n\n', '123', '11');
INSERT INTO `download_record` VALUES (2, 1, '2024-03-24 16:55:01', '# Ultralytics YOLO 🚀, AGPL-3.0 license\n# YOLOv8目标检测模型，具有P3-P5输出。使用示例请参见 https://docs.ultralytics.com/tasks/detect\n\n# Parameters\nnc: 80  # 类别数目\n\nscales: # 模型复合缩放常数，例如 \'model=yolov8n.yaml\' 将调用带有 \'n\' 缩放的 yolov8.yaml\n # [depth, width, max_channels]\n  n: [0.33, 0.25, 1024]  # YOLOv8n概览：225层, 3157200参数, 3157184梯度, 8.9 GFLOPs\n  s: [0.33, 0.50, 1024]  # YOLOv8s概览：225层, 11166560参数, 11166544梯度, 28.8 GFLOPs\n  m: [0.67, 0.75, 768]   # YOLOv8m概览：295层, 25902640参数, 25902624梯度, 79.3 GFLOPs\n  l: [1.00, 1.00, 512]   # YOLOv8l概览：365层, 43691520参数, 43691504梯度, 165.7 GFLOPs\n  x: [1.00, 1.25, 512]   # YOLOv8x概览：365层, 68229648参数, 68229632梯度, 258.5 GFLOPs\n\n\n# YOLOv8.0n骨架\nbackbone:\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, SPPF, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 6], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 4], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [[-1, 12], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , Detect, [2, 1]]\n\n# YOLOv8.0n头部\nhead:\n\n', '666', 'lr0');
INSERT INTO `download_record` VALUES (3, 1, '2024-03-24 16:55:57', '# Ultralytics YOLO 🚀, AGPL-3.0 license\n# YOLOv8目标检测模型，具有P3-P5输出。使用示例请参见 https://docs.ultralytics.com/tasks/detect\n\n# Parameters\nnc: 80  # 类别数目\n\nscales: # 模型复合缩放常数，例如 \'model=yolov8n.yaml\' 将调用带有 \'n\' 缩放的 yolov8.yaml\n # [depth, width, max_channels]\n  n: [0.33, 0.25, 1024]  # YOLOv8n概览：225层, 3157200参数, 3157184梯度, 8.9 GFLOPs\n  s: [0.33, 0.50, 1024]  # YOLOv8s概览：225层, 11166560参数, 11166544梯度, 28.8 GFLOPs\n  m: [0.67, 0.75, 768]   # YOLOv8m概览：295层, 25902640参数, 25902624梯度, 79.3 GFLOPs\n  l: [1.00, 1.00, 512]   # YOLOv8l概览：365层, 43691520参数, 43691504梯度, 165.7 GFLOPs\n  x: [1.00, 1.25, 512]   # YOLOv8x概览：365层, 68229648参数, 68229632梯度, 258.5 GFLOPs\n\n\n# YOLOv8.0n骨架\nbackbone:\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, SPPF, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 6], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 4], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [[-1, 12], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , Detect, [2, 1]]\n\n# YOLOv8.0n头部\nhead:\n\n', '222', 'weight_decay');
INSERT INTO `download_record` VALUES (4, 1, '2024-03-24 16:56:05', '# Ultralytics YOLO 🚀, AGPL-3.0 license\n# YOLOv8目标检测模型，具有P3-P5输出。使用示例请参见 https://docs.ultralytics.com/tasks/detect\n\n# Parameters\nnc: 80  # 类别数目\n\nscales: # 模型复合缩放常数，例如 \'model=yolov8n.yaml\' 将调用带有 \'n\' 缩放的 yolov8.yaml\n # [depth, width, max_channels]\n  n: [0.33, 0.25, 1024]  # YOLOv8n概览：225层, 3157200参数, 3157184梯度, 8.9 GFLOPs\n  s: [0.33, 0.50, 1024]  # YOLOv8s概览：225层, 11166560参数, 11166544梯度, 28.8 GFLOPs\n  m: [0.67, 0.75, 768]   # YOLOv8m概览：295层, 25902640参数, 25902624梯度, 79.3 GFLOPs\n  l: [1.00, 1.00, 512]   # YOLOv8l概览：365层, 43691520参数, 43691504梯度, 165.7 GFLOPs\n  x: [1.00, 1.25, 512]   # YOLOv8x概览：365层, 68229648参数, 68229632梯度, 258.5 GFLOPs\n\n\n# YOLOv8.0n骨架\nbackbone:\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, SPPF, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 6], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , nn.Upsample, [2, 1]]\n  - [[-1, 4], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, 1, Conv, [1, 3, 2]]\n  - [[-1, 12], 1, Concat, [2, 1]]\n  - [-1, 3, C2f, [1, 1]]\n  - [-1, , Detect, [2, 1]]\n\n# YOLOv8.0n头部\nhead:\n\n', '333', 'dfl');

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `pass_word` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES (4, '1', '1');

SET FOREIGN_KEY_CHECKS = 1;
