<template>
  <div class="admin-home">
    <div class="title">
      Homepage
    </div>

    <form class="home-form">
      <textarea v-model="text" placeholder="Enter Home text"></textarea>
    </form>

    <button @click.prevent="submit">Change</button>

    <div v-if="err" class="err">{{err}}</div>
    <div v-if="msg" class="msg">{{msg}}</div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        text: "",
        err: "",
        msg: ""
      }
    },

    methods: {
      /**
       * Submits the form
       *
       * @returns {Promise.<void>}
       */
      async submit(){
        let self = this;
        let home = {text: self.text.trim()};

        try{
          let res = await self.$http.put("/api/h", home);

          console.log(res);

          self.msg = res.body.message;
          self.err = "";
        }
        catch(err){
          self.err = err.body.message;
          self.msg = "";
        }
      }
    },

    async created(){
      let self = this;

      try{
        let res = await self.$http.get("/api/h");

        self.text = res.body.result.home.text;
      }
      catch(err){
        console.log(err);
      }
    }
  }
</script>

<style>
  .admin-home{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 70%;
  }

  .admin-home .title{
    font-family: 'Amaranth', sans-serif;
    font-size: 1em;
    /*color: #42b983;*/
    color: #4078a5;
    text-align: center;
  }

  .admin-home .home-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    height: 50%;
  }

  .admin-home textarea{
    font-size: 1.2em;
    font-family: 'Text Me One', sans-serif;
    padding: 0.5em;
    width: 70%;
    max-width: 35em;
    height: 100%;
  }

  .admin-home button{
    width: 6em;
    height: 2.5em;
    padding: 0.5em 0.75em;
    font-family: 'Acme', sans-serif;
    font-size: 0.8em;
  }

  .admin-home .err{
    background-color: white;
  }
</style>
