<template>
  <div class="admin-posts">
    <delete v-if="toDelete" :post="toDelete"></delete>
    <restore v-if="toRestore" :post="toRestore"></restore>

    <div class="admin-post" v-for="post in _posts" :key="post._id">
      <div class="admin-post-title">{{post.title}}</div>

      <div class="admin-post-text">{{textPreview(post.text)}}</div>

      <div class="admin-post-tags">
        <span v-for="tag in post.tags">{{tag}}</span>
      </div>

      <div class="admin-post-date">
        <span v-if="post.draft">In Progress . . .</span>
        <span v-else>{{formatDate(post.createdAt)}}</span>
      </div>

      <div class="admin-post-action">
        <span v-if="show == 'deleted'" class="admin-post-restore" @click="restorePost(post)">
          <i class="far fa-undo-alt"></i>
        </span>

        <span class="admin-post-edit" @click="editPost(post)">
          <i class="far fa-edit"></i>
        </span>

        <span class="admin-post-delete" @click="deletePost(post)">
          <i class="far fa-trash-alt"></i>
        </span>
      </div>

      <span :class="post._id"></span>
    </div>

    <div v-if="!hasPosts" class="admin-no-posts">{{msg}}</div>
  </div>
</template>

<script>
  import * as utils from "../../../gen.utils";
  import Delete from "./delete.vue";
  import Restore from "./restore.vue";

  export default{
    data(){
      return {
        posts: [],
        err: "",
        msg: "No posts to show",
        toDelete: "",
        toRestore: "",
      }
    },

    props: ["show"],

    watch: {
      show(){
        let self = this;

        if(self.toDelete) self.toDelete = null;
        if(self.toRestore) self.toRestore = null;
      }
    },

    computed: {
      /**
       * Returns a list of posts after doing
       * the required filtering
       */
      _posts(){
        let result = [];
        let self = this;

        for(let post of self.posts){
          if(self.show === "drafts" && post.draft && !post.deleted){
            result.push(post);
          }
          else if(self.show === "deleted" && post.deleted){
            result.push(post);
          }
          else if(self.show === "published" && !(post.deleted || post.draft)){
            result.push(post);
          }
        }

        return result;
      },

      /**
       * Any posts to show?
       *
       * @returns {boolean}
       */
      hasPosts(){
        return !!this._posts.length;
      }
    },

    methods: {
      textPreview: utils.textPreview,

      formatDate: utils.formatDate,

      /**
       * Opens up a post in the editor
       *
       * @param post the post to edit
       */
      editPost(post){
        let parent = this.$parent;

        parent.toEdit = post;
        parent.showEditor = true;
      },

      /**
       * Opens up the delete dialog for
       * a post.
       *
       * @param post the post to delete
       */
      deletePost(post){
        let self = this;

        if(self.toRestore){
          self.toRestore = null;
        }

        if(self.toDelete){
          self.toDelete = null;
        }
        else self.toDelete = post;
      },

      /**
       * Opens up the restore dialog for
       * a post.
       *
       * @param post the post to delete
       */
      restorePost(post){
        let self = this;

        if(self.toDelete){
          self.toDelete = null;
        }

        if(self.toRestore){
          self.toRestore = null;
        }
        else self.toRestore = post;
      }
    },

    components: {
      "delete": Delete,
      "restore": Restore
    },

    async created(){
      let self = this;

      try{
        let res = await self.$http.get("/api/b");

        self.posts = res.body.result.posts;
      }
      catch(err){
        self.err = err.message;
      }
    }
  }
</script>

<style>
  .admin-posts {
    width: 50em;
    margin: auto;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    font-family: "Quicksand", sans-serif;
  }

  .admin-post{
    padding: 0.5em;
    border-top: 1px solid lightgrey;
  }

  .admin-post:last-child{
    border-bottom: 1px solid lightgrey;
  }

  .admin-post-title{
    font-size: 0.85em;
    font-weight: 900;
    margin-top: 0.18em;
    margin-bottom: 0.88em;
  }

  .admin-post-text{
    font-size: 0.75em;
  }

  .admin-post-tags{
    font-size: 0.65em;
    margin-top: 1.15em;
    margin-bottom: 0.77em;
  }

  .admin-post-tags span{
    margin-right: 0.38em;
    font-style: italic;
    text-decoration: underline;
  }

  .admin-post-date{
    font-size: 0.6em;
    color: blue;
    margin-bottom: 0.84em;
  }

  .admin-post-action{
    display: flex;
    font-size: 0.75em;
  }

  .admin-post-action span{
    margin-right: 1em;
    cursor: pointer;
  }

  .admin-post-action span:hover{
    color: green;
  }

  .admin-post-edit{
    color: #9900ff;
  }

  .admin-post-restore{
    color: #1a8cff;
  }

  .admin-post-delete{
    color: red;
  }
</style>
