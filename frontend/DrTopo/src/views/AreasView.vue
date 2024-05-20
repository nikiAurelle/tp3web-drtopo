<template>
  <h1>Lieux</h1>
  <areas-list-component :areas="allAreas" v-if="allAreas.length !== 0"/>
  <p>{{ text_area}}</p>
</template>

<script>
  import AreasListComponent from '@/components/AreasListComponent.vue'
    

  export default{
    components:{
    AreasListComponent
  },
  data() {
      return {
        allAreas: [],
        text_area: "",
      }
    },
  
    methods: {
      getAllAreas() {
        fetch('http://localhost:3000/areas/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => response.json())
          .then((data) => {
            this.allAreas = data 
            console.log(data)
            if(this.allAreas.length === 0){
              this.text_area = "Aucune route."
            }
            else{
              this.text_area = ""
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  
    mounted() {
      this.getAllAreas()
    }
  }
</script>