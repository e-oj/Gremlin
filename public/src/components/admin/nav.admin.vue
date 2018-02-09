<template>
  <div id="admin-nav">
    <div class="admin-nav">
      <ul>
        <li>
          <router-link to="/admin" tag="button">
            <i class="fas fa-home"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/blog" tag="button">
            <i class="far fa-newspaper"></i>
          </router-link>
        </li>
      </ul>

      <ul>
        <li>
          <button @click.prevent="logout">
            <i class="fas fa-sign-out-alt"></i>
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
    box-shadow: 0 0 3px lightgray;
    font-size: 14px;
    width: 80px;
  }

  #admin-nav .router-link-exact-active{
    background-color: #42b983;
    color: white;
  }
</style>
