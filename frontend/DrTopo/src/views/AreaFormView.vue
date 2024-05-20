<template>
  <div class="container mt-5">
    <h1>{{ action }}</h1>
    <form novalidate @submit.prevent="actionArea">
      <div>
        <label for="name">Nom</label>
        <input type="text" v-model.trim="name" id="name" class="form-control" />
        <p class="error">{{ errorName }}</p>
      </div>

      <div class="row g-3">
        <div class="col">
          <label for="latitude">Latitude</label>
          <input type="number" class="form-control" id="latitude" v-model="latitude" />
          <p class="error">{{ errorLatitude }}</p>
        </div>
        <div class="col">
          <label for="longitude">Longitude</label>
          <input type="number" class="form-control" id="longitude" v-model="longitude" />
          <p class="error">{{ errorLongitude }}</p>
        </div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          v-model.trim="description"
          id="description"
          rows="3"
        ></textarea>
        <p class="error">{{ errorDescription }}</p>
      </div>

      <div class="mb-3">
        <label for="gettingThere" class="form-label">S'y rendre</label>
        <textarea
          class="form-control"
          v-model.trim="gettingThere"
          id="gettingThere"
          rows="3"
        ></textarea>
        <p class="error">{{ errorgettingThere }}</p>
      </div>

      <div>
        <button>Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script>
// import AreaFormComponent from '@/components/AreaFormComponent.vue'
// import AreaComponent from '@/components/AreaComponent.vue';
import { useToast } from 'vue-toast-notification'
const toast = useToast()

export default {
  components: {
    // AreaFormComponent
    // AreaComponent,
  },
  data() {
    return {
      id: '',
      action: "Création d'un lieu",
      area: {},
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      gettingThere: '',
      errorName: '',
      errorDescription: '',
      errorLatitude: '',
      errorLongitude: '',
      errorgettingThere: '',
      valid: true
    }
  },
  methods: {
    validation() {
      var texte = 'Ce champ est requis.'
      if (!this.name) {
        this.errorName = texte
        this.valid = false
      } else this.errorName = ''

      if (!this.description) {
        this.errorDescription = texte
        this.valid = false
      } else this.errorDescription = ''
      if (!this.latitude || this.latitude < -90 || this.latitude > 90) {
        this.errorLatitude = 'La latitude doit être comprise entre -90 et 90.'
        this.valid = false
      } else this.errorLatitude = ''
      if (!this.longitude || this.longitude < -180 || this.longitude > 180) {
        this.errorLongitude = 'La longitude doit être comprise entre -180 et 180.'
        this.valid = false
      } else this.errorLongitude = ''
      if (!this.gettingThere) {
        this.errorgettingThere = texte
        this.valid = false
      } else this.errorgettingThere = ''

      return this.valid
    },

    actionArea() {
    
      if (this.validation()) {
        const area = {
        name: this.name,
        description: this.description,
        lon: this.longitude,
        lat: this.latitude,
        gettingThere: this.gettingThere
      }
        if (this.id) this.updateArea(area)
        else this.createArea(area)
      }
    },

    createArea(area) {
      console.log(area)
      fetch('http://localhost:3000/areas/', {
        method: 'POST',
        body: JSON.stringify(area),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.statusCode == 409) {
            toast.error(data.message, { position: 'top-right' })
            return
          }

          toast.success(data.message, { position: 'top-right' })
          this.$router.push('/profile')
        })
        .catch((err) => console.log('error', err))
    },

    updateArea(area) {
      area.id = this.id

      fetch('http://localhost:3000/areas/' + this.id, {
        method: 'PUT',
        body: JSON.stringify(area),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((data) => {
          if (data.statusCode === 403) {
            toast.error('pas autorisation', { position: 'top-right' })
            return
          } else if (data.status == 200) {
            toast.success('Le lieu a été modifié avec succès.', { position: 'top-right' })
            this.$router.push('/profile')
          }
        })
        .catch((err) => console.log('error', err))
    },

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
          this.name = this.area.name
          this.latitude = this.area.lat
          this.longitude = this.area.lon
          this.description = this.area.description
          this.gettingThere = this.area.gettingThere
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    this.id = this.$route.params.id
    if (this.id) {
      this.getArea(this.id)
      this.action = "Modification d'un lieu"
    }
  }
}
</script>

<style scoped>
.w-49 {
  width: 48%;
}
</style>
