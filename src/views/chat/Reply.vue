<template>
  <div v-if="ad && ad.city && ad.images && ad.user">
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
              <textarea class="form-control" v-model="message" id="exampleFormControlTextarea1" rows="8"></textarea>
            </div>
            <div class="text-center">
              <button class="btn btn-primary" @click="sendMessage" type="button">Envoyer</button>
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
import UserApi from "@/service/UserApi";
import DiscussionApi from "@/service/DiscussionApi";

export default defineComponent({
  name: 'ReplyView',
  data() {
    return {
      ad: {} as Ad,
      message: '',
    }
  },
  mixins: [mixins],
  created() {
    UserApi.isConnected().then().catch(err => console.error(err))
    AdApi.ad(this.$route.params.id).then(response => {
      this.ad = response.data
      this.ad.createdAt = mixins.methods.formatDate(this.ad.createdAt)
      const name = this.ad.user.firstName + ' ' + this.ad.user.lastName
      this.message = `Bonjour ${name} votre annonce est-elle toujours disponible ?`
    }).catch(err => console.log(err))
  },
  methods: {
    sendMessage() {
      const data = {
        id: this.$route.params.id,
        message: this.message,
      }
      DiscussionApi.create(this.createFormData(data))
          .then(response => {
            if(response.data) {
              this.$router.push({name: 'discussion'})
            }
          })
          .catch(err => console.log(err))
    },
    createFormData(data: any) {
      const formData = new FormData()
      formData.append('adId', data.id)
      formData.append('message', data.message)
      return formData
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
