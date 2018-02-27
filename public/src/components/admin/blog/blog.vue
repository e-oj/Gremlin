<template>
  <div class="admin-blog">
    <div class="admin-blog-controls">

      <div class="admin-blog-actions" v-show="!showEditor" >
        <button v-for="action in actions"
                :class="{'admin-blog-active': show === action.show}"
                @click="showOnly(action.show)">
          <i :class="action.icon"></i>
        </button>
      </div>

      <div class="admin-editor-actions">
        <button v-show="!showEditor" @click.preventDefault="newPost">
          <i class="fas fa-plus"></i>
        </button>

        <button v-show="showEditor" @click.preventDefault="back">
          <i class="fas fa-long-arrow-alt-left"></i>
        </button>
      </div>

      <div class="admin-blog-fill" v-show="!showEditor"></div>
    </div>

    <editor v-if="showEditor" :to-edit="toEdit"></editor>
    <posts v-else :show="show"></posts>
  </div>
</template>

<script>
  import Editor from "./editor.vue"
  import Posts from "./posts.vue"

  export default {
    data(){
      return {
        showEditor: false,
        toEdit: null,
        show: "published",
        actions: [
          {show: "published", icon: "fas fa-align-justify"},
          {show: "drafts", icon: "fas fa-pencil-alt"},
          {show: "deleted", icon: "fas fa-trash-alt"},
        ]
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
          self.toEdit = null;
        }
      },

      /**
       * Opens up the editor for a new post
       */
      newPost(){
        this.showEditor = true;
      },

      /**
       * Show only drafts
       */
      showOnly(type){
        this.show = type;
      }
    },

    components: {
      "editor": Editor,
      "posts": Posts,
    }
  }
</script>

<style>
  .admin-blog-controls{
    width: 50em;
    margin: 2.5em auto;
    display: flex;
  }

  .admin-blog-controls div{
    flex: 1;
  }

  .admin-blog-controls button{
    font-size: 0.6em;
    width: 3.33em;
    height: 3.33em;
    border-radius: 50%;
    color: white;
    background-color: #1a8cff;
    box-shadow: 0 0 0.25em lightgray;
  }

  .admin-blog-actions button{
    margin-right: 3.33em;
    background-color: #cc66ff;
  }

  .admin-editor-actions{
    display: flex;
    justify-content: center;
  }

  .admin-blog-active{
    background-color: #42b983 !important;
  }
</style>
