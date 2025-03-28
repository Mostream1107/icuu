/*
* 此文件读取router下所有一级目录并自动注册index.js
*/
import { createApp } from 'vue'
import Vuex from 'vuex'
import app from "@/App.vue";

createApp(app).use(Vuex)
const store = new Vuex.Store({
  modules: [
      ()=>import("./diagramExample/vx.js"),
      // () => import("./Example")
  ]
})
export default store
