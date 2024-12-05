<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="text-center font-bold text-white py-6">
        TRANG QUẢN TRỊ
      </div>
      <div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item v-for="item in listRouter" :key="item.key" class="!flex !items-center gap-2" @click="toRouter(item)">
            <component :is="item.icon"/>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="flex justify-end items-center h-full mr-4">
          <a-button danger type="primary" class="flex items-center gap-2">
            Đăng xuất
            <i class="fa-solid fa-right-from-bracket"></i>
          </a-button>
        </div>
      </a-layout-header>
      <a-layout-content class="m-4">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  UserOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';
// import { h } from 'vue';
export default {
  name: 'LayoutAdminPage',
  components: {
    UserOutlined,
    UnorderedListOutlined,
    FileTextOutlined,
    LogoutOutlined 
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ['categories'],
      listRouter: [
        {
          key: 'account',
          name: 'Tài khoản',
          path: '/admin/tai-khoan',
          icon: 'UserOutlined'
        },
        {
          key: 'categories',
          name: 'Quản lý loại bài viết',
          path: '/admin/loai-bai-viet',
          icon: 'UnorderedListOutlined'
        },
        {
          key: 'news',
          name: 'Quản lý bài viết',
          path: '/admin/quan-ly-bai-viet',
          icon: 'FileTextOutlined'
        },
      ],
    }
  },
  methods: {
    toRouter(item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style>

</style>