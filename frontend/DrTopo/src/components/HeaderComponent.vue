<template> 
  <header class=" ">

    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/" id="logo"> DR<span class="t-logo">T</span>OPO</router-link>
      <div class="link-nav d-flex gap-4 align-items-center">
        <div><router-link :to="{name : 'Areas'}">Lieux</router-link></div> 
        <div><router-link v-show="!exit" :to="{name : 'Signin'}">Connexion</router-link></div> 
        <div><router-link v-show="!exit" :to="{name : 'Signup'}" class="btn btn-warning text-black">Inscription</router-link></div>
        <div><router-link v-show="exit" :to="{name : 'Profile'}">
          <!-- <img src="https://robohash.org/NomPrenom" alt="avatar"/> -->
          Profile</router-link></div>
        <div><a v-show="exit" v-on:click="logout" :to="{name : 'Profile'}" class="btn btn-warning text-black">Deconnexion</a></div>
      </div>
    </div>
  </header>
  
</template>

<script>
 export default{
  data(){
    return {
      exit: false
    }
  },
  watch: {
    '$route'(){
      this.exit = localStorage.getItem('token') !== null
    }
  },
  created(){
    this.exit = localStorage.getItem('token') !== null
  },
  methods:{
    logout(){
      localStorage.removeItem('token')
      this.exit = false
      this.$router.push({name: 'Index'})
    }
  }
 }

</script>

<style w>

#logo{
  color: white;
  font-size: 40px;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 0;
}

header{
  background-color: rgb(33, 3, 61);
  padding: 10px 0 10px 0;

}
.t-logo{
  color: orange;
  font-weight: bold;
}
.link-nav a{
  text-decoration: none;
  color: white; 
  font-size: 20px;
  font-weight: bold;

}
/* Ces deux classes sont automatiquement ajoutées au liens par le systeme de routage */
/* Elles permettent de rendre les liens actifs avec une couleur différentes */
a.router-link-active,
a.router-link-exact-active {
  color: orange;
  border-bottom: 1px solid orange;

} 

header:not(#logo) a.router-link-active,
header:not(#logo) a.router-link-exact-active {
  
  border-bottom: none;
}

img{
  width: 30px;
}
 
</style>
