<template>
  <div class="admin">
    <div v-if="loggedIn" class="content">
      <admin-nav></admin-nav>

      <router-view></router-view>
    </div>

    <auth v-else></auth>
  </div>
</template>

<script>
  import Auth from "./auth.vue";
  import AdminNav from "./nav.admin.vue"

  export default {
    data(){
      return {}
    },

    computed: {
      /**
       * returns login state from the
       * store
       */
      loggedIn(){
        return this.$store.getters.loggedIn;
      }
    },

    components: {
      "auth": Auth,
      "admin-nav": AdminNav
    }
  }
</script>

<style>
  .admin{
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: none;
  }

  .admin .content{
    height: 95%;
  }

  .admin button{
    width: 120px;
    height: 35px;
    border: none;
    background-color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    color: black;
    cursor: pointer;
    transition: all linear 0.2s;
  }

  .admin button:hover{
    background-color: #42b983;
    color: white;
  }
</style>
