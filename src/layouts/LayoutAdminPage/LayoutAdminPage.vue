<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="text-center font-bold text-white py-6">
        TRANG QUẢN TRỊ
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in listRouter" :key="item.key">
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content class="m-4">
        <div>
          aa
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
} from '@ant-design/icons-vue';
export default {
  name: 'LayoutAdminPage',
  components: {
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ['news'],
      listRouter: [
        {
          key: 'account',
          name: 'Tài khoản',
          path: '/admin/tai-khoan'
        },
        {
          key: 'categories',
          name: 'Quản lý loại bài viết',
          path: '/admin/loai-bai-viet'
        },
        {
          key: 'news',
          name: 'Quản lý bài viết',
          path: '/admin/quan-ly-bai-viet'
        },
      ]
    }
  }
}
</script>

<style>

</style>