<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-10">
        <h3 class="row h-100 justify-content-center align-items-center">Des millions de petites annonces et autant d’occasions de se faire plaisir</h3>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <select class="form-select" aria-label="Default select example" @change="selectCategory($event)">
                  <option value="0" selected>Catégories</option>
                  <option :value="category.id" :key="key" v-for="(category, key) in categories">{{category.name}}</option>
                </select>
              </div>
              <div class="col-md-4">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
                  <input type="text" class="form-control" @keyup="searchUser($event)" v-model="searchForm.search" placeholder="Que chercher vous ?">
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"><i class="bi bi-geo-alt"></i></span>
                  <input type="text" @keyup="searchPosition" v-model="cityShow" class="form-control" placeholder="Saisissez une ville">
                </div>
                <div v-if="showCitySearch" class="popover bs-popover-auto fade" :class="{show: showCitySearch}">
                  <div class="popover-header">Location</div>
                  <div class="popover-body">
                    <ul class="list-group">
                      <li class="list-group-item pointer" @click="selectCity(city)" :key="key" v-for="(city, key) in cites">{{city.name}} ({{city.codePostale}})</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <span @click="showPrice" class="badge bg-secondary pointer" style="font-size: 1.3rem">Prix</span>
            <div class="card" style="width: 30rem;" v-if="showPriceCard">
              <div class="card-body">
                <h5 class="card-title">Prix</h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="min">€</span>
                      <input type="number" class="form-control" v-model="searchForm.priceMin" placeholder="Minimum" aria-label="min" aria-describedby="basic-addon1">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="max">€</span>
                      <input type="number" class="form-control" v-model="searchForm.priceMax" placeholder="Maximum" aria-label="max" aria-describedby="basic-addon1">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <div v-if="countAds" class="d-grid gap-2 col-6 mx-auto row h-100 justify-content-center align-items-center">
              <button class="btn btn-primary" type="button">Rechercher ({{countAds}} résultats)</button>
            </div>
            <div v-if="!countAds" class="d-grid gap-2 col-6 mx-auto row h-100 justify-content-center align-items-center">
              <h2>Aucune annonce n'est disponible dans cette catégorie.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div v-if="countAds" class="d-grid gap-2 col-6 mx-auto row h-100 justify-content-center align-items-center">
      <button class="btn btn-secondary" type="button">Deposé une annonce</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryApi from "@/service/CategoryApi";
import CityApi from "@/service/CityApi";
import AdApi from "@/service/AdApi";

export default defineComponent({
  name: 'SearchComponent',
  data() {
    return {
      categories: [],
      countAds: null,
      showPriceCard: false,
      showCitySearch: false,
      countCategoriesGlobal: null,
      cites: [],
      cityShow: '',
      price: '',
      searchForm: {
        city: '',
        category: '',
        search: '',
        priceMin: '',
        priceMax: '',
      }
    }
  },
  created() {
    CategoryApi.getCategories()
        .then(response => {
          this.categories = response.data.categories
          this.countAds = response.data.countAds
          this.countCategoriesGlobal = response.data.countAds
        })
        .catch(() => {
          this.toastShow('error', 'Erreur serveur')
        })
  },
  methods: {
    selectCategory(event: Event) {
      const value = (event.target as HTMLInputElement).value
      const valueNumber = Number(value)
      if(valueNumber === 0) {
        this.countAds = this.countCategoriesGlobal
      }
      this.searchForm.category = value
      this.searchAdsCount(this.createFormData(this.searchForm))
    },
    showPrice() {
      if(!this.showPriceCard) {
        this.showPriceCard = true
      } else {
        this.showPriceCard = false
      }
    },
    searchPosition(event: Event) {
      if(!this.showCitySearch) {
        this.showCitySearch = true
      }

      const value = (event.target as HTMLInputElement).value
      if(value.length >= 1) {
        CityApi.searchCity(value).then(response => {
          this.cites = response.data
        }).catch(err => console.log(err))
      }
    },
    selectCity(city: any) {
      this.searchForm.city = city.id
      this.showCitySearch = false
      this.searchAdsCount(this.createFormData(this.searchForm))
      this.cityShow = city.name + ' (' + city.codePostale + ')'
    },
    searchUser(event: Event) {
      const value = (event.target as HTMLInputElement).value
      this.searchForm.search = value
      this.searchAdsCount(this.createFormData(this.searchForm))
    },
    searchAdsCount(data: any) {
      AdApi.searchAdCount(data).then(response => {
        this.countAds = response.data
      }).catch(err => console.log(err))
    },
    createFormData(data: any) {
      const formData = new FormData()
      formData.append('category', data.category)
      formData.append('city', data.city)
      formData.append('priceMax', data.priceMax)
      formData.append('priceMin', data.priceMin)
      formData.append('search', data.search)
      return formData
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

</style>
