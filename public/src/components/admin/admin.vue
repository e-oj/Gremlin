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
    background-color: #33334d;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .admin .content{
    height: 95%;
  }

  .admin button{
    width: 80px;
    height: 30px;
    border: 1px solid #336699;
    background-color: white;
    color: #204060;
    font-size: 0.7em;
    cursor: pointer;
    transition: all linear 0.2s;
  }

  .admin button:hover, .admin .admin{
    background-color: #42b983;
    color: white;
  }
</style>
