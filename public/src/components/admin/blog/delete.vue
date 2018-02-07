<template>
  <div class="admin-delete">
    <div class="admin-delete-msg">
      Delete Post?
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

    props: ["_id"],

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
          await self.$http.delete("/api/b", {body: {_id: self._id}});

          let posts = self.$parent.posts;
          let index;

          for(let i = 0; i < posts.length; i++){
            if(posts[i]._id === self._id){
              index = i;
              break;
            }
          }

          posts.splice(index, 1);

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
      let margin = 10;
      let top = $(`.${this._id}`).offset().top - $self.height() - margin;

      $self.css({top});
    }
  }
</script>

<style>
  .admin-delete{
    background-color: white;
    position: absolute;
    width: 250px;
    height: 150px;
    margin: auto;
    padding: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: 0 0 2px lightgray;
  }

  .admin-delete-actions{
    display: flex;
    justify-content: space-evenly;
  }

  .admin-delete-actions button{
    width: 100px;
    box-shadow: 0 0 2px lightgray;
  }
</style>
