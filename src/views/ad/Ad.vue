<template>
  <div v-if="ad">
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
        <div id="container">
          <h4>{{ ad.city.name}} ({{ ad.city.codePostale}})</h4>
          <br>
          <div id="map"></div>
        </div>
        <hr>
        <div>
          <h5>Les annonces de {{ ad.user.firstName }} {{ ad.user.lastName }}</h5>
          <div class="row">
            <div class="col-md-3" :key="key" v-for="(ad, key) in adsUserLast">
              <div class="card">
                <img :src="ad.images[0].name" class="card-img-top" alt="...">
                <div class="card-body">
                  <h4 class="card-title">{{ ad.name.slice(0, 50) }}</h4>
                  <h5 class="card-text">{{ ad.price }}</h5>
                  <div class="form-text">{{ ad.city.name}} ({{ ad.city.codePostale}})</div>
                  <br>
                  <router-link target="_blank" :to="{ name: 'ad', params: { id: ad.id } }">
                    Voir l'annonce
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
      </div>
      <div class="col-md-4">
        <div class="card" style="width: 20rem;">
          <div class="card-body">
            <h5 class="card-title">{{ ad.user.email }}</h5>
            <p class="card-text">
              {{ ad.user.firstName }} {{ ad.user.lastName }}
              <br>
              Annonces : {{ ad.user.ads }}
            </p>
            <div class="d-grid gap-2 col-12 mx-auto">
              <router-link class="btn btn-primary" :to="{ name: 'reply', params: { id: ad.id } }">
                Message
              </router-link>
              <button class="btn btn-outline-secondary" @click="showNumberTelephone" v-if="!showTelephone && ad.telephone" type="button">
                Voir numéro téléphone
              </button>
              <button class="btn btn-outline-secondary" v-if="showTelephone" type="button">
                {{ ad.telephone }}
              </button>
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
import {defineComponent} from 'vue';
import AdApi from "@/service/AdApi";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import {LatLng} from "leaflet";
import Ad from "@/model/ad";
import Mixins from '@/mixins/Mixins';



export default defineComponent({
  name: 'AdView',
  data() {
    return {
      ad: {} as Ad,
      showTelephone: false,
      adsUserLast: [],
    }
  },
  mixins: [Mixins],
  beforeCreate() {
    AdApi.ad(this.$route.params.id).then(response => {
      this.ad = response.data
    }).catch(err => console.log(err))
  },
  mounted() {
    this.ad.createdAt = Mixins.methods.formatDate(this.ad.createdAt);
    const myIcon = L.icon({
      iconUrl: 'http://localhost:8081/pngegg.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    const map = L.map('map', {
      center: [this.ad.city.lat, this.ad.city.lon],
      zoom: 13
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(new LatLng(this.ad.city.lat, this.ad.city.lon), {icon: myIcon}).addTo(map)

    AdApi.userAdsLast(this.ad.user.id).then(response => {
      this.adsUserLast = response.data
    }).catch(err => console.error(err))
  },
  methods: {
    showNumberTelephone() {
      this.showTelephone = true
    }

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#map {
  width: 100%;
  height: 300px;
}
</style>
