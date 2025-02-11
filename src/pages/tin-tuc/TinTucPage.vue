<template>
  <div class="container my-0 mx-auto">
    <div class="uppercase font-bold text-4xl mb-4 text-center">
      TIN TỨC
    </div>
    <div class="container-new mb-4">
      <CardNewCommon v-for="(item, index) in listData" :key="index" :title="item.title" :description="item.description" :image="item.image" :id="item.id"/>
    </div>
    <div class="text-center">
      <a-pagination v-model:current="page" :total="totalItems" show-less-items @change="getData" :defaultPageSize="20"/>
    </div>
  </div>
</template>

<script>
import { searchCategoryByCode } from '@/api/categories';
import { getNewsClient } from '@/api/news';
import CardNewCommon from '@/components/common/CardNewCommon.vue';

export default {
  name: 'TinTucPage',
  components: {
    CardNewCommon
  },
  data() {
    return {
      page: 1,
      listData: [],
      totalItems: 0,
      title: ''
    }
  },
  mounted() {
    this.handleGetCodeCategory()
  },
  watch: {
    $route(val) {
      if (val) {
        this.handleGetCodeCategory()
      }
    }
  },
  methods: {
    handleGetCodeCategory() {
      const router = this.$route
      const routerPath = router.path.split("/")
      if (routerPath.length && routerPath.length === 2) {
        this.searchByCode(routerPath[1], false)
      } else {
        this.searchByCode(routerPath[2], false)
      }
    },
    getListNewByCategory(id, isCategoryParent = true) {
      const params = {
        categoryId: id,
        isCategoryParent: isCategoryParent,
        pageNumber: this.page - 1,
        pageSize: 20
      }
      getNewsClient(params).then(res => {
        if (res) {
          this.listData = res.content
          this.totalItems = res.totalElements
        }
      })
    },
    searchByCode(code, isCategoryParent = true) {
      const params = {
        code
      }
      searchCategoryByCode(params).then(res => {
        if (res) {
          this.getListNewByCategory(res.id, isCategoryParent)
          this.title = res.title
        }
      })
    }
  }
}
</script>

<style scoped>
.container-new {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  cursor: pointer;
}
</style>