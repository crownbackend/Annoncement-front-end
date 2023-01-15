<template>

  <div class="" v-if="ads.length !== 0">
    <div class="card mb-3 container" style="max-width: 800px; padding-right: 0px; padding-left: 0px;" :key="key" v-for="(ad, key) in ads">
      <router-link target="_blank" :to="{ name: 'ad', params: { id: ad.id } }">
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
      </router-link>
      <div class="text-end pointer position-absolute bottom-0 end-0 fs-4 mb-0">
        <i class="bi bi-heart"></i>
      </div>
    </div>
    <div class="text-center">
      <button type="button" v-if="showMoreBtn" class="btn btn-primary" @click="showMore">Voir plus</button>
    </div>
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
import Mixins from "@/mixins/Mixins";
import Ad from "@/model/ad";

export default defineComponent({
  name: 'AdsView',
  data() {
    return {
      ads: [],
      showMoreBtn: true
    }
  },
  mixins: [Mixins],
  mounted() {
    AdApi.searchAds(this.$route.query).then(response => {
      this.ads = response.data
      this.ads.map((v: Ad, k) => {
        v.createdAt = Mixins.methods.formatDate(v.createdAt)
      })
    }).catch(() => {
      this.toastShow('error', 'Erreur serveur')
    })
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
      }).catch(() => {
        this.toastShow('error', 'Erreur serveur')
      })
    },
    toastShow(type: string, message: string) {
      this.$toast.default(message, {
        type: type,
        duration: 5000
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a:hover, a:visited, a:link, a:active
{
  text-decoration: none;
}
</style>
