<template>
  <div class="md:w-2/3 mx-auto rounded-lg bg-white">
    <div class="py-8 px-6">
      <div class="text-4xl font-bold text-center mb-4">
        BẢNG GIÁ THIẾT KẾ
      </div>
      <div class="text-xl text-center mb-8 font-light">
        <span class="font-bold">GB LUXURY</span> cung cấp các mức giá linh hoạt, phù hợp với nhu cầu khác nhau của từng dự án.
      </div>
      <div class="md:grid md:grid-cols-3 md:gap-6 text-xl">
        <div v-for="item in data" :key="item.type" class="border-t border-neutral-200 px-8 py-6 flex flex-col gap-8">
          <div class="flex flex-col gap-4 items-center">
            <div class="italic font-light text-center">{{ item.type }}</div>
            <div class="text-4xl">{{ item.price }}</div>
            <div class="font-light">(VNĐ / m2)</div>
          </div>
          <div class="text-center text-base">
            <div class="font-[500] py-4">{{ item.des1 }}</div>
            <div class="py-4 border-y border-neutral-200">
              {{ item.des2 }}
            </div>
            <div class="py-4">
              {{ item.des3 }}
            </div>
          </div>
        </div>
      </div>
      <div class="italic text-justify">
        <span class="font-bold">Lưu ý:</span> Bảng giá chưa bao gồm khuyến mại tùy theo từng thời điểm, vui lòng liên hệ <a class="font-bold" href="tel:+84379595558">0379 595 558</a> hoặc <a class="font-bold" href="tel:+84948967696">0948 967 696</a> để biết thêm chi tiết.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CostTableDesgin',
  data() {
    return {
      data: [
        {
          type: 'Cơ bản',
          price: '120.000',
          des1: 'Thiết kế cơ bản, tập trung vào việc bố trí không gian và lựa chọn nội thất tiêu chuẩn',
          des2: 'Phong cách thiết kế hiện đại, đơn giản, không quá phức tạp về chi tiết',
          des3: 'Nhanh chóng, phù hợp với những dự án có ngân sách hạn chế'
        },
        {
          type: 'Nâng cao',
          price: '250.000',
          des1: 'Thiết kế với các chi tiết tinh tế hơn, tập trung vào tính thẩm mỹ',
          des2: 'Phong cách thiết kế hiện đại, tân cổ điển, có thể tùy chỉnh theo phong cách khách hàng yêu cầu, với các chi tiết tinh tế hơn',
          des3: 'Lâu hơn so với gói cơ bản, do sự tỉ mỉ và chi tiết trong thiết kế'
        },
        {
          type: 'Cao cấp',
          price: '350.000',
          des1: 'Thiết kế sang trọng và độc đáo từ bố cục, ánh sáng, âm thanh, trang trí nghệ thuật',
          des2: 'Phong cách thiết kế như gói nâng cao, nhưng sang trọng hơn và mang tính độc đáo, sáng tạo',
          des3: 'Yêu cầu thời gian dài hơn do mức độ phức tạp và sự tỉ mỉ trong từng chi tiết'
        }
      ]
    }
  }
}
</script>

<style>

</style>