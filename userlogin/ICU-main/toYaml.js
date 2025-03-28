// const fs = require('fs');
import fs from 'fs';


// 示例数据结构
const data = {
    head: [
        [-1, 1, 'nn.Upsample', ['null', 2, 'nearest']],
        [[-1, 6], 1, 'Concat', [1]],
        [-1, 3, 'C2f', [512]],
        // 其他 head 数据项...
    ],
    backbone: [
        [-1, 1, 'Conv', [64, 3, 2]],
        [-1, 1, 'Conv', [128, 3, 2]],
        [-1, 3, 'C2f', [128, true]],
        // 其他 backbone 数据项...
    ],
};
const hyper_parameter= [
    {label:'nc', value:80, state:false, step:1},
    {label:'lr0', value:0.01, state:false, step:0.0001},
    {label:'lrf', value:0.01, state:false, step:0.0001},
    {label:'momentum', value:0.937, state:false, step:0.0001},
    {label:'weight_decay', value:0.0005, state:false, step:0.0001},
    {label:'warmup_epochs', value:3.0, state:false, step:0.0001},
    {label:'warmup_momentum', value:0.8, state:false, step:0.0001},
    {label:'warmup_bias_lr', value:0.1, state:false, step:0.0001},
    {label:'box', value:7.5, state:false, step:0.0001},
    {label:'cls', value:0.5, state:false, step:0.0001},
    {label:'dfl', value:1.5, state:false, step:0.0001},
    {label:'pose', value:12.0, state:false, step:0.0001},
    {label:'kobj', value:1.0, state:false, step:0.0001},
    {label:'label_smoothing', value:0.0, state:false, step:0.0001},
    {label:'nbs', value:64, state:false, step:0.0001},
    {label:'hsv_h', value:0.015, state:false, step:0.0001},
    {label:'hsv_s', value:0.7, state:false, step:0.0001},
    {label:'hsv_v', value:0.4, state:false, step:0.0001},
    {label:'degrees', value:0.0, state:false, step:0.0001},
    {label:'translate', value:0.1, state:false, step:0.0001},
    {label:'scale', value:0.5, state:false, step:0.0001},
    {label:'shear', value:0.0, state:false, step:0.0001},
    {label:'perspective', value:0.0, state:false, step:0.0001},
    {label:'flipud', value:0.0, state:false, step:0.0001},
    {label:'fliplr', value:0.5, state:false, step:0.0001},
    {label:'mosaic', value:1.0, state:false, step:0.0001},
    {label:'mixup', value:0.0, state:false, step:0.0001},
    {label:'copy_paste', value:0.0, state:false, step:0.0001},
    {label:'auto_augment', value:'randaugment', state:false,options:[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'randaugument', value: 'randaugument'}
        ], step:0.0001},
    {label:'erasing', value:0.4, state:false, step:0.0001},
    {label:'crop_fraction', value:1.0, state:false, step:0.0001},
]
// 转换为 YOLOv8 配置文件形式的函数
function convertToYoloV8Config(data, hyper_parameter) {
    const yoloV8Config = `# Ultralytics YOLO 🚀, AGPL-3.0 license
# YOLOv8目标检测模型，具有P3-P5输出。使用示例请参见 https://docs.ultralytics.com/tasks/detect

# Parameters
nc: ${hyper_parameter.find(param => param.label === 'nc').value}  # 类别数目

scales: # 模型复合缩放常数，例如 'model=yolov8n.yaml' 将调用带有 'n' 缩放的 yolov8.yaml
 # [depth, width, max_channels]
  n: [0.33, 0.25, 1024]  # YOLOv8n概览：225层, 3157200参数, 3157184梯度, 8.9 GFLOPs
  s: [0.33, 0.50, 1024]  # YOLOv8s概览：225层, 11166560参数, 11166544梯度, 28.8 GFLOPs
  m: [0.67, 0.75, 768]   # YOLOv8m概览：295层, 25902640参数, 25902624梯度, 79.3 GFLOPs
  l: [1.00, 1.00, 512]   # YOLOv8l概览：365层, 43691520参数, 43691504梯度, 165.7 GFLOPs
  x: [1.00, 1.25, 512]   # YOLOv8x概览：365层, 68229648参数, 68229632梯度, 258.5 GFLOPs


# YOLOv8.0n骨架
backbone:
${data.backbone.map(item => `  - [${item.map(innerItem => Array.isArray(innerItem) ? `[${innerItem.join(', ')}]` : innerItem).join(', ')}]`).join('\n')}

# YOLOv8.0n头部
head:
${data.head.map(item => `  - [${item.map(innerItem => Array.isArray(innerItem) ? `[${innerItem.join(', ')}]` : innerItem).join(', ')}]`).join('\n')}

`;

    return yoloV8Config;
}
// 将数据写入 YAML 文件
function writeYamlFile(data, filePath) {
    const yoloV8Config = convertToYoloV8Config(data,hyper_parameter);
    fs.writeFileSync(filePath, yoloV8Config);
}

// 写入 YAML 文件
writeYamlFile(data, 'yolov8_config.yaml');
