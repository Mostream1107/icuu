<!-- 纯净版示范 -->
<template>
  <!-- 最外层容器监mouse系列事件, 用来做节点拖拽 -->
  <div
    class="diagramExample"
    @mousedown="startNodesBus($event)"
    @mousemove="moveNodesBus($event)"
    @mouseup="endNodesBus($event)"
  >

    <!-- 左侧导航 -->
    <ul class="page-left" :class="{'show':showSidebar}" style="overflow: auto">
      <div
        class="basic-node"
        v-for="(item, i) in initNodesBasic"
        :key="'nodes_basic' + i"
        @mousedown="dragIt(item)"
      >
        {{ item.name }}
      </div>
    </ul>

    <!-- 顶栏 -->
<!--<div class="headbar">顶栏可以放一些button, 比如发布模型, 保存模型等</div>-->
      <el-menu
              :default-active="activeIndex2"
              class="headbar"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
          <el-icon style="width: 60px"><Opportunity style="font-size: 40px; margin-top:35px; color: floralwhite"/></el-icon>

          <el-menu-item index="1">搭建中心</el-menu-item>

          <el-menu-item index="2" @click="this.$router.push('/GPT');">GPT</el-menu-item>

          <el-menu-item index="3" disabled>消息中心</el-menu-item>

          <el-menu-item index="4" @click="this.$router.push('/platform');">可视化中心</el-menu-item>

<!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->

          <el-menu-item index="5" @click="this.showSidebar = !this.showSidebar">节点</el-menu-item>

          <el-menu-item index="6" @click="this.$router.push('/center');">个人中心</el-menu-item>

          <hyper-parameter-dialog
                  :hyper-parameter="hyperParameterTemp"
                  @exportYaml="exportYaml">
          </hyper-parameter-dialog>
      </el-menu>

    <!-- 右侧表单 -->
<!--    <div class="right-form">-->
<!--      <div class="title">这里是编辑区域, 选中节点进行编辑</div>-->
<!--      <el-form-->
<!--        v-if="formDetail.currentEditNodeId"-->
<!--        ref="form"-->
<!--        :model="formDetail.form"-->
<!--        label-width="80px"-->
<!--      >-->
<!--        <el-form-item label="节点描述">-->
<!--          <el-input v-model="formDetail.form.details"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="生成时间">-->
<!--          <el-input v-model="formDetail.form.createTime"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">保存变更</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <el-form ref="autoLayout" :model="formDetail.layout" label-width="80px">-->
<!--        <div class="title">前端自动布局体验</div>-->
<!--        <el-form-item label="节点数量">-->
<!--          <el-input type="number" v-model="formDetail.form.nodes"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="连线数量">-->
<!--          <el-input type="number" v-model="formDetail.form.sides"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="generate">生成新图</el-button>-->
<!--          <el-button type="primary" @click="autoLayout">自动布局</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
      <!--参数设置表单-->
      <el-drawer v-model="drawer" :direction="direction" size="400px" >
          <template #header>
              <h2>设置模块参数</h2>
          </template>
          <template #default>
              <el-divider>
                  <el-icon><Tools /></el-icon>
              </el-divider>
              <el-form :model="formDetail.arg" label-width="200px" label-position="left" style="font-family: 黑体; font-size:25px;">
                  <h5>模块名称：{{formDetail.name}}</h5>
                  <template v-for="param in formDetail.arg" :key="param.label">
                      <el-form-item :label=param.label>
                          <template v-if="typeof param.value === 'boolean' || typeof param.value === 'string'">
                              <el-select v-model="param.value" class="mx-4" style="width: 170px">
                                  <el-option v-for="option in param.options" :key="option.value" :label="option.label" :value="option.value" />
                              </el-select>
                          </template>
                          <template v-else>
                              <el-input-number v-model="param.value" class="mx-4" :min="0" controls-position="right" :step="param.step"/>
                          </template>
                      </el-form-item>
                  </template>
<!--                  <el-form-item  v-if="formDetail.arg.hasOwnProperty('n')" label="循环次数n" prop="n" >-->
<!--                      <el-input-number v-model="formDetail.arg.n" class="mx-4" :min="1" controls-position="right"/>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item v-if="formDetail.arg.hasOwnProperty('channel')" label="输出管道数channel" prop="channel">-->
<!--                      <el-input-number v-model="formDetail.arg.channel" class="mx-4" :min="1" controls-position="right"/>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item v-if="formDetail.arg.hasOwnProperty('kernel_size')" label="卷积核大小kernel_size" prop="kernel_size">-->
<!--                      <el-input-number v-model="formDetail.arg.kernel_size" class="mx-4" :min="1" controls-position="right"/>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item v-if="formDetail.arg.hasOwnProperty('stride')" label="步长stride" prop="stride">-->
<!--                      <el-input-number v-model="formDetail.arg.stride" class="mx-4" :min="1" controls-position="right"/>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item v-if="formDetail.arg.hasOwnProperty('padding')" label="填充大小padding" prop="padding">-->
<!--                      <el-input-number v-model="formDetail.arg.padding" class="mx-4" :min="0" controls-position="right"/>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item v-if="formDetail.arg.hasOwnProperty('bias')" label="偏差bias" prop="padding">-->
<!--                      <el-input-number v-model="formDetail.arg.bias" class="mx-4" :min="0" controls-position="right"/>-->
<!--                  </el-form-item>-->
                  <el-form-item label="模块位置modelPosition">
                      <el-select v-model="formDetail.pos" class="m-2" placeholder="Select" size="large" style="width: 240px">
                          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                      </el-select>
                  </el-form-item>
              </el-form>
              <el-divider content-position="center" style="font-family: 黑体; font-size:2px;">ToMore</el-divider>
          </template>
          <template #footer>
              <div style="flex: auto">
                  <el-button @click="this.drawer=false">取消</el-button>
                  <el-button type="primary" @click="confirmClick">保存</el-button>
              </div>
          </template>
      </el-drawer>
      <!--超参数设置表单-->


    <!-- DAG-Diagram主体 -->
    <DAGBoard
      ref="DAGBoard"
      :DataAll="yourJSONDataFillThere"
      @updateDAG="updateDAG"
      @editNodeDetails="editNodeDetails"
      @doSthPersonal="doSthPersonal"
    ></DAGBoard>

    <!-- 用来模拟拖拽添加的元素 -->
    <node-bus
      v-if="dragBus"
      :value="busValue.value"
      :pos_x="busValue.pos_x"
      :pos_y="busValue.pos_y"
    />

  </div>
</template>

<script>
import { hyper_parameter,diagramExampleData, JSONFromService, nodesBasic } from './data.js'
import { convertToYoloV8Config } from './function.js'
import {ElMessageBox, ElNotification} from "element-plus";
import {ElMessage} from "element-plus";
import hyperParameterDialog from "../../../plugin/FormAndDialog/hyperParameterDialog.vue";
import jsdom from "js-yaml";
import yaml  from 'js-yaml' // 引入 js-yaml
import Cookies from 'js-cookie';
let cnt,head,len,num,next,to,ru,cu,ruNum,dp,rfa,index,check,vis;
export default {
  components: {
      hyperParameterDialog
  },
  props: {},
  data () {
    return {
        toYamle:null,
        hyperParameterTemp:null,
      options:[{
          value:'head',
          label:'head'
        },{
          value:'backbone',
          label:'backbone'
      }
      ],
      direction:'rtl',
      drawer:false,
      showSidebar: false,
      activeIndex2: '1',
      data: this.diagramExampleData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      initNodesBasic: nodesBasic,
      // 以下为svg必要内容
      dragBus: false, // 是否在拖拽,
      yourJSONDataFillThere: { // 用来展示的节点与连线
        nodes: [],
        sides: []
      },
      // 以下为拖拽方式添加节点必须内容
      busValue: {
        value: "name",
        pos_x: 100,
        pos_y: 100
      },
      // 以下为表单展示数据
      formDetail: {
        id: null,
        form: {
          sides: 100,
          nodes: 100
        },
        arg:{
        },
        name:null,
        pos:null
      },
      // 监听的事件
      onkeydown: null,
      // 复制的内容
      copyContent: []
    }
  },
  created () {
    this.loadJSON()
    this.onkeydown = document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 'c') {
        // 按下ctrl + c
        this.ctrlC()
      } else if (e.ctrlKey && e.key === 'v') {
        // 按下ctrl + v
        this.ctrlV()
      }
    })
  },
  mounted () {

  },
  beforeDestroy () {
    this.onkeydown = null // 销毁事件
  },
  methods: {
      confirmClick(){
          const {id, arg, pos} = this.formDetail
          this.yourJSONDataFillThere.nodes.forEach(item => {if (item.id === id) {
              item.arg = {...arg}
              item.pos = pos
          }})
          ElMessage({message: '配置保存成功！',type: 'success',})
          this.drawer = false;
      },
    handleSelect(key, keyPath) {
          console.log(key, keyPath);
     },
    generate () { // 生成随机图
      const nodesNumber = this.formDetail.form.nodes || 100; // 节点数量
      const sidesNumber = this.formDetail.form.sides || 100; // 边的数量
      const GRAPH_WIDTH = (nodesNumber > 100 ? nodesNumber : 100) * 10; // 图的宽度
      const GRAPH_HEIGHT = (nodesNumber > 100 ? nodesNumber : 100) * 10; // 图的高度
      const newGraphNodes = [];
      const newGraphSides = [];
      this.yourJSONDataFillThere = {
        nodes: [],
        edges: []
      }
      // step1 生成节点
      const generatePosition = () => { // 生成坐标
        const PosX = (Math.random() * GRAPH_WIDTH).toFixed();
        const PosY = (Math.random() * GRAPH_HEIGHT).toFixed();
        return {
          pos_x: Number(PosX),
          pos_y: Number(PosY)
        }
      }
      for (let nodeIndex = 0; nodeIndex < nodesNumber; nodeIndex++) {
        const eachGraphNode = {
          "id": nodeIndex + 1,
          "in_ports": [0],
          "name": `NODE_${nodeIndex}`,
          "out_ports": [0],
          "detail": [],
          ...generatePosition()
        }
        newGraphNodes.push(eachGraphNode);
      }
      this.yourJSONDataFillThere.nodes = newGraphNodes
      // step2 生成边 因为id是有序的,所以这里id范围根据节点生成
      const generateNodeEntry = (nodesMax) => { return (Math.random() * nodesMax).toFixed(); }
      for (let sideIndex = 0; sideIndex < sidesNumber; sideIndex++) {
        const eachSide = {
          "dst_input_idx": 0,
          "dst_node_id": Number(generateNodeEntry(nodesNumber)) || 1,
          "id": sideIndex + 1,
          "src_node_id": Number(generateNodeEntry(nodesNumber)) || 1,
          "src_output_idx": 0,
          "edgesText": ""
        }
        if (eachSide.dst_node_id !== eachSide.src_node_id) {
          newGraphSides.push(eachSide);
        }
      }
      this.yourJSONDataFillThere.edges = newGraphSides
      console.log(JSON.stringify(this.yourJSONDataFillThere, null, 4))
    },
    autoLayout () { // 自动布局
      const allSidesArr = this.yourJSONDataFillThere.edges.map(i => [i.src_node_id, i.dst_node_id]); // [[1,2], [2,3]]
      const connectTest = (a, b) => { // 测试关联 [1, 2], [2, 3]
        if (a[0] === b[1] || b[0] === a[1] || a[0] === b[0] || a[1] === b[1]) {
          return true
        } else {
          return false
        }
      }
      let arrSeparate = [[allSidesArr.shift()]];
      const testArr = (allSidesArr) => { // 递归检测连线的关系,把有关联的连线放在一起
        for (let i = 0; i < arrSeparate[arrSeparate.length - 1].length; i++) {
          for (let j = 0; j < allSidesArr.length; j++) {
            if (connectTest(arrSeparate[arrSeparate.length - 1][i], allSidesArr[j])) { // 建立关联,放入分组
              arrSeparate[arrSeparate.length - 1] = arrSeparate[arrSeparate.length - 1].concat(allSidesArr.splice(j, 1));
              testArr(allSidesArr) // 递归
              return false;
            }
          }
        }
        // 循环完毕仍然有数据的话, 放入第二个数组
        if (allSidesArr.length) {
          arrSeparate.push(allSidesArr.shift());
          testArr(allSidesArr);
        }
      }
      testArr(allSidesArr)
      console.log("整理好的数据", arrSeparate)
      // while (arrSeparate.length) { // 递归画所有的关系图
      //   this.drawSingleGraph(arrSeparate.shift());
      // }
      this.drawSingleGraph(arrSeparate.shift()); // 先画一个
    },
    unique (arr) { // 数组去重
      return Array.from(new Set(arr))
    },
    drawSingleGraph (graphArr) {
      const left = graphArr.map(v => v[0]); // 出口集合
      const right = graphArr.map(v => v[1]); // 入口集合
      const result = [[]];
      // 寻找最上层节点 只有出口没有入口的都是顶点
      result[0] = left.filter(v => right.indexOf(v) === -1);
      // 没有上类节点的图证明成环,放弃渲染 有顶点才会渲染
      let recursionArr = graphArr // 全部数组  [[1,2], [2,3], [3,4]]...
      if (result[0].length) {
        result[0] = this.unique(result[0]);
        while (recursionArr.length) { // 剩余连线存在就一直递归
          // recursionArr = graphArr.filter(eachArr => result[0].indexOf(eachArr[0]) === -1); // 更新剩余的边
          let nextLevelNodesArr = []
          result[result.length - 1].map(sourceFromId => { // 当前循环到的层级
            recursionArr.map(eachArr => {
              if (result[result.length - 1].indexOf(eachArr[0]) > -1) { // 检测到入口对应的边,把出口id放入数组下一级
                 nextLevelNodesArr.push(eachArr[1])
              }
            })
          })
          recursionArr = recursionArr.filter(eachArr => result[result.length - 1].indexOf(eachArr[0]) === -1)// 更新剩余的边
          if (nextLevelNodesArr.length) {
            nextLevelNodesArr = this.unique(nextLevelNodesArr);
            result[result.length] = nextLevelNodesArr
          }
        }
      }
      debugger
      this.draw(result);
    },
    draw(nodesIdArr) {
      const newNodesJSON = [];
      const CANVAS_WIDTH = 1440;
      const EACH_LEVEL_HIGH = 300;
      this.yourJSONDataFillThere.nodes.map(v => {
        v.pos_x = -1000;
        v.pox_y = 0;
      })
      nodesIdArr.forEach((row, rowIndex) => {
        row.map((curId, curIndex) => {
          const aim = this.yourJSONDataFillThere.nodes.find(v => v.id === curId);
          aim.pos_x = (CANVAS_WIDTH / row.length + 1) * (curIndex + 1);
          aim.pos_y = EACH_LEVEL_HIGH * (rowIndex + 1);
        })
      })
    },
    ctrlC () {
      let currentChoice = this.$refs.DAGBoard.choice
      if (currentChoice.index > -1) { // 有选中元素
        let activeNodes = this.yourJSONDataFillThere.nodes.filter(item => currentChoice.paneNode.indexOf(item.id) > -1)
        this.copyContent = JSON.parse(JSON.stringify(activeNodes))
        this.copyContent.forEach(item => {
          item.id = item.id + this.yourJSONDataFillThere.nodes.length + 100 // 自定义id规范 这里随便写个长度+100作为id
          item.pos_x += (100 / (sessionStorage['svgScale'] || 1))
          item.pos_y += (100 / (sessionStorage['svgScale'] || 1))
        })
      }
    },
    ctrlV () {
      if (!this.copyContent.length) return false
      this.yourJSONDataFillThere.nodes.push(...this.copyContent)
      this.$refs.DAGBoard.choice = {
        paneNode: [], // 选取的节点下标组
        index: -1,
        point: -1
      }// 复制完成 取消选中状态
      this.copyContent = []
    },
    updateDAG (data, action, id) {
      console.log(...arguments)
      console.log(JSON.stringify(arguments[0]))
      switch (action) {
        // case 'selectNode':
        //   this.showNodeDetails(data.nodes.find(item => item.id === id))
        //   break;
        case 'settingArg':
          this.showNodeArg(data.nodes.find(item => item.id === id))
          this.drawer = true
          break;
        default: () => { }
      }
    },
    editNodeDetails () {
      console.log(...arguments)
    },
    doSthPersonal () {
      console.log(...arguments)
    },
    loadJSON () {
      // 这里可以跟服务端交互获取数据
      setTimeout(() => {
          this.toYamle = convertToYoloV8Config
        this.hyperParameterTemp = hyper_parameter
        this.yourJSONDataFillThere = JSONFromService
      }, 500);
    },
    /**
     * 通过拖拽方式加入新节点必须的函数
     */
    startNodesBus (e) {
      /**
       *  别的组件调用时, 先放入缓存
       * dragDes: {
       *    drag: true,
       *    name: 组件名称
       *    type: 组件类型
       *    model_id: 跟后台交互使用
       * }
       **/
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y,
          value: dragDes.name
        });
        this.dragBus = true;
      }
    },
    moveNodesBus (e) {
      // 移动模拟节点
      if (this.dragBus) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y
        });
      }
    },
      getNextNodeId(nodes) {
          if (!nodes || nodes.length === 0) {
              return 1; // 如果nodes为空，则返回1
          }

          // 查找所有节点中的最大ID
          const maxId = Math.max(...nodes.map(node => node.id));

          // 返回最大ID加1
          return maxId + 1;
      },
      //添加新增节点
    endNodesBus (e) {
      // 节点放入svg
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag && e.toElement.id === "svgContent") {
        const pos_x =
          (e.offsetX - 90 - (sessionStorage["svg_left"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const pos_y =
          (e.offsetY - 15 - (sessionStorage["svg_top"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        delete dragDes.drag
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            pos_x,
            pos_y,
            name: this.busValue.value,
            ...dragDes
          }
        };
        this.yourJSONDataFillThere.nodes.push({
          ...params.desp,
          id: this.getNextNodeId(this.yourJSONDataFillThere.nodes), // 这里注意, 新增的id一定不能重复, 建议id交由后端处理
          in_ports: [0],
          out_ports: [0]
        })
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    },
    dragIt (val) {
      val.form.createTime = new Date().toDateString()
      sessionStorage["dragDes"] = JSON.stringify({
        drag: true,
        ...val
      });
    },
    /**
     * 右侧form展示逻辑
     */
    // showNodeDetails (val) { // 展示选中的节点
    //   const { id, form } = val
    //   if (!form) return
    //     this.formDetail.id = id
    //     this.formDetail.form = Object.assign(this.formDetail.form, form, {})
    // },
      /*
      *  节点参数展示
      * */
      showNodeArg(val) {
          const {id, arg, name, pos} = val
          if (!arg) return
          this.formDetail.id = id
          this.formDetail.arg = {...arg}
          this.formDetail.name = name
          this.formDetail.pos = pos
      },
    // onSubmit () { // 更新所选节点的信息
    //   const { id, form } = this.formDetail
    //   this.yourJSONDataFillThere.nodes.map(item => {
    //     if (item.id === id) {
    //       item.form = form
    //     }
    //   })
    //   let _data = this.yourJSONDataFillThere.nodes.find(item => item.id === currentEditNodeId).form
    //   let str = JSON.stringify(_data, null, 4)
    //   alert('节点信息更新完成' + str)
    // },
      Check(num){
          console.log("Check已执行！")
          for (let i = 1; i <= num; i++) {
              if (vis[i]&&!check[i]) {
                  console.log("返回true！")
                  return true;
              }
          }
          return false;
      },
    exportYaml(name, state) {
        cnt= 0;//计数器
        //链式前向星
        // 使用reduce方法找到最大的id值
        num = this.yourJSONDataFillThere.nodes.reduce((max, node) => (node.id > max ? node.id : max), -Infinity);
        head=Array(num+10).fill(0); //创建节点数+10大小的数组
        len = head.length //head数组长度
        next=Array(2*len).fill(0); //创建next数组，长度为2*len
        to = Array(2*len).fill(0); //创建to数组，长度为2*len
        vis = Array(len).fill(0);             //检查下标是否存在
        ru = Array(len).fill(0);              //创建入度数组
        cu = Array(len).fill(0);              //创建出度数组
        ruNum = Array.from(Array(len), () => new Array(0))  //创建ruNum二维数组
        dp = Array(len).fill(0);              //DAG节点深度数组
        rfa = Array(len).fill(0);             //
        index = [];
        check = Array(num+1).fill(false);
        let result = {
            head:[],
            backbone:[]
        }
        let start,end;
        const edges = JSON.parse(JSON.stringify(this.yourJSONDataFillThere.edges)),
            nodes = JSON.parse(JSON.stringify(this.yourJSONDataFillThere.nodes));
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            let x = edge.src_node_id, y = edge.dst_node_id;
            to[++cnt] = y;
            next[cnt] = head[x];
            head[x] = cnt;
            ru[y] += 1;
            if (!ruNum[y]) ruNum[y] = []; // 如果 ruNum[y] 为 undefined，则初始化为一个空数组
            ruNum[y].unshift(x);
            cu[x] += 1;
            vis[x] = 1;
            vis[y] = 1;
        }
        //检查是否存在环或者存在多个输入点
        if (!this.topu()) {
            return
        }
        for (let i = 1; i <= num; i++) {
            if (ru[i] == 0&&vis[i]) start = i;
            if (cu[i] == 0&&vis[i]) end = i;
        }
        //计算最长路
        this.dfs(0, start);
        //获取层数索引,按倒序获得整体的主干路
        let i = end;
        index.unshift(i);
        check[i] = true;
        while(rfa[i]) {
            index.unshift(rfa[i]);
            check[rfa[i]] = true;
            i = rfa[i];
        }
        let cycle = 0;
        //将每个模块按照dfs顺序进行排列
        while (this.Check(num)) {
            for (let i = 1; i <= num; i++) {
                if (!check[i]&&vis[i]) {
                    let idx = index.indexOf(rfa[i]);
                    if (idx !== -1) {
                        index.splice(idx+1,0,i);
                        check[i] = true;
                    } else {
                        continue;
                    }
                }
            }
            console.log("问题1")
            cycle+=1;
            if (cycle == 100){
                break;
            }
        }
        for (let i = index.length-1; i>=0; i--) {
            const foundNode = nodes.find(node => node.id === index[i]);
            let temp = [];
            for (let j = 0; j < ruNum[index[i]].length; j++) {
                if (i-1 < 0) continue;
                if (ruNum[index[i]][j] == index[i-1]) {
                    temp.unshift(-1);
                } else {
                    temp.push(index.indexOf(ruNum[index[i]][j]));
                }
            }
            if (i == 0) {
                temp = -1;
            }
            if (foundNode.pos === "head") {
                result.head.unshift([
                    temp.length === 1 ? temp[0] : temp,
                    foundNode.arg[0].value, // 使用 foundNode.arg[0] 来获取第一个属性的 value 值
                    foundNode.name,
                    Object.values(foundNode.arg).filter(item => item.label !== 'n').map(item => {
                        const value = item.value;
                        // 检查 value 是否为数字
                        const isNumber = typeof value === 'number';
                        // 检查 value 是否为布尔值
                        const isBoolean = typeof value === 'boolean';

                        if (value == "None") {
                            return value; // 保持 None 的原始形式
                        }
                        // 如果不是数字和布尔值，将其转化为字符串并添加双引号
                        if (!isNumber && !isBoolean) {
                            return `"${value}"`; // 转化为字符串并用双引号括起来
                        }
                        return value; // 返回原始值
                    }) // 只获取 value 值并过滤掉标签为 'n' 的属性
                ]);
            } else {
                result.backbone.unshift([
                    temp.length === 1 ? temp[0] : temp,
                    foundNode.arg[0].value, // 使用 foundNode.arg[0] 来获取第一个属性的 value 值
                    foundNode.name,
                    Object.values(foundNode.arg).filter(item => item.label !== 'n').map(item => {
                        const value = item.value;
                        // 检查 value 是否为数字
                        const isNumber = typeof value === 'number';
                        // 检查 value 是否为布尔值
                        const isBoolean = typeof value === 'boolean';

                        if (value == "None") {
                            return value; // 保持 None 的原始形式
                        }
                        // 如果不是数字和布尔值，将其转化为字符串并添加双引号
                        if (!isNumber && !isBoolean) {
                            return `"${value}"`; // 转化为字符串并用双引号括起来
                        }
                        return value; // 返回原始值
                    }) // 只获取 value 值并过滤掉标签为 'n' 的属性
                ]);
            }

            // if (foundNode.pos === "head"){
            //     result.head.unshift([temp.length==1?temp[0]:temp,foundNode.arg.n,foundNode.name, Object.keys(foundNode.arg).filter(key => key !== 'n').map(key => foundNode.arg[key])])
            // } else {
            //     result.backbone.unshift([temp.length==1?temp[0]:temp,foundNode.arg.n,foundNode.name, Object.keys(foundNode.arg).filter(key => key !== 'n').map(key => foundNode.arg[key])])
            // }
        }
        const resultYaml = this.toYamle(result,hyper_parameter,'yolov8_config.yaml')
        console.log(resultYaml);
        this.downloadYAML(resultYaml, name);
        this.addRecord(resultYaml, name, state);
    },
      // 添加下载记录到库里
      addRecord(content, name, state) {
          const token = Cookies.get('token');
          this.$axios.post('/download/add', {
              userName: token,
              content: content,
              name: name,
              state: state
          }).then(res => {
              ElMessage({
                  message: '下载成功',
                  type: 'success',
              })
          })
      },
      downloadYAML(content, name) {
          // 将内容转换为 YAML 格式的字符串
          let yamlContent = yaml.dump(content);
          //
          if (yamlContent.trim().startsWith('|-')) {
              yamlContent = yamlContent.split('\n').slice(1).join('\n'); // 去除第一行
          }
          // 重新调整缩进，使所有内容向前缩进一格（2或4个空格）
          const indent = 0; // 根据您的需求设置缩进
          const adjustedContent = yamlContent.split('\n').map(line => ' '.repeat(indent) + line).join('\n');

          console.log(adjustedContent);
          // 创建 Blob 对象
          const blob = new Blob([adjustedContent], {type: 'text/yaml'});

          // 创建临时 URLs
          const url = URL.createObjectURL(blob);

          // 创建 <a> 元素
          const a = document.createElement('a');
          a.href = url;
          a.download = `${name}.yaml`;

          // 将 <a> 元素添加到文档中并触发点击事件
          document.body.appendChild(a);
          a.click();

          // 完成下载后移除 <a> 元素和临时 URL
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
      },
    dfs(fa, root) {
      if (dp[fa]+1 <= dp[root]) {
          return;
      }
      dp[root] = dp[fa]+1;
      rfa[root] = fa;
      for (let i = head[root];i;i = next[i]) {
          let o = to[i];
          this.dfs(root, o);
      }
      return
    },
      topu(){
          const rut= JSON.parse(JSON.stringify(ru))
          const cut = JSON.parse(JSON.stringify(cu))
          const ru0 = [];
          const cu0 = [];
          //获取出度与入度为0的节点
          for (let i = 1; i <= num; i++) {
              if (rut[i] == 0&&vis[i]) {
                  ru0.push(i)
              }
              if (cut[i] == 0&&vis[i]) {
                  cu0.push(i)
              }
          }
          if (ru0.length == 0 || cu0.length == 0) {
              ElNotification({
                  title: 'Error',
                  message: '模型中存在环，请检查！',
                  type: 'error',
              });
              return false;
          }
          //如果入度为0的节点不止一个，则报错
          if (ru0.length>1) {
              ElNotification({
                  title: 'Error',
                  message: '模型中存在多个输入点，请检查！',
                  type: 'error',
              });
              return false;
          }
          if (cu0.length>1) {
              ElNotification({
                  title: 'Error',
                  message: '模型中存在多个输出点，请检查！',
                  type: 'error',
              });
              return false;
          }
          //开始拓扑排序
          let check1 = Array(rut.length).fill(false)
          while (ru0.length!=0) {
              let t = ru0.shift()
              check1[t] = true;
              for (let i = head[t];i;i=next[i]) {
                  let o = to[i]
                  rut[o] -=1
                  if (rut[o] == 0) {
                      ru0.push(o);
                  }
              }
          }
          //检查是否存在环
          for (let i = 1; i <= num; i++) {
              if (!check1[i]&&vis[i]) {
                  ElNotification({
                      title: 'Error',
                      message: '模型中存在环，请检查！',
                      type: 'error',
                  });
                  return false;
              }
          }
          return true;
      }
  }
}
</script>

<style lang="scss" scoped>
.diagramExample {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .basic-node {
    margin-top: 5px;
    background: #fff;
    color: black;
    border-radius: 15px;
    height: 30px;
    width: 140px;
    border: 1px solid #289de9;
    line-height: 30px;
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }
  .page-left {
    position: absolute;
    padding: 0;
    margin: 0;
    list-style: none;
    left: 0;
    top: 60px;
    width: 200px;
    height: 100vh;
    background: #717171;
    transition: transform 0.3s ease;
    transform: translateX(-400px); /* 初始状态隐藏在左侧 */
  }
  .page-left.show {
    transform: translateX(0); /* 显示在屏幕左侧 */
  }
  .headbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: 40px;
    text-align: left;
    //text-indent: 20px;
    user-select: none;
    .logo {
      font-size: 20px;
      line-height: 60px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      background: #fff;
    }
  }
  .right-form {
    width: 400px;
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    border-left: 1px solid #ccc;
    background: #fff;
    .title {
      font-size: 20px;
      line-height: 80px;
    }
  }
}
/** 给svg添加格子背景 */
#svgContent {
  background-size: 50px 50px;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    );
  background-color: rgb(60, 60, 60) !important;
  //margin-left: 200px;
  margin-top: 60px;
  margin-right: 200px;
}
.argFrom{
  font-size: 50px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 100;
}
</style>
