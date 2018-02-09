<template>
  <div class="admin-blog">
    <div class="blog-actions">
      <button v-show="!showEditor" @click.preventDefault="newPost">
        <i class="fas fa-plus"></i>
      </button>
      <button v-show="showEditor" @click.preventDefault="back">
        <i class="fas fa-long-arrow-alt-left"></i>
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
       * Opens up the editor for a new post
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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 18px;
    color: white;
    background-color: #4785b8;
    box-shadow: 0 0 3px lightgray;
  }
</style>
