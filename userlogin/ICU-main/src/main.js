import { createApp } from 'vue'
import Router from './router'
import App from './App.vue'
import Element from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axiosPlugin from "@/axios/axios-plugin.js";
import { createPinia } from 'pinia'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(Element)
app.use(Router)
app.use(axiosPlugin);
app.use(createPinia())
app.config.productionTip = false
app.mount('#app')