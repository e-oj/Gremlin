<template>
  <div id="admin-nav">
    <ul>
      <li>
        <router-link to="/admin" tag="button">Home</router-link>
      </li>
      <li>
        <router-link to="/admin/blog" tag="button">Blog</router-link>
      </li>
      <li>
        <button @click.prevent="logout">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
      /**
       * logs out a user: clears token from store
       */
      logout(){
        this.$store.commit("clearToken");
      }
    }
  }
</script>

<style>
  #admin-nav ul{
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #admin-nav li{
    display: inline-flex;
  }

  #admin-nav .router-link-exact-active{
    background-color: #42b983;
    color: white;
  }
</style>
