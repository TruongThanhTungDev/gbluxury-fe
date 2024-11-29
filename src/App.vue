<template>
  <div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style >
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0
}
#app {
  background-color: rgba(235, 235, 235, 0.8)!important;
}
</style>
