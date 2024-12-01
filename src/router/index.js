import { createRouter, createWebHistory } from "vue-router";
import { routesAdmin } from "./admin";
// import Cookies from "js-cookie";
// import { decodeValue } from "@/service/crypto";

const routes = [
  {
    path: "",
    meta: {
      title: "Trang chủ",
    },
    name: "HomePage",
    component: () => import("@/layouts/LayoutHomePage/LayoutHomePage.vue"),
    children: [
      {
        path: "",
        name: "Home",
        meta: {
          title: "Trang chủ",
        },
        component: () => import("@/pages/home/HomePage.vue"),
      },
    ],
  },
  {
    path: "/:name",
    meta: {
      title: "Trang chủ",
    },
    name: "LayoutChildrenPage",
    component: () =>
      import("@/layouts/LayoutChildrenPage/LayoutChildrenPage.vue"),
    children: [
      {
        path: "/gioi-thieu",
        name: "GioiThieuPage",
        meta: {
          title: "Giới thiệu",
        },
        component: () => import("@/pages/gioi-thieu/GioiThieuPage.vue"),
      },
      {
        path: "//thiet-ke-noi-that",
        name: "ThietKeNoiThatPage",
        meta: {
          title: "Thiết kế nội thất",
        },
        component: () =>
          import("@/pages/thiet-ke-noi-that/ThietKeNoiThatPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes.concat(routesAdmin),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const tokenCookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_t"))
    ?.split("=")[1];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next("/login");
    } else if (!tokenCookies) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
