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
        path: "/thiet-ke-noi-that",
        name: "ThietKeNoiThatPage",
        meta: {
          title: "Thiết kế nội thất",
        },
        component: () =>
          import("@/pages/thiet-ke-noi-that/ThietKeNoiThatPage.vue"),
      },
      {
        path: "/cong-trinh",
        name: "CongTrinhPage",
        meta: {
          title: "Công trình",
        },
        component: () => import("@/pages/cong-trinh/CongTrinhPage.vue"),
      },
      {
        path: "/tin-tuc",
        name: "TinTucPage",
        meta: {
          title: "Tin tức",
        },
        component: () => import("@/pages/tin-tuc/TinTucPage.vue"),
      },
      {
        path: "/lien-he",
        name: "LienHePage",
        meta: {
          title: "Liên hê",
        },
        component: () => import("@/pages/lien-he/LienHePage.vue"),
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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
