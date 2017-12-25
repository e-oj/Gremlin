<template>
  <div id="admin-nav">
    <ul>
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
</style>
