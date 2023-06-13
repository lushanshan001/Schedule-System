import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "@/views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/",
    name: "main",
    component: MainView,
    redirect: "/Home",
    children: [
      {
        path: "Home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "Schedule",
        name: "Schedule",
        component: () => import("../views/Schedule.vue"),
      },
      {
        path: "Audit",
        name: "Audit",
        component: () => import("../views/Audit.vue"),
      },
      {
        path: "/ShopManager",
        name: "ShopManager",
        component: () => import("../views/ShopManage.vue"),
      },
    ],
  },
  {
    path: "/rule",
    name: "Rule",
    component: () => import("../views/Rule.vue"),
  },
  // {
  //   path:'/shop',
  //   name:'shop',
  //   component: () => import('../views/Shop.vue'),
  // },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   component: () => import("../views/Test.vue"),
  // },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: () => import("../views/ForgetPasswordView.vue"),
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: () => import("../views/ChangePasswordView.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//添加全局前置导航守卫
// router.beforeEach((to, from, next) => {
//   //判断token是否存在
//   const token = sessionStorage.getItem("token");
//   // console.log(token, "token");
//   if (!token) {
//     //没有登录 可以注册，登录，忘记密码
//     if (
//       to.name !== "login" &&
//       to.name !== "forgetPassword" &&
//       to.name !== "register" &&
//       to.name !== "test" &&
//       to.name !== "Schedule"
//     ) {
//       next({ name: "login" });
//     } else {
//       next();
//     }
//     // next();
//   } else {
//     next();
//   }
// });

export default router;
