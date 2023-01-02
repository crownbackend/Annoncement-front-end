<template>
  <SearchComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchComponent from "@/components/search/Search.vue";

export default defineComponent({
  name: 'HomeView',
  components: {SearchComponent},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
