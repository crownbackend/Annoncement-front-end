<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-10">
        <h3 class="row h-100 justify-content-center align-items-center">Des millions de petites annonces et autant d’occasions de se faire plaisir</h3>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Catégories</option>
                  <option value="1" :key="key" v-for="(category, key) in categories">{{category.name}}</option>
                </select>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <input type="email" class="form-control" placeholder="name@example.com">
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <input type="email" class="form-control" placeholder="name@example.com">
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-secondary">Rechercher</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryApi from "@/service/CategoryApi";

export default defineComponent({
  name: 'SearchComponent',
  data() {
    return {
      categories: []
    }
  },
  created() {
    CategoryApi.getCategories()
        .then(response => {
          console.log(response)
          this.categories = response.data
        })
        .catch(err => console.log(err))
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
