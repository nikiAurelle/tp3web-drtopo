<template> 
  <form novalidate @submit.prevent="submitData">
    
    <div>
      <label for="name">Nom</label>
      <input type="text" v-model.trim="name" id="name" class="form-control" />
      <p class="error">{{errorName}}</p>
    </div>

    <div class="row g-3">
      <div class="col">
        <label for="latitude">Latitude</label>
        <input type="number" class="form-control" id="latitude" v-model="latitude" />
        <p class="error">{{errorLatitude}}</p>
      </div>
      <div class="col">
        <label for="longitude">Longitude</label>
        <input type="number" class="form-control" id="longitude" v-model="longitude" />
        <p class="error">{{errorLongitude}}</p>
      </div>
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea class="form-control" v-model.trim="description" id="description" rows="3"></textarea>
      <p class="error">{{errorDescription}}</p>
    </div>

    <div class="mb-3">
        <label for="gettingThere" class="form-label">S'y rendre</label>
        <textarea class="form-control" v-model.trim="gettingThere" id="gettingThere" rows="3"></textarea>
        <p class="error">{{errorgettingThere}}</p>
    </div>

    <div>
        <button>Enregistrer</button>
    </div>

  </form>
</template>

<script> 
export default {
  emits: ['add-area'],
  name: 'getArea',
  props:{
    area: {
      type : Object,
      required: false
    }
  },
  data() {
    return {
      action: "Création d'un lieu",
      name: "",
      description: "",
      latitude:"",
      longitude: "",
      gettingThere: "",
      errorName: "",
      errorDescription: "",
      errorLatitude: "",
      errorLongitude: "",
      errorgettingThere: "",
      valid: true
    }
  },

  methods: {
    validation(){
      var texte = "Ce champ est requis."
      if(!this.name)
      {
        this.errorName = texte 
        this.valid = false
      }
      else
        this.errorName = ""

      if(!this.description){
        this.errorDescription = texte
        this.valid = false
      }
      else 
        this.errorDescription = ""
      if(!this.latitude || this.latitude < -90 || this.latitude > 90){
        this.errorLatitude = "La latitude doit être comprise entre -90 et 90."
        this.valid = false
      }
      else
        this.errorLatitude = ""
      if(!this.longitude || this.longitude < -180 || this.longitude > 180){
        this.errorLongitude = "La longitude doit être comprise entre -180 et 180."
        this.valid = false
      }
      else
        this.errorLongitude = ""
      if(!this.gettingThere){
        this.errorgettingThere = texte
        this.valid = false
      }
      else
        this.errorgettingThere = ""

        return this.valid
    },

    submitData(){ 
      if(this.validation()){
        this.$emit(
          "add-area",{
            name: this.name,
            description: this.description,
            longitude: this.longitude,
            latitude: this.latitude,
            gettingThere: this.gettingThere,
          }
        ) 
      };
    },

    watch: {
    area: {
      immediate: true,
      handler(newVal) {
        this.setArea(newVal);
      }
    }
  },

    setArea(){ 
      if(this.area){
        this.name = this.area.name
        this.longitude = this.area.lon
        this.latitude = this.area.lat
        this.description = this.area.description
        this.gettingThere = this.area.gettingThere
      }
    }
  }, 
}
</script>

<style scoped>
    button{
        text-decoration: none;
        color: orange;
        font-size: 20px;
        font-weight: bold;
        background-color: black;
        padding: 5px;
        border-radius: 5px;
    }
    label{
        font-weight: bold;
    }
</style>
