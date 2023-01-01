<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-10 col-md-8 col-lg-6">
        <!-- Form -->
        <form class="form-example" action="" method="post">
          <h1>Connecter vous</h1>
          <p class="description">Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
          <!-- Input fields -->
          <div class="mb-3">
            <label for="username">Username:</label>
            <input type="text" class="form-control username" id="username" placeholder="Username..." name="username">
          </div>
          <div class="mb-3">
            <label for="password">Password:</label>
            <input type="password" class="form-control password" id="password" placeholder="Password..." name="password">
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit">Connexion</button>
          </div>
        </form>
        <!-- Form end -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginView',
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
