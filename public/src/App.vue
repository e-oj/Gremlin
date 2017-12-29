<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import config from "./config"

  export default {
    name: 'app',

    created(){
      let store = this.$store;
      let token = localStorage.getItem(config.AUTH);

      if(token) store.commit("token", token);
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body{
    font-size: 20pt;
    margin: 0;
    padding: 0;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .err {
    color: red;
  }

  .msg{
    color: #42b983;
  }
</style>
