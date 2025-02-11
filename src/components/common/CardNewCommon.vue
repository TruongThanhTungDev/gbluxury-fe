<template>
  <div class="flex items-center gap-4 border-b pb-8 border-slate-300">
    <div class="card-new">
      <img :src="image" class="w-full h-full object-cover" alt="">
    </div>
    <div>
      <div class="text-xl font-[500]">
        {{ title }}
      </div>
      <div class="line-clamp-2 font-300 text-lg">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardNewCommon',
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
    type: {
      type: String,
      default: 'image'
    }
  },
}
</script>

<style>
.card-new {
  height: 375px;
  width: 100%;
}
</style>