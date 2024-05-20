<template>
  <div class="container">
    <div class="d-flex justify-content-between mt-5">
      <div class="wi-50">
        <h1>Au-delà du guide</h1>
        <p class="fs-4">Des milliers de voies partagées par pationné(e)s d’escalade comme vous!</p>
      </div>
      <div class="wi-50 bg-secondary p-4 rounded">
        <form novalidate @submit.prevent="searchData">
          <h3>Trouver une voie</h3>
          <div class="d-flex gap-3 align-items-center">
            <label for="type" class="fw-bold">Type</label>
            <div>
              <select name="type" id="type" class="form-control" v-model="select_type">
                <option
                  :value="typ.value"
                  v-for="(typ, index) in lisTypes"
                  :key="index" 
                >
                  {{ typ.text }}
                </option>
              </select>
             
            </div>
            <div>
              <select name="difficulte1" id="" class="form-control" v-model="select_difficulte1">
                <option
                  :value="index"
                  v-for="(difficulte, index) of listDifficultes"
                  :key="index">

                  {{ difficulte.text }}
                </option>
              </select>
              
            </div>
            <p class="fw-bold">à</p>
            <div>
              <select name="difficulte2" id="" class="form-control" v-model="select_difficulte2">
                <option :value="index" v-for="(difficulte, index) of listDifficultes" :key="index">
                  {{ difficulte.text }}
                </option>
              </select> 
            </div>

            
          </div>
          <p class="error">{{ errordifficulte }}</p>

          <div class="d-flex gap-3 mt-3">
            <label for="lieu" class="fw-bold">Lieu</label>
            <select v-model="select_lieu" id="lieu" class="form-control">
              <option value="aucun" class="text-center">--Sélectionner le lieu--</option>
              <option :value="area._id" v-for="(area, index) of myAreas" :key="index">
                {{ area.name }}
              </option>
            </select>
            <p class="error">{{ errorlieu }}</p>
          </div>

          <div class="mt-3">
            <button class="btn btn-warning">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-5">
      <h3>Voies de type sport entre 5.8 et 5.11d</h3>
      <p class="fs-5 fw-bold fs-4 mt-2" >{{data_exist}}</p>
      <div class="fs-5 fw-bold fs-4 mt-2" v-if="routes.length !== 0">{{routes.length}}  résultats triés par difficulté</div>
      <routes-list-component :routes="routes" v-if="routes.length !== 0"/>
      
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toast-notification'
import RoutesListComponent from '@/components/RoutesListComponent.vue'
const toast = useToast()
export default {
  data() {
    return {
      action: "Création d'une voie",
     
      errordifficulte: '', 
      errorlieu: '',
      myAreas: [],
      routes: [],
      type: '',
      lieu: '',
      difficulte: '',
      select_lieu: 'aucun',
      select_type: 'SPORT',
      select_difficulte1: '5.07',
      select_difficulte2: '5.154',
      data_exist: "",
      lisTypes: [
        { value: 'SPORT', text: 'Sport' },
        { value: 'TRAD', text: 'Trad' },
        { value: 'TOPROPE', text: 'Top rope' }
      ],

      listDifficultes: [
        // { value: '5.07', text: '5.7' },
        { value: '5.08', text: '5.8' },
        { value: '5.09', text: '5.9' },
        { value: '5.101', text: '5.10a' },
        { value: '5.102', text: '5.10b' },
        { value: '5.103', text: '5.10c' },
        { value: '5.104', text: '5.10d' },
        { value: '5.111', text: '5.11a' },
        { value: '5.112', text: '5.11b' },
        { value: '5.113', text: '5.11c' },
        { value: '5.114', text: '5.11d' },
        { value: '5.121', text: '5.12a' },
        { value: '5.122', text: '5.12b' },
        { value: '5.123', text: '5.12c' },
        { value: '5.124', text: '5.12d' },
        { value: '5.131', text: '5.13a' },
        { value: '5.132', text: '5.13b' },
        { value: '5.133', text: '5.13c' },
        { value: '5.134', text: '5.13d' },
        { value: '5.141', text: '5.14a' },
        { value: '5.142', text: '5.14b' },
        { value: '5.143', text: '5.14c' },
        { value: '5.144', text: '5.14d' },
        { value: '5.151', text: '5.15a' },
        { value: '5.152', text: '5.15b' },
        { value: '5.153', text: '5.15c' },
        { value: '5.154', text: '5.15d' }
      ]
    }
  },
  components:{
    RoutesListComponent
  },

  methods: {
    searchData() {
      this.routes = []
      fetch('http://localhost:3000/routes/?type='+  this.select_type +'&difficulte1='+  
        this.select_difficulte1 +'&difficulte2='+  this.select_difficulte2 +'&lieu='+ this.select_lieu, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((data) => data.json())
        .then((data) =>{
          if(data.length !== 0){
            this.routes = data
            this.data_exist = ""
          } 
          else{
            this.data_exist = "Aucune route trouvée."
          }
        })
        .catch((err) => console.log('error', err))
    },

    getMyAreas() {
      fetch('http://localhost:3000/areas/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.myAreas = data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getMyAreas()
  }
}
</script>

<style scoped>
.wi-50 {
  width: 49%;
}
</style>
