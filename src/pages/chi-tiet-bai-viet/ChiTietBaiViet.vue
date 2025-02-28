<template>
  <div class="container-custom my-0 mx-auto contain">
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

<style scroped>
.container-custom {
  width: 68%;
}
@media (max-width: 640px) {
  .container-custom {
    max-width: 640px;
    width: 100%;
  }
}
/* @media (min-width: 768px) {
  .container-custom {
    max-width: 768px;
    width: 100%;
  }
}
@media (min-width: 1024px) {
  .container-custom {
    max-width: 1024px;
    width: 100%;
  }
}
@media (min-width: 1280px) {
  .container-custom {
    max-width: 1280px;
    width: 100%;
  }
}
@media (min-width: 1536px) {
  .container-custom {
    max-width: 1536px;
    width: 100%;
  }
} */
</style>