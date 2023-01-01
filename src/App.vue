<template>
  <HeaderView  :key="$route.fullPath" />
  <br>
  <div class="container">
    <router-view/>
  </div>

</template>

<style lang="scss">
$primary: #0B3C5D;
$secondary: #F7941E;
$success: #5DBCD2;
$info: #828282;

// Then import Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";

</style>
<script setup lang="ts">
import HeaderView from "@/views/Header.vue";
</script>
