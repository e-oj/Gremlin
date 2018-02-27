<template>
  <div class="admin-dialog admin-delete">
    <div class="admin-dialog-msg">
      {{msg}}
    </div>

    <div class="admin-dialog-actions">
      <button @click="del">
        <i class="far fa-check"></i>
      </button>

      <button @click="exit">
        <i class="far fa-times"></i>
      </button>
    </div>

    <div class="err">{{err}}</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        err: ""
      }
    },

    computed: {
      msg(){
        return this.post.deleted ? "Delete Permanently?" : "Delete Post?";
      }
    },

    props: ["post"],

    methods: {

      /**
       * Closes this component
       */
      exit(){
        this.$parent.toDelete = "";
      },

      /**
       * Sends a delete request to the api
       * and removes the deleted post from the
       * list of posts.
       */
      async del(){
        let self = this;

        try{
          await self.$http.delete("/api/b", {body: {_id: self.post._id}});

          if(self.post.deleted){
            let posts = self.$parent.posts;
            let index;

            for(let i = 0; i < posts.length; i++){
              if(posts[i]._id === self.post._id){
                index = i;
                break;
              }
            }

            posts.splice(index, 1);
          }

          else {
            self.post.deleted = true;
          }

          self.exit();
        }
        catch(err){
          self.err = err.body.message;
        }
      },
    },

    /**
     * This component gets placed on the post that
     * summoned it.
     */
    mounted(){
      let $self = $(".admin-delete");
      let margin = 40;
      let top = $(`.${this.post._id}`).offset().top - $self.height() - margin;

      $self.css({top});
    }
  }
</script>

<style>
  .admin-dialog{
    font-size: 0.7em;
    background-color: white;
    position: absolute;
    width: 14em;
    height: 6em;
    margin: auto;
    padding: 0.36em;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 0 0.14em lightgray;
  }

  .admin-dialog-msg{
    margin-bottom: 1.2em;
  }

  .admin-dialog-actions{
    display: flex;
    justify-content: space-evenly;
  }

  .admin-dialog-actions button{
    width: 5em;
    height: 2.1em;
    font-size: 1em;
    box-shadow: 0 0 0.1em lightgray;
  }
</style>
