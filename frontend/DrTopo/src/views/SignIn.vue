<template>
  <div class="container mt-5 mb-5">
    <div class="div-form centered-form">
      <form class="mt-3 mb-5" novalidate @submit.prevent="login">
        <h1 class="bg-black text-white p-2 text-center">Connexion</h1>

        <div :class="{ divError: userDoesntexist}">
          {{ userDoesntexist }}
        </div>

        <label for="courriel" class="fw-bold mt-3 fs-5">Courriel</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon2"
            ><i class="bi bi-envelope-fill"></i
          ></span>
          <input
            v-model="courriel"
            type="courriel"
            placeholder="courriel"
            class="form-control"
            id="courriel"
            name="courriel"
            required
          />
        </div>
        <p class="error mb-3">{{ errorcourriel }}</p>

        <label for="password" class="fw-bold mt-3 fs-5">mot de passe</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3"><i class="bi bi-unlock-fill"></i></span>
          <input
            v-model="password"
            type="password"
            placeholder="mot de passe"
            class="form-control"
            id="password"
            name="password"
            required
          />
        </div>
        <p class="error mb-3">{{ errpassword }}</p>
        <button class="largeButton m-2 py-2 fw-bold fs-4 btn btn-warning" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import { jwt_decode } from 'jwt-decode';
export default {
  data: () => {
    return {
      password: '',
      courriel: '',
      errpassword: '',
      errorcourriel: '',
      userDoesntexist: "",
    }
  },

  methods: {
    
    validData() {
      console.log(this.userDoesntexist)
      const courrielRegex = /.+@.+\..+/
      let valid = true
      if (!this.courriel.trim() || !courrielRegex.test(this.courriel.trim())) {
        this.errorcourriel = 'Veuillez entrer un courriel valid.'
        valid = false
      } else {
        this.errorcourriel = ''
      }

      if(!this.password.trim()){
        this.errpassword = "Veuillez entrer le mot de passe."
        valid = false
      }
      else
        this.errpassword = ""

      return valid
    },

    login(){
      if(this.validData()){
        fetch("http://localhost:3000/signIn",{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.courriel,
            password:this.password,
          }),
        })
        .then((response) =>{
          if(response.status === 200){
            return response.json();
          }
          else if(response.status === 401){
            this.userDoesntexist = "Courriel ou mot de passe invalid."
          }
          else{
            throw new Error("Error: Impossible de se connecter !");
          }
        })
        .then((data)=>{
        console.log(data)
          localStorage.setItem("token", data.token);
          // localStorage.setItem("user", JSON.stringify(data.user));
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
  }
}
</script>

<style scoped>
.div-form form {
  width: 60%;
}

.divError{
  text-align: center;
  padding: 5px;
  background-color: rgb(254, 125, 125) ;
  font-weight: bold;
  font-size: 15px;
}
</style>
