<template>
  <div class="container mt-5">
    <div class="div-form centered-form">
      <form class="mt-3" novalidate @submit.prevent="signUp">
        <h1 class="bg-black text-white p-2 text-center">Inscription</h1>
        <div>
          <label for="username" class="fw-bold mt-3 fs-5">Nom utilisateur</label>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1"
              ><i class="bi bi-person-fill"></i
            ></span>
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="nom utilisateur"
              id="username"
              name="username"
              required
            />
          </div>
          <p class="error m-0">{{ errorusername }}</p>
        </div>

        <label for="courriel" class="fw-bold mt-3 fs-5">Courriel</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon2"
            ><i class="bi bi-envelope-fill"></i
          ></span>
          <input
            v-model="courriel"
            type="email"
            placeholder="email"
            class="form-control"
            id="courriel"
            name="email"
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

        <label for="confirmPassword" class="fw-bold mt-3 fs-5">Confirmer le mot de passe</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon4"><i class="bi bi-unlock-fill"></i></span>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="confirmer le mot de passe"
            class="form-control"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>
        <p class="error mb-3">{{ errorconfpassword }}</p>

        <button class="m-2 py-2 fw-bold fs-4 btn btn-warning" type="submit">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      username: '',
      courriel: '',
      password: '',
      confirmPassword: '',
      errorusername: '',
      errorcourriel: '',
      errpassword: '',
      errorconfpassword: ''
    }
  },

  methods: {
    validData() {
      const courrielRegex = /.+@.+\..+/
      let valid = true
      if (this.username.trim().length < 3 || this.username.trim().length > 50 || !this.username.trim().length) {
        this.errorusername =
          'Le nom utilisateur est requis et doit être compris entre 3 et 50 caractères.'
        valid = false
      } else {
        this.errorusername = ''
      } 
      if (!this.courriel.trim() || !courrielRegex.test(this.courriel.trim())) {
        this.errorcourriel = 'Veuillez entrer un courriel valid.'
        valid = false
      }
      else {
        this.errorcourriel = ''
      }

      if(!this.password.trim() || this.password.trim().length  < 6){
        this.errpassword = "Un mot de passe d'au moins 6 caractères est requis."
        valid = false
      }
      else
        this.errpassword = ""

      if(this.password.trim() && (this.confirmPassword.trim() != this.password.trim())){
        this.errorconfpassword = "Les mots de passe doivent être identique."
        valid = false
      }
      else
        this.errorconfpassword = ""

      return valid
    },

    signUp() { 
      if (this.validData()) {
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.courriel,
            password: this.password
          }),
        })
        .then((response)=>{
          if(response.status === 201){
            return response.json();
          }
          else{
            throw new Error("Erreur !")
          }
        })
        .then((data)=>{
          console.log(data);
          this.$router.push('/signin')
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }
}
</script>

<style>
.error {
  color: red;
}
.div-form form {
  width: 60%;
  margin: 30px auto;
}
</style>

