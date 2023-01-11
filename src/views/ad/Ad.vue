<template>
  <div v-if="ad.length !== 0">
    <div class="row">
      <div class="col-md-8">
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active" :key="key" v-for="(image, key) in ad.images">
              <img :src="image.name" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <hr>
        <div class="mt-3">
          <h2>{{ ad.name }}</h2>
        </div>

        <div class="mt-3">
          <h4>{{ ad.price }} €</h4>
        </div>

        <div class="form-text">{{ ad.createdAt}}</div>
        <hr>
        <h4>Description</h4>
        <p v-html="ad.description">
        </p>
        <hr>
        <div id="map" ref="mapElement"></div>
      </div>
      <div class="col-md-4">
        <div class="card" style="width: 20rem;">
          <div class="card-body">
            <h5 class="card-title">{{ ad.user.email }}</h5>
            <p class="card-text">
              {{ ad.user.firstName }} {{ ad.user.lastName }}
              <br>
              Annonces :
              <br>
              {{ ad.user.ads }}
            </p>
            <div class="d-grid gap-2 col-12 mx-auto">
              <button class="btn btn-primary" type="button">Message</button>
              <button class="btn btn-outline-secondary" type="button">Voir numéro téléphone</button>
            </div>
          </div>
        </div>
      </div>
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
import { defineComponent, ref } from 'vue';
import AdApi from "@/service/AdApi";
import L from "leaflet";

export default defineComponent({
  name: 'AdView',
  data() {
    return {
      ad: [],
    }
  },
  mounted() {
    AdApi.ad(this.$route.params.id).then(response => {
      this.ad = response.data
    }).catch(err => console.log(err))
    const map = L.map(this.$refs['mapElement'] as HTMLInputElement).setView([51.959, -8.623], 12);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
</style>
