<template>
  <div class="admin-blog">
    <div class="blog-actions">
      <button v-show="!showEditor" @click.preventDefault="newPost">
        <i class="fas fa-plus"></i> New Post
      </button>
      <button v-show="showEditor" @click.preventDefault="back">
        <i class="fas fa-long-arrow-alt-left"></i> Back
      </button>
    </div>

    <editor v-if="showEditor" :to-edit="toEdit"></editor>
    <posts v-else></posts>
  </div>
</template>

<script>
  import Editor from "./editor.vue"
  import Posts from "./posts.vue"

  export default {
    data(){
      return {
        showEditor: false,
        toEdit: {},
      }
    },

    methods: {
      /**
       * Event handler for the back button
       */
      back(){
        let self = this;

        self.showEditor = false;

        if(self.toEdit){
          self.toEdit = {};
        }
      },

      /**
       *
       */
      newPost(){
        let self = this;

        self.showEditor = true;
      }
    },

    components: {
      "editor": Editor,
      "posts": Posts,
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
    width: 100px;
    box-shadow: 0 0 3px lightgray;
  }
</style>
