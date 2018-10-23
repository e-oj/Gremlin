<template>
  <div class="home">
    <nav-bar is-fixed="true"></nav-bar>

    <div class="nav-ghost"></div>

    <div class="content-wrapper">
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
            <i class="fab fa-github github-logo"></i>
          </a>

          <a href="https://www.linkedin.com/in/emmanuel-olaojo/">
            <i class="fab fa-linkedin linkedin-logo"></i>
          </a>

          <a href="https://medium.com/@emmanuelolaojo">
            <i class="fab fa-medium medium-logo"></i>
          </a>
        </div>

      </div>

      <div class="oj-image">
        <img src="/src/assets/img/oj.png" onerror="this.style.display = 'none'">
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

<style scoped>
  .nav-ghost{
    height: 100px;
    flex-shrink: 0;
    opacity: 0;
  }

  .home{
    width: 100%;
    max-width: 1920px;
    height: 100vh;
    min-height: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .content-wrapper{
    width: 100%;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 600px;
    min-height: 450px;
    margin-right: 25px;
  }

  .content div{
    background-color: white;
  }

  .content .intro{
    width: fit-content;
    padding: 15px;
    font-family: "Signika", cursive;
    font-size: 30px;
    font-weight: bold;
    color: #24292e;
  }

  .content .intro a{
    font-family: Acme, cursive;
  }

  .content .splash-text{
    width: 500px;
    min-width: 450px;
    padding: 15px;
    font-family: Quicksand, sans-serif;
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
    color: #24292e;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .content .links{
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .content .links a{
    flex-shrink: 0;
    width: fit-content;
    height: 35px;
    padding: 15px;
  }

  .content .links a svg{
    width: 35px;
    height: 35px;
  }

  .oj-image{
    width: fit-content;
    height: 600px;
    min-height: 450px;
    display: flex;
    align-items: center;
    margin-left: 25px;
  }

  .oj-image img{
    height: 100%;
  }

  .github-logo{
    color: #24292e;
  }

  .linkedin-logo{
    color: #0177B5;
  }

  .medium-logo{
    color: #24292e;
  }
</style>
