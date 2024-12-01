<template>
  <a-layout>
    <HeaderChildrenPage/>
    <router-view class="py-14"></router-view>
    <FooterHomePage></FooterHomePage>
  </a-layout>
</template>

<script>
import FooterHomePage from '../LayoutHomePage/FooterHomePage.vue';
import HeaderChildrenPage from './HeaderChildrenPage.vue';

export default {
  name: 'LayoutChildrenPage',
  components: {
    FooterHomePage,
    HeaderChildrenPage
  }
}
</script>

<style>

</style>