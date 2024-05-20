<template>
  <div class="container mt-5">
    <h1>Profile</h1>

    <div>Nom: {{user.username}}</div>

    <div class="mt-5">
      <div class="d-flex gap-3 align-items-lg-baseline">
        <h2>Mes lieux</h2>
        <router-link :to="{ name: 'AreasForm' }">Ajouter un lieu</router-link>
      </div>

      <areas-list-component :areas="areas" @delete-area="deleteArea" :isProfile="true" v-if="areas.length !== 0"></areas-list-component>
      <div v-else>
        {{ text_lieu }}
      </div>
    </div>

    <div class="mt-5">
      <div class="d-flex gap-3 align-items-lg-baseline">
        <h2>Mes Voies</h2>
        <router-link :to="{name: 'RouteForm'}">Ajouter une voie</router-link>
        
      </div>
      <routes-list-component @delete-route="deleteRoute" :routes="routes" :isProfile="true" v-if="routes.length !== 0"/>
      <div v-else>{{text_route}}</div>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'
import AreasListComponent from '@/components/AreasListComponent.vue'
import RoutesListComponent from '@/components/RoutesListComponent.vue'
import { useToast } from 'vue-toast-notification'
const toast = useToast()

export default {
  components:{
    AreasListComponent,
    RoutesListComponent,
  },
  data() {
    return {
      areas: [],
      routes: [],
      user: {},
      text_route: "",
      text_lieu: "",
    }
  },

  methods: {
    getUser() {
      try {
        const token = localStorage.getItem('token') 
        if (token) {
          const decoded = jwtDecode(token)
          fetch('http://localhost:3000/users/' + decoded.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
            .then((response) => response.json())
            .then((data) => {
              this.user = data 
            }) 
        }
      } catch (err) {
        console.log(err);
      }
    },

    getMyAreas() {
      fetch('http://localhost:3000/areas/my-areas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.areas = data
          console.log(this.areas)
          if(data.length === 0){
            this.text_lieu = "Vous n'avez crée aucun lieu."
          }
          else{  
            this.text_lieu = ""
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getMyRoutes() {
      fetch('http://localhost:3000/routes/my-routes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => response.json())
      .then((data) => {
        this.routes = data 
        if(data.length === 0){
          this.text_route = "Vous n'avez crée aucune route."
        }
        else{
          this.text_route = ""
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },


    deleteRoute(id){ 
      fetch('http://localhost:3000/routes/' + id.id, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => response.json)
        .then(() => {
            toast.success("La route a été supprimé avec succès.", { position: 'top-right' })
            this.$router.push('/profile')       
        })
        .catch((err) => console.log('error', err))
    },

    deleteArea(id){ 
      console.log(id)
      fetch('http://localhost:3000/areas/' + id.id, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => response.json)
        .then(() => {
            toast.success("Le lieu a été supprimé avec succès.", { position: 'top-right' })
            this.$router.push('/profile')       
        })
        .catch((err) => console.log('error', err))
    }


  },
  created() {
    this.getUser()
    this.getMyAreas()
    this.getMyRoutes()
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: orange;
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(57, 5, 49);
  padding: 5px;
  border-radius: 5px;
}
</style>
