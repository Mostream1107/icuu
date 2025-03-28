<!--  模拟剪头拖动效果  -->
<template>
       <!--SVG 中的 <g> 元素是一个容器，它可以用来组合多个 SVG 元素。在这里，它用作连线和箭头的容器。-->
       <g>
          <!--元素用来创建路径，它通常用于绘制直线、曲线、圆弧等。在这里，它用来绘制连线的路径，通过 :d 属性绑定了一个动态生成的路径数据，这个路径数据是通过 dragLinkPath() 方法计算得到的。-->
          <path
          class="connector only-watch-el"
          :d="dragLinkPath()"
          ></path>
          <!--它用来表示连线的起始点，通过绑定 :cx 和 :cy 属性来确定起始点的坐标，r 属性设置圆的半径。-->
          <circle :cx="this.dragLink.fromX" :cy="this.dragLink.fromY" r="5"
            style="stroke:#006600;
            stroke-width: 2;
            fill:#CCCCCC"/>
          <!--<polyline> 元素用来绘制一条折线，通常用于表示箭头等形状。在这里，它用来绘制箭头，通过绑定 :points 属性来确定折线的坐标点，这个坐标点是通过 computedArrow() 方法计算得到的。-->
          <polyline class="only-watch-el" :points="computedArrow()"
          style="stroke:#d71627;"/>
        </g>
</template>
<script>
export default {
  props: {
    dragLink: {
      type: Object
    }
  },
  methods: {
    dragLinkPath() {
      const { fromX, fromY, toX, toY } = this.dragLink;
      if (this.isVertical()) {
        return `M ${fromX} ${fromY}  Q ${fromX} ${fromY + 50} ${(toX + fromX) /
        2} ${(fromY + toY) / 2} T ${toX} ${toY}`;
      } else {
        return `M ${fromX} ${fromY} Q ${fromX + 30} ${fromY}  ${(toX + fromX) /
        2} ${(fromY + toY) / 2} T ${toX} ${toY}`;
      }
    },
    computedArrow() {
      // 计算箭头坐标
      const { toX, toY } = this.dragLink;
      if (this.isVertical()) {
        return `${toX} ${toY} ${toX - 3} ${toY - 6} ${toX + 3} ${toY - 6}`;
      } else {
        return `${toX - 3} ${toY + 3} ${toX} ${toY} ${toX - 3} ${toY - 3}`;
      }
    },
    isVertical() {
      let GlobalConfig = { isVertical: true }
      let _GlobalConfig = localStorage.getItem('GlobalConfig')
      if (_GlobalConfig && _GlobalConfig.length > 0) {
        GlobalConfig = Object.assign(GlobalConfig, JSON.parse(_GlobalConfig))
      }
      return GlobalConfig.isVertical
    }
  }
};
</script>

<style  scoped>
.connector {
  stroke: hsla(0, 0%, 50%, 0.6);
  stroke-width: 2px;
  fill: none;
}
.only-watch-el {
  pointer-events: none;
}
.dragLinkArrows {
  border-top: 4px solid black;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  z-index: -10;
}
</style>
