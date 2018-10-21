<template>
  <div class="home">
    <nav-bar></nav-bar>

    <div class="content">
      <div class="intro">
        Emmanuel Olaojo (<a href="https://github.com/e-oj"
                            target="_blank">@e-oj</a>)
      </div>

      <div class="splash-text">
        {{text}}
      </div>

      <div class="links">
        <a href="https://github.com/e-oj">
          <i class="fab fa-github"></i>
        </a>

        <a href="https://www.linkedin.com/in/emmanuel-olaojo/">
          <i class="fab fa-linkedin"></i>
        </a>

        <a href="https://medium.com/@emmanuelolaojo">
          <i class="fab fa-medium"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from "./nav.vue"

  const DEFAULT_TEXT = "I'm a full-stack developer and Computer " +
    "Science major at Rochester Institute of Technology. Check out " +
    "my work on Github, follow me on Medium or connect on LinkedIn.";

  export default{
    data(){
      return {
        text: ""
      }
    },

    components: {
      "nav-bar": Nav
    },

    async created(){
      let self = this;

      try{
        let res = await self.$http.get("/api/h");

        self.text = res.body.result.home.text;
      }
      catch(err){
        self.text = DEFAULT_TEXT;
      }
    }
  }
</script>

<style>
  .home{
    position: absolute;
    width: 100%;
    height: 100%;
    color: #e6f1ff;
    background-color: #0a192f;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .home .content{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 70%;
    justify-content: space-evenly;
    font-family: 'Amaranth', sans-serif;
  }

  .home .splash-text{
    width: 46%;
    padding: 20px;
    max-width: 700px;
    font-family: 'Source Code Pro', sans-serif;
    line-height: 1.4;
    background-color: white;
    color: #24292e;
    font-size: 1em;
  }

  .home .intro{
    font-weight: bold;
    font-size: 1.4em;
  }

  .home .intro a{
    text-decoration: none;
    border-bottom: 5px solid #ffff00;
    transition: all 0.2s linear;
  }

  .home .intro a:hover{
    color: #ffff00
  }

  .home .links{
    font-size: 1.3em;
  }

  .home .links a{
    text-decoration: none;
    color: #42b983;
    transition: all 0.2s linear;
    margin-right: 35px;
  }

  .home .links a:last-child{
    margin-right: 0;
  }

  .home .links a:hover{
    color: #ffff00;
  }
</style>
