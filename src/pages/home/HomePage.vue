<template>
  <div>
    <div v-for="(item, index) in listBaiViet" :key="item.categoryId" class="py-14 px-16" :class="index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'">
      <div>
        <div class="text-center mb-4">
          <div class="text-black font-[600] mb-1 text-4xl uppercase">{{ item.categoryName }}</div>
          <div class="underline cursor-pointer uppercase">XEM TẤT CẢ</div>
        </div>
        <div class="grid grid-cols-2 gap-10">
          <card-common v-for="el in item.news" :key="el.id" :title="el.name" description="Công trình tuyệt đẹp" :image="el.image"></card-common>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardCommon from '@/components/common/CardCommon.vue';
export default {
  name: "HomePage",
  components: {
    CardCommon
  },
  data() {
    return {
      listBaiViet: [
        {
          categoryName: 'CÔNG TRÌNH',
          categoryId: 1,
          news: [
            {
              id: '1-1',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            },
            {
              id: '1-2',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            }
          ]
        },
        {
          categoryName: 'NỘI THẤT CHUNG CƯ, PENTHOUSE',
          categoryId: 2,
          news: [
            {
              id: '2-1',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            },
            {
              id: '2-2',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            }
          ]
        },
        {
          categoryName: 'NỘI THẤT BIỆT THỰ, NHÀ PHỐ',
          categoryId: 3,
          news: [
            {
              id: '3-1',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            },
            {
              id: '3-2',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            }
          ]
        },
        {
          categoryName: 'Nội thất văn phòng',
          categoryId: 4,
          news: [
            {
              id: '4-1',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            },
            {
              id: '4-2',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            }
          ]
        },
        {
          categoryName: 'Nội thất khách sạn',
          categoryId: 5,
          news: [
            {
              id: '5-1',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            },
            {
              id: '5-2',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            }
          ]
        },
        {
          categoryName: 'Không gian công cộng',
          categoryId: 6,
          news: [
            {
              id: '6-1',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            },
            {
              id: '6-2',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            }
          ]
        },
        {
          categoryName: 'Tin tức',
          categoryId: 7,
          news: [
            {
              id: '7-1',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            },
            {
              id: '8-2',
              name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
              description: '',
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif'
            }
          ]
        }
      ]
    }
  }
};
</script>

<style>
</style>