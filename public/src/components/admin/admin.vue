<template>
  <div id="admin">
    <div v-if="loggedIn">
      <admin-nav></admin-nav>
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
  #admin button{
    width: 80px;
    height: 30px;
    border: 1px solid #336699;
    background-color: white;
    color: #204060;
    font-size: 0.7em;
    cursor: pointer;
    transition: all linear 0.2s;
  }

  #admin button:hover{
    background-color: #3366cc;
    color: white;
  }
</style>
