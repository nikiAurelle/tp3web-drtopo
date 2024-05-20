<template>
  <div class="container mt-3"  v-if="route && route.area && route.user">
    <h1>{{ route.name }}</h1>
    <div>
      <p>
        Lieu:
        <router-link :to="{ name: 'Area', params: { id: route.area._id } }">{{
          route.area.name
        }}</router-link>
      </p>
      <p>Type: {{ route.type }}</p>
      <p>
        Partagé par: {{ route.user.username }} le <span>{{ convertDate(route.createdAt) }}</span>
      </p>
    </div>

    <div>
      <h2>Approche</h2>

      <p v-if="route.approach">{{ route.approach }}</p>
    </div>

    <div>
      <h2 v-if="route.description">Description</h2>
      <p>{{ route.description }}</p>
    </div>

    <div>
      <h2 v-if="route.descent">Descente</h2>
      <p>{{ route.descent }}</p>
    </div>
  </div>
  <div v-else>
    <div class="spinner-border center-spinner" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: {}
    }
  },
 

  methods: {
    getRoute(id) {
      fetch('http://localhost:3000/routes/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.route = data
          console.log(this.route)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    convertDate(date) {
      const dat = new Date(date)
      const formattedDate = dat.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })

      return formattedDate
    }
  },
  created() {
    const id = this.$route.params.id
    this.getRoute(id)
  }
}
</script>
<style>
a {
  color: black;
}
.center-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Hauteur de la page entière */
}

</style>
