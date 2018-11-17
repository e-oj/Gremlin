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

  const FONT_RATIO = 0.0104;

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
    },

    methods: {
      setFontSize(){
        let $admin = $(".admin");
        let fontSize = (screen.availWidth * FONT_RATIO) + "px";

        $admin.css({fontSize});
      }
    },

    mounted(){
      this.setFontSize();
    }
  }

</script>

<style>
  .admin{
    background-color: white;
    position: absolute;
    width: 100%;
    min-height: 100vh;
    transition: none;
    font-size: 20px;
  }

  .admin .content{
    height: inherit;
  }

  .admin button{
    width: 6em;
    height: 1.75em;
    border: none;
    background-color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 0.7em;
    color: black;
    cursor: pointer;
    transition: all linear 0.2s;
  }

  .admin button:hover{
    background-color: #42b983;
    color: white;
  }
</style>
