<template>
  <div>
    <div class="w-full cursor-pointer">
      <div :class="`w-full relative card-hover ${height}`">
        <div v-if="mode" class="card-mask"></div>
        <img
          :src="require('@/assets/images/' +image)"
          alt=""
          class="w-full h-full object-cover mb-2"
        />
        <div v-if="mode" class="absolute top-1/2 left-1/2 icon-card-mask">
          <i class="fa-solid fa-arrow-right text-3xl text-white"></i>
        </div>
      </div>
      <div :class="`${sizeTitle} uppercase text-2xl text-justify mx-1`">
        {{ title }}
      </div>
      <div :class="`mx-1 text-justify font-[300] ${sizeDescription}`">
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
    },
    height: {
      type: String,
      default: 'h-[500px]'
    },
    sizeTitle: {
      type: String,
      default: 'text-2xl'
    },
    sizeDescription: {
      type: String,
      default: 'text-xl'
    },
    mode: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>

</style>