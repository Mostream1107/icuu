<!-- 这里是拖入节点时的模拟元素 -->
<template>
  <div class="nodesBus-contain" :style="{left: this.pos_x + 90 + 'px', top: this.pos_y + 30 + 'px' }">
    <div class="nodesBus">
      <span class="icon"></span>
      <span class="name">{{ value }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NodeBus',
  props: {
    value: {
      type: String,
      default: "传入内容"
    },
    pos_x: {
      type: Number
    },
    pos_y: {
      type: Number
    }
  },
  data() {
    return {
      name: this.value,
      left: this.pos_x,
      top: this.pos_y
    };
  }
};
</script>

<style scoped>
/* .nodesBus-contain 样式 */
.nodesBus-contain {
    box-sizing: border-box; /* 使用 border-box 盒模型，元素的宽度和高度包括内边距和边框，但不包括外边距 */
    width: 10px; /* 设置容器的宽度为 10px */
    height: 10px; /* 设置容器的高度为 10px */
    position: absolute; /* 设置容器的定位方式为绝对定位，相对于其最近的已定位（非 static）祖先元素定位 */
}

/* .nodesBus 样式 */
.nodesBus {
    box-sizing: border-box; /* 使用 border-box 盒模型 */
    transform: translate(-180px, -45px); /* 将节点向左移动 180px，向上移动 45px，用于调整节点在容器中的位置 */
    width: 180px; /* 设置节点的宽度为 180px */
    height: 30px; /* 设置节点的高度为 30px */
    background-color: rgba(255, 255, 255, 0.9); /* 设置节点的背景颜色为白色，并且透明度为 0.9 */
    border: 1px solid #289de9; /* 设置节点的边框为 1px 宽度的实线边框，颜色为 #289de9 */
    border-radius: 15px; /* 设置节点的边框圆角半径为 15px */
    font-size: 12px; /* 设置节点中文本的字体大小为 12px */
    -webkit-transition: background-color 0.2s; /* 使用 0.2 秒的过渡效果，当背景颜色发生变化时 */
    transition: background-color 0.2s; /* 使用 0.2 秒的过渡效果，当背景颜色发生变化时 */
    position: absolute; /* 设置节点的定位方式为绝对定位 */
    pointer-events: none; /* 设置节点不接受鼠标事件，这样可以保证鼠标事件能够穿透节点到达下面的元素 */
}

/* .nodesBus .icon 样式 */
.nodesBus .icon {
    width: 26px; /* 设置图标的宽度为 26px */
    height: 26px; /* 设置图标的高度为 26px */
    margin: 1px; /* 设置图标的外边距为 1px */
    border-radius: 100%; /* 设置图标的边框为圆形 */
    float: left; /* 设置图标向左浮动 */
    color: #fff; /* 设置图标的文字颜色为白色 */
    font-size: 16px; /* 设置图标的字体大小为 16px */
    background-color: #289de9; /* 设置图标的背景颜色为 #289de9 */
    cursor: pointer; /* 设置鼠标悬停在图标上时显示为手型指针 */
}

/* .nodesBus .name 样式 */
.nodesBus .name {
    float: left; /* 设置文本向左浮动 */
    margin-left: 2px; /* 设置文本的左外边距为 2px */
    width: 135px; /* 设置文本的宽度为 135px */
    height: 28px; /* 设置文本的高度为 28px */
    line-height: 28px; /* 设置文本的行高为 28px */
    font-size: 14px; /* 设置文本的字体大小为 14px */
    overflow: hidden; /* 当文本溢出容器时隐藏溢出部分 */
    text-overflow: ellipsis; /* 当文本溢出时显示省略号 */
    white-space: nowrap; /* 不换行显示文本 */
    cursor: pointer; /* 设置鼠标悬停在文本上时显示为手型指针 */
    user-select: none; /* 禁止用户选择文本 */
}

</style>
