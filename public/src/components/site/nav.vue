<template>
  <div :class="['nav-container', {'fixed-nav': isFixed}]">
    <div v-if="isFixed" class="nav-logo">
      <a target="_blank" href="https://www.github.com/e-oj">
        <span class="bracket">&lt;</span>@e-oj<span class="bracket">&gt;</span>
      </a>
    </div>

    <ul class="nav">
      <li><router-link tag="a" to="/">Home</router-link></li>
      <li><router-link tag="a" to="/story">Story</router-link></li>
      <li><router-link tag="a" to="/links">Links</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isFixed"],
  methods: {
    analytics(){
      let self = this;

      $(".nav-logo a").click(function(){
        self.$ga.event("Nav logo", "open", $(this).attr("href"));
      });
    }
  },

  created(){
    let self = this;

    // analytics
    self.$nextTick(() => self.analytics());
  }
};
</script>

<style scoped>
  .nav-container{
    display: flex;
    justify-content: space-between;
    font-family: 'Acme', sans-serif;
    font-size: 1.1em;
  }

  .nav-logo{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin-left: 100px;
    min-width: 120px;
    background-color: #42b983;
  }

  .nav-logo .bracket{
    color: #24292e;
    opacity: 0;
  }

  .nav-logo a{
    text-decoration: none;
    color: #24292e;
  }

  .nav-logo a:hover .bracket{
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }

  .fixed-nav{
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    max-width: 1920px;
    height: 80px;
    background-color: #24292e;
    font-size: 22px;
  }

  .fixed-nav .nav{
    display: flex;
    align-items: center;
  }

  .fixed-nav .nav li{
    margin: 0 60px 0 0;
  }

  .fixed-nav .nav li:last-child{
    margin-right: 100px;
  }

  .fixed-nav .nav a{
    color: #e6e6e6;
    border-bottom: none
  }

  .fixed-nav .nav a:hover{
    color: #42b983;
  }

  .fixed-nav .nav .router-link-exact-active{
    color: #42b983;
  }

  .nav{
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: auto;
  }

  .nav a{
    text-decoration: none;
    transition: all 0.2s linear;
    color: #42b983;
    border-bottom: 4px solid #ffff00;
  }

  .nav a:hover{
    color: #ffff00;
  }

  .nav li{
    margin: 0 2.5em 0 0;
    transition: all 0.2s linear;
  }

  .nav li:last-child{
    margin-right: 150px;
  }

  @media screen and (max-width: 1500px){
    .fixed-nav{
      font-size: 20px;
      /*height: 70px;*/
    }
  }

  @media screen and (max-width: 640px){
    .fixed-nav{
      font-size: 18px;
      justify-content: center;
    }

    .fixed-nav .nav{
      margin-left: 0;
      width: 80%;
      justify-content: space-between;
    }

    .fixed-nav .nav li, .fixed-nav .nav li:last-child{
      margin: 0 10px;
    }

    .nav-logo{
      display: none;
    }
  }
</style>
