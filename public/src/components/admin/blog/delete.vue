<template>
  <div class="admin-delete">
    <div class="admin-delete-msg">
      {{msg}}
    </div>

    <div class="admin-delete-actions">
      <button @click="del">
        <i class="fas fa-check-circle"></i> Yes
      </button>

      <button @click="exit">
        <i class="fas fa-times-circle"></i> No
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
        return this.post.deleted ? "Delete Permanently?" : "Delete Post";
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
      let margin = 30;
      let top = $(`.${this.post._id}`).offset().top - $self.height() - margin;

      $self.css({top});
    }
  }
</script>

<style>
  .admin-delete{
    background-color: white;
    position: absolute;
    width: 200px;
    height: 100px;
    margin: auto;
    padding: 5px;
    text-align: center;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: 0 0 2px lightgray;
  }

  .admin-delete-actions{
    display: flex;
    justify-content: space-evenly;
    font-size: 12px;
  }

  .admin-delete-actions button{
    width: 80px;
    box-shadow: 0 0 2px lightgray;
  }
</style>
