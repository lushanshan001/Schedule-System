import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIconModules from "@element-plus/icons";

import axios from 'axios';
import VueAxios from 'vue-axios';

import '@/api/request.js';

//动态菜单路由的生成
const addMenu = () => {
  store.commit("addMenu",router)
}
addMenu()

const app = createApp(App);
app.use(store).use(router).use(ElementPlus).use(VueAxios,axios).mount("#app");

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}

localStorage.setItem("success","200");