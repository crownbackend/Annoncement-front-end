<template>
  <div>add {{ ad }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdApi from "@/service/AdApi";

export default defineComponent({
  name: 'AdView',
  data() {
    return {
      ad: Object,
    }
  },
  mounted() {
    AdApi.ad(this.$route.params.id).then(response => {
      this.ad = response.data
    }).catch(err => console.log(err))
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
