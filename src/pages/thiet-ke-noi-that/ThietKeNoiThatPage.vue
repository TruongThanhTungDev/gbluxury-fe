<template>
  <div class="container my-0 mx-auto">
    <div class="uppercase font-bold md:text-4xl text-2xl mb-4 text-center">
      {{ title ? title : 'THIẾT KẾ NỘI THẤT' }}
    </div>
    <div v-if="!isLoading" class="lg:flex lg:flex-wrap lg:flex-row lg:justify-start lg:px-0 px-6 flex flex-col justify-center items-center gap-6 mb-4">
      <CardCommonChild v-for="(item, index) in listData" :key="index" :title="item.title" :image="item.image" :id="item.id"/>
    </div>
    <div v-else class="flex justify-between gap-6 mb-4">
      <a-skeleton style="width: 400px; height: 200px;" :size="200"/>
      <a-skeleton style="width: 400px; height: 200px;" :size="200"/>
      <a-skeleton style="width: 400px; height: 200px;" :size="200"/>
    </div>
    <div v-if="listData.length" class="text-center">
      <a-pagination v-model:current="page" :total="totalItems" show-less-items @change="handleGetCodeCategory" :defaultPageSize="20"/>
    </div>
    <div class="bg-[#f9f9f9] py-14 px-16">
      <cost-table-design/>
    </div>
  </div>
</template>

<script>
import { searchCategoryByCode } from '@/api/categories';
import { getNewsClient } from '@/api/news';
import CardCommonChild from '@/components/common/CardCommonChild.vue';
import CostTableDesign from '@/components/common/CostTableDesign.vue';

export default {
  name: 'ThietKeNoiThatPage',
  components: {
    CardCommonChild,
    CostTableDesign
  },
  data() {
    return {
      page: 1,
      listData: [],
      totalItems: 0,
      title: '',
      isLoading: false,
      categoryCode: ''
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
        this.searchByCode(routerPath[1], true)
      } else {
        this.searchByCode(routerPath[2], false)
      }
    },
    getListNewByCategory(id, isCategoryParent = true) {
      const params = {
        categoryId: id,
        isCategoryParent: isCategoryParent,
        pageNumber: this.page - 1,
        pageSize: 6
      }
      this.isLoading = true
      getNewsClient(params).then(res => {
        if (res) {
          this.listData = res.content
          this.totalItems = res.totalElements
        }
      })
      .finally(() => this.isLoading = false)
    },
    searchByCode(code, isCategoryParent = true) {
      const params = {
        code
      }
      this.categoryCode = code
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
</style>