<template>
  <SearchComponent/>
  <br>
  <div class="container" v-if="ads.length !== 0">
    <div class="card mb-3" style="max-width: 800px;" :key="key" v-for="(ad, key) in ads">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="https://picsum.photos/1000/700" class="img-fluid rounded-start" style="height: 100%" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ ad.name }}</h5>
            <div>{{ ad.price }} €</div>
            <p class="card-text" style="padding-top: 40px">
              <small class="text-muted">{{ ad.category.name }}</small>
              <br>
              <small class="text-muted">{{ ad.createdAt}}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <button type="button" v-if="showMoreBtn" class="btn btn-primary" @click="showMore">Voir plus</button>
  </div>
  <div v-else>
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdApi from "@/service/AdApi";
import SearchComponent from "@/components/search/Search.vue";

export default defineComponent({
  name: 'AdsView',
  components: {SearchComponent},
  data() {
    return {
      ads: [],
      showMoreBtn: true
    }
  },
  mounted() {
    AdApi.searchAds(this.$route.query).then(response => {
      this.ads = response.data
    }).catch(err => console.log(err))
  },
  methods: {
    showMore() {
      let rangeAdd = this.ads.length + 50
      let range = this.ads.length + '-' + rangeAdd
      AdApi.searchAds(this.$route.query, range).then(response => {
        if(response.data.length === 0) {
          this.showMoreBtn = false
        }
        this.ads = this.ads.concat(response.data)
      }).catch(err => console.log(err))
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
