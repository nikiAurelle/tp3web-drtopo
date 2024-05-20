<template>
  <div class="container mt-5">
    <div class="w-50">
      <h1>{{ action }}</h1>

      <form novalidate @submit.prevent="actionRoute">
        <div>
          <label for="name">Nom</label>
          <input type="text" v-model.trim="name" id="name" class="form-control" />
          <p class="error">{{ errorName }}</p>
        </div>

        <div class="row g-3">
          <div class="col">
            <label for="type">Type</label>
            <select name="type" id="type" class="form-control" v-model="select_type">
              <option value="aucun" class="text-center">--Sélectionner une type--</option>
              <option :value="typ.value" v-for="(typ, index) of lisTypes" :key="index">
                {{ typ.text }}
              </option>
            </select>
            <p class="error">{{ errortype }}</p>
          </div>
          <div class="col">
            <label for="difficulte">Difficulté</label>
            <select name="difficulte" id="" class="form-control" v-model="select_difficulte">
              <option value="aucun" class="text-center">--Sélectionner une difficulté--</option>
              <option :value="index" v-for="(difficulte, index) of listDifficultes" :key="index">
                {{ difficulte.text }}
              </option>
            </select>
            <p class="error">{{ errordifficulte }}</p>
          </div>
        </div>

        <div class="col">
          <label for="lieu">Lieu</label>
          <select v-model="select_lieu" id="lieu" class="form-control">
            <option value="aucun" class="text-center">--Sélectionner le lieu--</option>
            <option :value="area._id" v-for="(area, index) of myAreas" :key="index">
              {{ area.name }}
            </option>
          </select>
          <p class="error">{{ errorlieu }}</p>
        </div>
        <div>
          <label for="approche">Approche</label>
          <input type="text" v-model.trim="approche" id="approche" class="form-control" />
          <p class="error">{{ errorapproche }}</p>
        </div>

        <div>
          <label for="description">Description</label>
          <input type="text" v-model.trim="description" id="description" class="form-control" />
          <p class="error">{{ errordescription }}</p>
        </div>

        <div>
          <label for="descente">Descente</label>
          <input type="text" v-model.trim="descente" id="descente" class="form-control" />
          <p class="error">{{ errordescente }}</p>
        </div>
        
        <div>
          <button>Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toast-notification'
const toast = useToast()
export default {
  data() {
    return {
      action: "Création d'une voie",
      errorName: '',
      errortype: '',
      errordifficulte: '',
      errorlieu: '',
      errorapproche: '',
      errordescription: '',
      errordescente: '',
      myAreas: [],
      name: '',
      description: '',
      descente: '',
      approche: '',
      type: '',
      lieu: '',
      difficulte: '',
      select_lieu: 'aucun',
      select_type: 'aucun',
      select_difficulte: 'aucun',
      lisTypes: [
        { value: 'SPORT', text: 'Sport' },
        { value: 'TRAD', text: 'Trad' },
        { value: 'TOPROPE', text: 'Top rope' }
      ],

      listDifficultes: [
        { value: 5.08, text: '5.8' },
        { value: 5.09, text: '5.9' },
        { value: 5.101, text: '5.10a' },
        { value: 5.102, text: '5.10b' },
        { value: 5.103, text: '5.10c' },
        { value: 5.104, text: '5.10d' },
        { value: 5.111, text: '5.11a' },
        { value: 5.112, text: '5.11b' },
        { value: 5.113, text: '5.11c' },
        { value: 5.114, text: '5.11d' },
        { value: 5.121, text: '5.12a' },
        { value: 5.122, text: '5.12b' },
        { value: 5.123, text: '5.12c' },
        { value: 5.124, text: '5.12d' },
        { value: 5.131, text: '5.13a' },
        { value: 5.132, text: '5.13b' },
        { value: 5.133, text: '5.13c' },
        { value: 5.134, text: '5.13d' },
        { value: 5.141, text: '5.14a' },
        { value: 5.142, text: '5.14b' },
        { value: 5.143, text: '5.14c' },
        { value: 5.144, text: '5.14d' },
        { value: 5.151, text: '5.15a' },
        { value: 5.152, text: '5.15b' },
        { value: 5.153, text: '5.15c' },
        { value: 5.154, text: '5.15d' }
      ],
      route: {},
      id: ""
    }
  },

  methods: {
    validation() {
      console.log(this.select_lieu)
      var valid = true
      var texte = 'Ce champ est requis.'
      if (!this.name) {
        this.errorName = texte
        valid = false
      } else this.errorName = ''

      if (!this.description) {
        this.errordescription = texte
        valid = false
      } else this.errordescription = '' 
      if (this.select_type === 'aucun') {
        this.errortype = texte
        valid = false
      } else this.errortype = ''

      if (this.select_difficulte === 'aucun') {
        this.errordifficulte = texte
        valid = false
      } else this.errordifficulte = ''

      if (this.select_lieu === 'aucun') {
        this.errorlieu = texte
        valid = false
      } else this.errorlieu = ''

      return valid
    },

    actionRoute() {
      if (this.validation()) {
        const route = {
          id: this.id,
          name: this.name,
          type: this.select_type,
          grade: {
            text: this.listDifficultes[parseInt(this.select_difficulte)].text,
            value: this.listDifficultes[parseInt(this.select_difficulte)].value
          },
          description: this.description,
          approach: this.approche,
          descent: this.descente,
          area: this.select_lieu
        } 

        if(this.id)
          this.updateRoute(route)
        else
          this.createRoute(route)
      }

    },
    createRoute(route){
      fetch('http://localhost:3000/routes/', {
          method: 'POST',
          body: JSON.stringify(
            route
          ),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((data) => {
            if (data.statusCode === 409) {
              toast.error("Une route possède déjà ce nom.", { position: 'top-right' })
              return
            }
            else if(data.status == 201){
              toast.success("La route a été crée avec succès.", { position: 'top-right' })
              this.$router.push('/profile')
            }
          })
          .catch((err) => console.log('error', err))
    },
    updateRoute(route){
      fetch('http://localhost:3000/routes/' + this.id, {
          method: 'PUT',
          body: JSON.stringify(
            route
          ),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((data) => {
            if (data.statusCode === 403) {
              toast.error(data.message, { position: 'top-right' })
              return
            }
            else if(data.status == 200){
              toast.success("La route a été modifié avec succès.", { position: 'top-right' })
              this.$router.push('/profile')
            }
          })
          .catch((err) => console.log('error', err))
    },
    getMyAreas() {
      fetch('http://localhost:3000/areas/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.myAreas = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRoute(id){
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
          this.name = this.route.name
          this.select_type = this.route.type
          console.log(this.route.grade.value)
          let index = 0
          this.listDifficultes.forEach(diff => {
            if(diff.value === this.route.grade.value)
              this.select_difficulte = index
            index++;
          });
          
          this.select_lieu = this.route.area._id
          if(this.route.approach)
            this.approche = this.route.approach
          if(this.route.descent)
          this.descente = this.route.descent
          this.description = this.route.description

        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getMyAreas()
    
  },
  created(){
    this.id = this.$route.params.id
    if(this.id)
    {
      this.getRoute(this.id)
      this.action = "Modification d'une voie"
    }
  }
}
</script>

<style scoped>
button {
  text-decoration: none;
  color: orange;
  font-size: 20px;
  font-weight: bold;
  background-color: black;
  padding: 5px;
  border-radius: 5px;
}
label {
  font-weight: bold;
}
</style>
