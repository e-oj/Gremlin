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

        <div class="splash">
          <div class="splash-text" v-for="trait in traits" :key="trait">
            {{trait}}
          </div>
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
import Nav from "./nav.vue";

const DEFAULT_TEXT = "I'm a full-stack developer and Computer " +
    "Science major at Rochester Institute of Technology. Check out " +
    "my work on Github, follow me on Medium or connect on LinkedIn.";

export default{
  data(){
    return {
      text: "",
      traits: [
        "Full-stack Developer",
        "Entrepreneur",
        "World Peace"
      ]
    };
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
};
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
    min-height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content, .oj-image{
    height: 600px;
  }

  .content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 450px;
    margin-right: 50px;
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

  .content .splash{
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-evenly;
    height: 200px;
  }

  .content .splash-text{
    min-width: 300px;
    max-width: 300px;
    padding: 15px;
    font-family: Quicksand, sans-serif;
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
    color: #24292e;
    background-color: #f2f2f2;
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
    min-height: 450px;
    display: flex;
    align-items: center;
    margin-left: 50px;
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

  @media screen and (max-width: 1500px){
    .home{
      min-height: 400px;
    }

    .content, .oj-image{
      height: 400px;
      min-height: 350px;
    }

    .content .intro{
      font-size: 25px;
      padding: 10px;
    }

    .content .splash{
      height: 200px;
    }

    .content .splash-text{
      font-size: 14px;
      padding: 10px;
    }

    .content .links a{
      height: 30px;
      padding: 10px;
    }

    .content .links a svg{
      width: 30px;
      height: 30px;
    }
  }

</style>
