<template>
  <div v-if="ad.length !== 0">
    <div class="row">
      <div class="col-md-6">
        <div class="card" style="width: 100%;">
          <div class="card-body">
            <h5 class="card-title">{{ ad.user.email }}</h5>
            <p class="card-text">
              {{ ad.user.firstName }} {{ ad.user.lastName }}
            </p>
          </div>
        </div>
        <br>
        <div class="card" style="width: 100%;">
          <div class="card-body">
            <h4 class="card-title">Envoyer un message à Mtss {{ ad.user.firstName }} {{ ad.user.lastName }}</h4>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Votre message</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="8">Bonjour votre annonce m'intéresse ! Est-elle toujours disponible ?</textarea>
            </div>
            <div class="text-center">
              <button class="btn btn-primary" type="button">Envoyer</button>
            </div>
          </div>
        </div>

      </div>
      <div class="col-md-6">
        <div class="card w-75">
          <div class="card-body">
            <h2>Résumé de l'annonce</h2>
            <br>
            <br>
            <h5 class="card-title">{{ ad.name}}</h5>
            <h5 class="card-title">{{ ad.price}} €</h5>
            <div class="form-text">{{ ad.createdAt}}</div>

            <hr>
            <h5 class="card-title">Description</h5>
            <p class="card-text">{{ ad.description }}</p>

            <hr>
            <h5 class="card-title">Localisation</h5>
            <p class="card-text">{{ ad.city.name}} ({{ ad.city.codePostale}})</p>
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
import { defineComponent } from 'vue';
import AdApi from "@/service/AdApi";
import Ad from "@/model/ad";
import mixins from "@/mixins/Mixins";

export default defineComponent({
  name: 'ReplyView',
  data() {
    return {
      ad: {} as Ad
    }
  },
  mixins: [mixins],
  beforeCreate() {
    AdApi.ad(this.$route.params.id).then(response => {
      this.ad = response.data
      this.ad.createdAt = mixins.methods.formatDate(this.ad.createdAt)
    }).catch(err => console.log(err))
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
