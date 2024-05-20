<template>
  <div class="container mt-5">
    <h1>{{ area.name }}</h1>
    <div id="mapContainer"></div>

    <div>
      <h2 class="mt-4">Description</h2>
      <p>{{ area.description }}</p>
    </div>

    <div class="mt-4">
      <h2>S'y rendre</h2>
      <p>{{ area.gettingThere }}</p>
    </div>

    <div class="mt-5">
      <h1>Voies</h1>
      <routes-list-component :routes="area.routes"></routes-list-component>
      <p>{{ text_voie }}</p>
    </div>
  </div>
</template>

<script>
import RoutesListComponent from '@/components/RoutesListComponent.vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
export default {
  data() {
    return {
      area: {},
      text_voie: '',
      map: null,
      latitude: 0,
      longitude: 0
    }
  },
  components: {
    RoutesListComponent
  }, 
  methods: {
    getArea(id) {
      fetch('http://localhost:3000/areas/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.area = data
          this.initMap();
          this.findUserLocation();
          if (this.area.routes.length === 0) {
            this.text_voie = 'Aucune voie.'
          } else {
            this.text_voie = ''
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    initMap() {
      this.map = L.map('mapContainer').setView([this.latitude, this.longitude], 16)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)
    },
    findUserLocation() {
      console.log(this.area)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => { 
            const latitude = this.area.lat
            const longitude = this.area.lon

            console.log(longitude)
            this.latitude = latitude
            this.longitude = longitude

            this.map.setView([latitude, longitude], 13)
            L.marker([latitude, longitude], { draggable: true }).addTo(this.map)
          },
          (error) => {
            console.error('erreur:', error)
            if (error.code == error.PERMISSION_DENIED) {
              alert('Vous devez autoriser la géolocalisation pour utiliser cette fonctionnalité.')
            }
          }
        )
      } else {
        console.error("La géolocalisation n'est pas supportée par votre navigateur.")
      }
    }
  },
  created() {
    const id = this.$route.params.id 
    this.getArea(id)
  }
}
</script>

<style scoped>
#mapContainer{
  width: 300px;
  background-color: gray;
  height: 300px;
}
</style>
