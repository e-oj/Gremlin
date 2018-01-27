<template>
  <div id="admin-nav">
    <div class="admin-nav">
      <ul>
        <li>
          <router-link to="/admin" tag="button">
            <i class="fas fa-home"></i><span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/blog" tag="button">
            <i class="far fa-newspaper"></i><span>Blog</span>
          </router-link>
        </li>
      </ul>

      <ul>
        <li>
          <button @click.prevent="logout">
            <i class="fas fa-sign-out-alt"></i><span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
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
  #admin-nav{
    /*background-color: #4078a5;*/
    padding: 20px;
  }

  .admin-nav{
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
  }

  #admin-nav ul{
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
  }

  #admin-nav li{
    display: inline-flex;
  }

  #admin-nav button{
    width: 8em;
    box-shadow: 0 0 3px lightgray;
  }

  #admin-nav svg{
    margin-right: 0.5em;
  }

  #admin-nav .router-link-exact-active{
    background-color: #42b983;
    color: white;
  }
</style>
