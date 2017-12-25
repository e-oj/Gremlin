<template>
  <form class="auth">
    <div>
      <input type="text" v-model="alias" placeholder="alias"/>
      <input type="password" v-model="password" placeholder="password"/>
    </div>

    <div>
      <button @click.prevent="login">Login</button>
      <button @click.prevent="signup">Create</button>
    </div>

    <div class="err">
      {{err}}
    </div>
  </form>
</template>

<script>
  import config from "../../../../config/index"
  const ERR = "Something fucked up!";

  export default {
    data(){
      return {
        alias: "",
        password: "",
        err: ""
      }
    },
    methods: {
      /**
       * Admin login
       * @returns {Promise.<void>}
       */
      async login(){
        let self = this;

        try{
          await self.send("/api/u/login");
        }
        catch(err){
          self.err = err.message || ERR;
        }
      },

      /**
       * Creates an admin
       * @returns {Promise.<void>}
       */
      async signup(){
        let self = this;

        try{
          await self.send("/api/u");
        }
        catch(err){
          self.err = err.message || ERR;
        }
      },

      /**
       * Sends the form's data to the given url
       * and stores the data in a vuex store
       *
       * @param url
       * @returns {Promise.<void>}
       */
      async send(url){
        let self = this;
        let alias = self.alias.trim();
        let password = self.password.trim();
        let store = self.$store;

        try{
          let res = await self.$http.post(url, {alias, password});
          let {token} = res.body.result;

          store.commit("token", token);
        }
        catch(err){
          self.err = err.body.message;
        }
      }
    }
  }
</script>

<style>
  .auth{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 300px;
    height: 200px;
    margin: 40px auto;
    border: 2px solid #336699;
  }

  .auth input{
    padding: 5px;
    font-size: 0.8em;
    border: 1px solid #336699;
    color: #204060;
  }

  .auth input:first-child{
    margin-bottom: 5px;
  }

  .auth input::placeholder{
    color: #3366cc;
  }
</style>
