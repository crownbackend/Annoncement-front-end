<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-10 col-md-8 col-lg-6">
        <!-- Form -->
        <form @submit.prevent="submit">
          <h1>Connecter vous</h1>
          <p class="description">Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
          <!-- Input fields -->
          <div class="mb-3">
            <label for="username">Email:</label>
            <input type="text" class="form-control username" id="username" v-model="dataForm.email" placeholder="Username..." name="username">
          </div>
          <div class="mb-3">
            <label for="password">Mot de passe:</label>
            <input type="password" class="form-control password" id="password" v-model="dataForm.password" placeholder="Password..." name="password">
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" v-if="btnLogin">Connexion</button>
            <button class="btn btn-primary" type="button" disabled v-if="loading">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Chargement...
            </button>
          </div>
        </form>
        <!-- Form end -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SecurityApi from "@/service/SecurityApi";

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      dataForm: {
        email: '',
        password: ''
      },
      loading: false,
      btnLogin: true
    }
  },
  methods: {
    validateEmail(email: string)
    {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    submit() {
      if(this.validateEmail(this.dataForm.email)) {
        if(this.dataForm.password) {
          this.loading = true
          this.btnLogin = false
          const data = {
            email: this.dataForm.email,
            password: this.dataForm.password
          }
          SecurityApi.login(data).then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            this.$router.push('/')
            this.toastShow('success', 'Connexion réussi !')
          }).catch(() => {
            this.loading = false
            this.btnLogin = true
            this.toastShow('error', 'Email ou mot de passe non connu !')
          })
        } else {
          this.toastShow('error', 'Mot de passe non valide !')
        }
      } else {
        this.toastShow('error', 'Email non valide !')
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
