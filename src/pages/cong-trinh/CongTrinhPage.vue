<template>
  <div class="container my-0 mx-auto">
    <div class="uppercase font-bold text-4xl mb-4 text-center">
      CÔNG TRÌNH
    </div>
    <div class="container-list mb-4">
      <CardCommonChild v-for="(item, index) in listData" :key="index" :title="item.title" :image="item.image"/>
    </div>
    <div class="text-center">
      <a-pagination v-model:current="page" :total="50" show-less-items />
    </div>
  </div>
</template>

<script>
import CardCommonChild from '@/components/common/CardCommonChild.vue';

export default {
  name: 'CongTrinhPage',
  components: {
    CardCommonChild
  },
  data() {
    return {
      page: 1,
      listData: [
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        },
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        },
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        },
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        },
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        },
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        },
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        },
        {
          title: 'THIẾT KẾ NỘI THẤT MR.MINH HH3A LINH ĐÀM',
          image: 'noi-that-cong-trinh.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>