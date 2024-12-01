<template>
  <div>
    <div class="w-full cursor-pointer">
      <div class="h-[500px] w-full relative card-hover">
        <div class="card-mask"></div>
        <img
          :src="require('@/assets/images/' +image)"
          alt=""
          class="w-full h-full object-cover mb-2"
        />
        <div class="absolute top-1/2 left-1/2 icon-card-mask">
          <i class="fa-solid fa-arrow-right text-3xl text-white"></i>
        </div>
      </div>
      <div class="uppercase text-2xl text-justify mx-1">
        {{ title }}
      </div>
      <div class="mx-1 text-justify font-[300] text-xl">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCommon',
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
    }
  }
}
</script>

<style>

</style>