<template>
  <div class="container mt-3">
    <div
      v-for="(route, index) of routes"
      :key="index"
      class="d-flex justify-content-between div-lieux p-2"
      :class="{ color: index % 2 === 0 }"
    >
      <div class="len">
        <router-link :to="{ name: 'Route', params: { id: route._id } }">{{
          route.name
        }}</router-link>
      </div>
      <div class="len d-flex justify-content-center" v-if="route.area">
        <router-link :to="{ name: 'Area', params: { id: route.area._id } }">{{
          route.area.name
        }}</router-link>
      </div>
      <div class="d-flex len justify-content-end">
        <p>{{ route.grade.text }}</p>
      </div>
      <div class="d-flex len justify-content-end type">
        <p>{{ route.type }}</p>
      </div>

      <div v-if="isProfile" class="d-flex gap-2">
        <router-link :to="{ name: 'RouteFormEdit', params: { id: route._id } }">Modifier </router-link>
        <router-link :to="{name: 'Profile'}" @click="deleteRoute(route._id)">Supprimer</router-link >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['delete-route'],
  name: 'listRoutes',
  props: {
    routes: {
      type: Array,
      required: true
    },
    isProfile: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
        type: "",
        lisTypes: [
        { value: 'SPORT', text: 'Sport' },
        { value: 'TRAD', text: 'Trad' },
        { value: 'TOPROPE', text: 'Top rope' }
      ],
    }
  },

  methods:{
    convertType(text){
        this.lisTypes.forEach(type => {
            if(type === text){
                this.type = type.text
            }
        });
    },

    deleteRoute(id){
        this.$emit(
            "delete-route",{
                id: id
            }
        )
    }
  },
  

}
</script>

<style scoped>
.color {
  background-color: rgb(218, 215, 217);
}
.div-lieux{
    font-size: 20px; 
    border-bottom: 1px solid rgb(117, 115, 115);
    padding: 5px;
  }
.len {
  width: 25%;
}
.type{
    margin-right: 10px;
}
a {
  color: black; 
}
</style>
