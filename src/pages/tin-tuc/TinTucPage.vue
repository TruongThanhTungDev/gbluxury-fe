<template>
  <div class="container my-0 mx-auto">
    <div class="uppercase font-bold text-4xl mb-4 text-center">
      TIN TỨC
    </div>
    <div class="container-new mb-4">
      <CardNewCommon v-for="(item, index) in listData" :key="index" :title="item.title" :description="item.description" :image="item.image"/>
    </div>
    <div class="text-center">
      <a-pagination v-model:current="page" :total="50" show-less-items />
    </div>
  </div>
</template>

<script>
import CardNewCommon from '@/components/common/CardNewCommon.vue';

export default {
  name: 'TinTucPage',
  components: {
    CardNewCommon
  },
  data() {
    return {
      listData: [
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        },
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        },
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        },
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        },
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        },
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        },
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        },
        {
          title: 'HOMY Việt Nam xuất sắc lọt “Top 100 doanh nghiệp tiêu biểu ASEAN”',
          image: 'noi-that-cong-trinh.jpg',
          description: 'Công ty TNHH Xây dựng & Kiến trúc Homy Việt Nam tự hào được vinh danh trong “Top 100 doanh nghiệp tiêu biểu” tại Diễn đàn Kinh tế ASEAN 2020 hôm 31/7.'
        }
      ]
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