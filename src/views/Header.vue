<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="container-fluid">
        <router-link class="navbar-brand text-bg-primary" to="/">LeBonPoint</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-bg-primary" aria-current="page" href="#"><i class="bi bi-search m-1"></i>Recherche</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-bg-primary" aria-current="page" href="#"><i class="bi bi-plus-square m-1"></i>Déposer une annonce</a>
            </li>
            <li class="nav-item" v-if="user">
              <router-link :to="{name: 'discussion'}" class="nav-link text-bg-primary" aria-current="page" href="#">
                <i class="bi bi-chat-dots-fill"></i> Messages
                <span class="badge text-bg-secondary">4</span>
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-bg-primary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" v-if="user" @click="logOut" href="#">Déconnexion</a></li>
              </ul>
            </li>
          </ul>
          <div class="col-md-3 text-end"  v-if="!user" >
            <router-link to="/connexion" class="btn btn-outline-success me-2 ">Connexion</router-link>
            <button type="button" class="btn btn-success">Inscription</button>
          </div>
          <div class="col-md-3 text-end" v-if="user" >
            <button type="button" class="btn btn-success"><i class="bi bi-person-circle"></i>{{email}}</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthService from "@/service/AuthService";


export default defineComponent({
  name: 'HeaderView',
  data() {
    return {
      user : AuthService.getUser(),
      email: AuthService.getInfosUser().email
    }
  },
  methods: {
    logOut() {
      AuthService.logOut();
      this.$router.push('/connexion')
    }
  }
});
</script>

<style lang="scss">

</style>
