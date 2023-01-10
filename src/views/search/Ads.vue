<template>
  <div class="container">
    <div class="card mb-3" style="max-width: 800px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="https://picsum.photos/1000/700" class="img-fluid rounded-start" style="height: 100%" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdApi from "@/service/AdApi";

export default defineComponent({
  name: 'AdsView',
  mounted() {
    AdApi.searchAds(this.$route.query).then(response => {
      console.log(response)
    }).catch(err => console.log(err))
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
