<template>
  <div >
    <header-component />
    <router-view />
    <!-- <footer-component/> -->
  </div>
</template>

<script> 
  import HeaderComponent from './components/HeaderComponent.vue';
  import 'bootstrap/dist/css/bootstrap.css'
  // import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: { 
    HeaderComponent,
    // FooterComponent
  },
  data () {
    return {
    }
  }
}
</script>

<style>
 div{
  font-family: 'Times New Roman', Times, serif;
 }
</style>
