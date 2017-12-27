<template>
  <div class="home">
    <nav-bar></nav-bar>

    <div class="content">
      <div class="intro">
        Emmanuel Olaojo (<a href="https://github.com/e-oj">@e-oj</a>)
      </div>

      <div class="splash-text">
        {{msg}}
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

  export default{
    data(){
      return {
        msg: "You found Me! I'll let you know right away, if it's " +
        "money you want, I haven't got any. If, however, you're looking " +
        "for a very talented full-stack developer, I welcome you."
      }
    },

    components: {
      "nav-bar": Nav
    }
  }
</script>

<style>
  .home{
    position: absolute;
    width: 100%;
    height: 100%;
    color: white;
    background-color: #33334d;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    font-size: 1.3em;
    width: 80%;
    height: 70%;
    justify-content: space-evenly;
    font-family: 'Amaranth', sans-serif;
  }

  .splash-text{
    width: 46%;
    max-width: 700px;
    font-family: 'Text Me One', sans-serif;
  }

  .intro{
    font-weight: bold;
  }

  .intro a{
    text-decoration: none;
    border-bottom: 3px solid #ffff00;
    transition: all 0.2s linear;
  }

  .intro a:hover{
    color: #ffff00
  }

  .links a{
    text-decoration: none;
    color: #42b983;
    transition: all 0.2s linear;
    margin-right: 35px;
  }

  .links a:last-child{
    margin-right: 0;
  }

  .links a:hover{
    color: #ffff00;
  }
</style>
