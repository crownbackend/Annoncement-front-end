<template>
  <HeaderView  :key="$route.fullPath" />
  <br>
  <br>
  <div class="container">
    <router-view/>
  </div>

</template>

<style lang="scss">
$primary: #26474E;
$secondary: #F7941E;
$success: #76CDCD;
$info: #828282;

// Then import Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";

.pointer {
  cursor: pointer;
}
.bg-light-primary {
  background-color: #76CDCD;
  color: white;
}
.bg-light-secondary {
  background-color: #F27438;
  color: white;
}
</style>
<script setup lang="ts">
import HeaderView from "@/views/Header.vue";
</script>
