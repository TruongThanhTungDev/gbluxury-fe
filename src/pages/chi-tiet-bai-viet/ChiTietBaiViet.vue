<template>
  <div class="container my-0 mx-auto">
    <div v-if="data">
      <div v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
import { getDetailNewsClient } from '@/api/news';

export default {
  name: 'ChiTietBaiViet',
  data() {
    return {
      data: null
    }
  },
  created() {
    const router = this.$route
    const routerPath = router.path.split("/")
    if (routerPath.length) {
      getDetailNewsClient(routerPath[2]).then(res => {
        if (res) {
          this.data = res
        }
      })
    }
  },
  methods: {
  }
}
</script>

<style>

</style>