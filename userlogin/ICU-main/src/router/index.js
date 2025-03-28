/*
* 此文件读取所有一级目录并自动注册index.js
*/
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/platform',
    redirect: '/index',
  },
  {
    path: "/register",
    component: () => import("../views/register/register.vue"),
  },
  {
    path: "/",
    component: () => import("../views/login/login.vue"),
  },
  // 新增的 Dashboard 页面路由
  {
    path: "/dashboard",
    component: () => import("../views/dashboard/dashboard.vue"),
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
