export const routesAdmin = [
  {
    path: "/login",
    meta: { title: "Login", requiresAuth: false },
    name: "LoginPage",
    component: () => import("@/pages/admin/login/LoginPage.vue"),
  },
  {
    path: "/admin",
    meta: { title: "Trang quản trị", requiresAuth: false },
    name: "LayoutAdminPage",
    component: () => import("@/layouts/LayoutAdminPage/LayoutAdminPage.vue"),
    children: [
      {
        path: "loai-bai-viet",
        meta: { title: "Quản lý loại bài viết", requiresAuth: false },
        name: "CategoryNews",
        component: () => import("@/pages/admin/loai-bai-viet/CategoryNew.vue"),
      },
      {
        path: "quan-ly-bai-viet",
        meta: { title: "Quản lý bài viết", requiresAuth: false },
        name: "QuanLyBaiVietPage",
        component: () =>
          import("@/pages/admin/quan-ly-bai-viet/QuanLyBaiViet.vue"),
      },
      {
        path: "cau-hinh-trang-chu",
        meta: { title: "Quản lý bài viết", requiresAuth: false },
        name: "CauHinhHomePage",
        component: () =>
          import("@/pages/admin/cau-hinh-home/CauHinhHomePage.vue"),
      },
    ],
  },
];
