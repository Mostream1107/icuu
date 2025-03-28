import SVGContent from './dagContent/index.vue'
import NodeBus from './nodeBus/index.vue'
const DAGBoard = {
  install(Vue, options) {
    Vue.component(SVGContent.name, SVGContent)
    Vue.component(NodeBus.name, NodeBus)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DAGBoard)
}
export default DAGBoard
