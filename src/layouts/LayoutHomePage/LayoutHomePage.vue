<template>
  <a-layout>
    <HeaderHomePage></HeaderHomePage>
    <router-view></router-view>
    <FooterHomePage></FooterHomePage>
  </a-layout>
</template>

<script>
import FooterHomePage from "./FooterHomePage.vue";
import HeaderHomePage from "./HeaderHomePage.vue";
export default {
  components: { HeaderHomePage, FooterHomePage },
  name: "LayoutHomePage",
};
</script>

<style></style>
