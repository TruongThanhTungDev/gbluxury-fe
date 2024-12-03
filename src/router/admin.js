export const routesAdmin = [
  {
    path: "/login",
    meta: { title: "Login", requiresAuth: false },
    name: "LoginPage",
    component: () => import("@/pages/admin/login/LoginPage.vue"),
  },
  {
    path: "/admin/:page",
    meta: { title: "Trang quản trị", requiresAuth: false },
    name: "LayoutAdminPage",
    component: () => import("@/layouts/LayoutAdminPage/LayoutAdminPage.vue"),
  },
];
