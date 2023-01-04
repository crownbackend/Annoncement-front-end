<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center" v-if="categories">
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
                  <input type="text" class="form-control" placeholder="Que chercher vous ?">
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"><i class="bi bi-geo-alt"></i></span>
                  <input type="text" @keyup="searchPosition" @focus="searchResult" v-model="searchForm.city" class="form-control" placeholder="Saisissez une ville">
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
            <span @click="showPrice" class="badge bg-secondary pointer">Prix</span>
            <div class="card" style="width: 15rem;" v-if="showPriceCard">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div v-if="countAds" class="d-grid gap-2 col-6 mx-auto row h-100 justify-content-center align-items-center">
              <button class="btn btn-primary" type="button">Rechercher ({{countAds}} résultats)</button>
            </div>
            <div v-else class="d-grid gap-2 col-6 mx-auto row h-100 justify-content-center align-items-center">
              <h2>Aucune annonce n'est disponible dans cette catégorie.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryApi from "@/service/CategoryApi";
import {Category} from "@/model/category";
import CityApi from "@/service/CityApi";

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
      searchForm: {
        city: ''
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
      this.categories.forEach((v: Category) => {
        if(valueNumber === v.id) {
          this.countAds = v.categories
        }
      })
      if(valueNumber === 0) {
        this.countAds = this.countCategoriesGlobal
      }
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
          console.log(response)
          this.cites = response.data
        }).catch(err => console.log(err))
      }
    },
    searchResult() {
      if(!this.showCitySearch) {
        this.showCitySearch = true
      } else {
        this.showCitySearch = false
      }
    },
    selectCity(city: any) {
      this.searchForm.city = city.name + ' (' + city.codePostale + ')'
      this.showCitySearch = false
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
