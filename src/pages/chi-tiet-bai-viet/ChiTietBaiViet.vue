<template>
  <div class="container my-0 mx-auto">
    <div v-if="data">
      <div class="ql-editor" v-html="data.content"></div>
    </div>
    <div v-else>
      <a-skeleton />
    </div>
    <div class="bg-white py-14 px-16">
      <CostTableDesign/>
    </div>
  </div>
</template>

<script>
import { getDetailNewsClient } from '@/api/news';
import CostTableDesign from '@/components/common/CostTableDesign.vue';

export default {
  name: 'ChiTietBaiViet',
  components: {
    CostTableDesign
  },
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