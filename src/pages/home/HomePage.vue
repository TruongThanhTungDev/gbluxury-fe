<template>
  <div>
    <div v-if="listBaiViet.length">
      <div v-for="(item, index) in listBaiViet" :key="item.id" class="py-14 px-16" :class="index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'">
        <div>
          <div class="text-center mb-4">
            <div class="text-black font-[600] mb-1 md:text-4xl text-2xl uppercase">{{ item.categoryRes.title }}</div>
            <div class="underline cursor-pointer uppercase" @click="viewAll(item.categoryRes.path)">XEM TẤT CẢ</div>
          </div>
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-10">
            <card-common v-for="el in item.newsRes" :key="el.id" :title="el.title" :description="el.description" :image="el.image" :isCustom="true" @click="viewNew(el.id)"></card-common>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white py-14 px-16">
      <CostTableDesign/>
    </div>
  </div>
</template>

<script>
import { getConfigClient } from '@/api/menu-config';
import CardCommon from '@/components/common/CardCommon.vue';
import CostTableDesign from '@/components/common/CostTableDesign.vue';
export default {
  name: "HomePage",
  components: {
    CardCommon,
    CostTableDesign
  },
  data() {
    return {
      listBaiViet: [
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getConfigClient().then(res => {
        if (res && res.length) {
          this.listBaiViet = res
        }
      })
    },
    viewNew(id) {
      this.$router.push('/bai-viet/' + id)
    },
    viewAll(path) {
      this.$router.push(path)
    }
  }
};
</script>

<style>
</style>