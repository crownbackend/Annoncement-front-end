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
                  <input type="text" class="form-control" placeholder="Saisissez une région, une ville...">
                </div>
              </div>
            </div>
            <h4 @click="showPrice"><span class="badge bg-secondary pointer">Prix</span></h4>
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

export default defineComponent({
  name: 'SearchComponent',
  data() {
    return {
      categories: [],
      countAds: null,
      showPriceCard: false,
    }
  },
  created() {
    CategoryApi.getCategories()
        .then(response => {
          this.categories = response.data.categories
          this.countAds = response.data.countAds
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
    },
    showPrice() {
      if(!this.showPriceCard) {
        this.showPriceCard = true
      } else {
        this.showPriceCard = false
      }
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
