<template>
  <div class="h-screen relative">
    <div class="w-[450px] bg-white p-6 rounded shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="text-2xl font-bold text-center mb-4">
        ĐĂNG NHẬP
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <div class="mb-1">Tên đăng nhập</div>
          <a-input v-model:value="username" placeholder="Tên đăng nhập" class="w-full"/>
        </div>
        <div>
          <div class="mb-1">Mật khẩu</div>
          <div class="relative">
            <a-input-password v-model:value="password" v-model:visible="isShowPassword" placeholder="Mật khẩu" class="w-full">
              <template #iconRender="v">
                <EyeInvisibleOutlined v-if="v"></EyeInvisibleOutlined>
                <EyeTwoTone v-else></EyeTwoTone>
              </template>
            </a-input-password>
          </div>
        </div>
        <a-button type="primary" @click="login">Đăng nhập</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons-vue';

export default {
  name: 'LoginPage',
  components: {
    EyeTwoTone,
    EyeInvisibleOutlined
  },
  data() {
    return {
      username: '',
      password: '',
      isShowPassword: false
    }
  },
  methods: {
    login() {
      this.$router.push('/admin/category')
    }
  }
}
</script>

<style>

</style>