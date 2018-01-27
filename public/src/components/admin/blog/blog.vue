<template>
  <div class="admin-blog">
    <div class="blog-actions">
      <button v-show="!showEditor" @click.preventDefault="showEditor = true">
        <i class="fas fa-plus"></i> New Post
      </button>
      <button v-show="showEditor" @click.preventDefault="showEditor = false">
        <i class="fas fa-long-arrow-alt-left"></i> Back
      </button>
    </div>

    <editor v-if="showEditor"></editor>
  </div>
</template>

<script>
  import Editor from "./editor.vue"

  export default {
    data(){
      return {
        showEditor: false
      }
    },

    computed: {
      showEditor(){
        let self = this;
        let store = self.$store;


      }
    },

    components: {
      "editor": Editor
    }
  }
</script>

<style>
  .blog-actions{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px;
  }

  .blog-actions button{
    width: 8em;
    box-shadow: 0 0 3px lightgray;
  }
</style>
