<template>
  <div class="card-item cursor-pointer border-b border-slate-300" @click="viewNew(id)">
    <div class="card-small">
      <img :src="image" class="w-full h-full object-cover" alt="">
    </div>
    <div class="uppercase text-center text-xl font-[500]">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCommonChild',
  props: {
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    viewNew(id) {
      this.$router.push('/bai-viet/' + id)
    }
  }
}
</script>

<style scoped>
.card-small {
  height: 375px;
  width: 100%;
  margin-bottom: 16px;
}
.card-item {
  width: calc(33.333% - 16px); /* Chiều rộng mỗi item là 1/3 trừ khoảng cách */
  box-sizing: border-box; /* Đảm bảo padding không ảnh hưởng đến kích thước */
  text-align: center;
  padding: 10px;
}
</style>