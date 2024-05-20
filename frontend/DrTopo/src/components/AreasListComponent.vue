<template>
  <div class="container mt-5">
    <div
      v-for="(area, index) of areas"
      :key="index"
      class="d-flex justify-content-between div-lieux"
      :class="{ color: index % 2 === 0 }"
    >
      <router-link :to="{ name: 'Area', params: { id: area._id } }">{{ area.name }}</router-link>
      <span class="fw-bold" v-if="!isProfile">{{ area.routes.length }} voies</span>
      <div v-else class="d-flex gap-2">
        <router-link :to="{ name: 'AreasFormEdit', params: { id: area._id } }"
          >Modifier</router-link
        >
        <router-link :to="{ name: 'Profile' }" @click="deleteArea(area._id)">Supprimer</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listAreas',
  props: {
    areas: {
      type: Array,
      required: true
    },
    isProfile: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    deleteArea(id) {
      this.$emit('delete-area', {
        id: id
      })
    }
  }
}
</script>

<style scoped>
a {
  color: black;
}

.div-lieux {
  font-size: 20px;
  border-bottom: 1px solid rgb(117, 115, 115);
  padding: 5px;
}
.color {
  background-color: rgb(218, 215, 217);
}
</style>
