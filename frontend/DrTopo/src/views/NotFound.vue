<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h1 class="display-4">Oops!</h1>
        <p class="lead">La page que vous recherchez est introuvable.</p>
        <p>Veuillez vérifier l'URL ou <router-link to="/">retournez à la page d'accueil</router-link>.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
/* Ajoute des styles si nécessaire */
</style>
